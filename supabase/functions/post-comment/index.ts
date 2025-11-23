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
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )

        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) throw new Error('로그인이 필요합니다.')

        const { skill_id, content_text, rating } = await req.json()
        if (!skill_id || !content_text || rating === undefined) {
            throw new Error('필수 정보가 누락되었습니다.')
        }

        const userId = user.id
        let actionType = 'inserted'

        // 1. [CHECK] 기존 댓글 확인
        const { data: existingComment, error: checkError } = await supabase
            .from('comments')
            .select('id')
            .eq('users', userId)    // users
            .eq('skills', skill_id) // skills
            .maybeSingle()

        if (checkError) throw checkError

        // 2. [UPSERT] 수정 또는 등록
        if (existingComment) {
            // 수정
            const { error: updateError } = await supabase
                .from('comments')
                .update({
                    comment_text: content_text,
                    rating: rating
                })
                .eq('id', existingComment.id)

            if (updateError) throw updateError
            actionType = 'updated'

        } else {
            // 등록
            const { error: insertError } = await supabase
                .from('comments')
                .insert({
                    users: userId,
                    skills: skill_id,
                    comment_text: content_text,
                    rating: rating
                })

            if (insertError) throw insertError
            actionType = 'inserted'
        }

        // 3. [재계산] 평균 별점
        const { data: allRatings, error: calcError } = await supabase
            .from('comments')
            .select('rating')
            .eq('fk_skills', skill_id) // fk_skills로 조회

        if (calcError) throw calcError

        const totalCount = allRatings.length
        const sumRating = allRatings.reduce((acc, curr) => acc + (curr.rating || 0), 0)
        const averageRating = totalCount > 0
            ? Math.round((sumRating / totalCount) * 10) / 10
            : 0

        // 4. [갱신] Skills 테이블 업데이트
        const { error: updateSkillError } = await supabase
            .from('skills')
            .update({ rating: averageRating, comments_count: totalCount })
            .eq('id', skill_id)

        if (updateSkillError) throw updateSkillError

        // 5. [반환]
        return new Response(
            JSON.stringify({
                success: true,
                action: actionType,
                skill_id: skill_id,
                comments_count: totalCount,
                rating: averageRating
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        )

    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})