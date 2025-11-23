import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // 1. DB 접속 및 유저 확인
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )

        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) throw new Error('로그인이 필요합니다.')

        const { skill_id } = await req.json()
        if (!skill_id) throw new Error('skill_id가 필요합니다.')

        const userId = user.id

        // 2. [판단] 이 유저가 이 스킬을 좋아한 기록이 있는지 확인
        // (스키마에 따라 컬럼명 users, skills 사용)
        const { data: existingLike, error: checkError } = await supabase
            .from('likes')
            .select('id')
            .eq('users', userId)    // 내 아이디
            .eq('skills', skill_id) // 그 스킬 아이디
            .maybeSingle()

        if (checkError) throw checkError

        let isLiked = false

        // 3. [행동] 있으면 죽이고(DELETE), 없으면 만든다(INSERT)
        if (existingLike) {
            // 상황 B: 이미 있다 -> 기록 삭제 (죽이기)
            const { error: deleteError } = await supabase
                .from('likes')
                .delete()
                .eq('id', existingLike.id) // 찾은 그놈을 삭제

            if (deleteError) throw deleteError
            isLiked = false // 이제 안 좋아함

        } else {
            // 상황 A: 없다 -> 기록 생성 (새로 만들기)
            const { error: insertError } = await supabase
                .from('likes')
                .insert({
                    users: userId,    // 누가
                    skills: skill_id  // 어떤 스킬을
                })

            if (insertError) throw insertError
            isLiked = true // 이제 좋아함
        }

        // 4. [갱신] 스킬 테이블의 좋아요 숫자 업데이트
        // (단순 +1/-1은 꼬일 수 있으므로, likes 테이블 개수를 세서 넣는게 제일 정확함)

        // 4-1. 현재 진짜 개수 세기
        const { count: realCount, error: countError } = await supabase
            .from('likes')
            .select('*', { count: 'exact', head: true })
            .eq('skills', skill_id)

        if (countError) throw countError

        const safeCount = realCount ?? 0

        // 4-2. skills 테이블에 반영하기
        const { error: updateError } = await supabase
            .from('skills')
            .update({ likes_count: safeCount })
            .eq('id', skill_id)

        if (updateError) throw updateError

        // 5. 결과 알려주기
        return new Response(
            JSON.stringify({
                is_liked: isLiked,      // 현재 상태 (빨간 하트 or 빈 하트)
                likes_count: safeCount  // 최신 숫자
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