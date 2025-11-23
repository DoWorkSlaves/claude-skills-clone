import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // 1. CORS Preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // 2. Supabase 클라이언트 생성 (요청한 유저의 권한을 그대로 사용)
        // req.headers.get('Authorization')을 넣어줘야 auth.getUser()가 작동합니다.
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )

        // 3. 유저 인증 확인 (보안 필수)
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            throw new Error('로그인이 필요한 기능입니다.')
        }

        // 4. 요청 파라미터 받기
        const { skill_id } = await req.json()
        if (!skill_id) throw new Error('skill_id가 필요합니다.')

        const userId = user.id

        // 5. 이미 좋아요를 눌렀는지 확인
        const { data: existingLike, error: checkError } = await supabase
            .from('likes')
            .select('id')
            .eq('user_id', userId)
            .eq('skills', skill_id) // DB 컬럼명이 skills(FK)라고 가정
            .maybeSingle()

        if (checkError) throw checkError

        let isLiked = false

        // 6. 토글 로직 (Insert or Delete)
        if (existingLike) {
            // [삭제] 이미 있으므로 취소
            await supabase.from('likes').delete().eq('id', existingLike.id)
            isLiked = false
        } else {
            // [추가] 없으므로 생성
            await supabase.from('likes').insert({ user_id: userId, skills: skill_id })
            isLiked = true
        }

        // 7. [중요] likes_count 재계산 (데이터 정확성을 위해 count 쿼리 사용)
        // 단순히 +1 하는 것보다, 실제 likes 테이블의 개수를 세는 게 동시성 문제에서 안전합니다.
        const { count: currentCount } = await supabase
            .from('likes')
            .select('*', { count: 'exact', head: true })
            .eq('skills', skill_id)

        // 8. skills 테이블 업데이트
        const safeCount = currentCount ?? 0
        await supabase
            .from('skills')
            .update({ likes_count: safeCount })
            .eq('id', skill_id)

        // 9. 결과 반환
        return new Response(
            JSON.stringify({
                is_liked: isLiked,
                likes_count: safeCount
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        )

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})