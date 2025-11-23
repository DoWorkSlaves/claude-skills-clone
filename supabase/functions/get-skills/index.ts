import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import Hangul from "https://esm.sh/hangul-js@0.2.6"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // 0. CORS Preflight 처리
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? ''
        )

        // 1. 요청 파라미터 추출
        const url = new URL(req.url)
        const keyword = url.searchParams.get('q')           // 검색어
        const categoryId = url.searchParams.get('category_id') // 카테고리 필터
        const sort = url.searchParams.get('sort') || 'title'   // 정렬 기준

        const page = parseInt(url.searchParams.get('page') ?? '1')
        const limit = parseInt(url.searchParams.get('limit') ?? '10')

        // 2. [DB 단계] 데이터 가져오기
        // category_id는 데이터 양을 줄이기 위해 DB 단계에서 필터링
        let query = supabase
            .from('skills')
            .select('*, categories(id, category_name_ko, icon)')

        if (categoryId && categoryId !== 'all') {
            query = query.eq('categories', categoryId)
        }

        const { data: rawData, error } = await query

        if (error) throw error

        // 3. [JS 단계] 메모리 가공 (검색 -> 정렬 -> 페이징)
        let processedData = rawData || []

        // A. 검색 (5개 컬럼 통합 검색 + Tags 포맷 자동 변환)
        if (keyword) {
            const lowerKeyword = keyword.toLowerCase().trim()

            processedData = processedData.filter(skill => {

                // [Helper] 어떤 형태의 데이터든 검색하기 좋은 문자열로 바꾸는 함수
                const normalizeField = (field: any) => {
                    if (!field) return ''

                    // 1. 진짜 배열인 경우 (["react", "vue"])
                    if (Array.isArray(field)) {
                        return field.join(' ').toLowerCase()
                    }

                    // 2. 문자열인데 JSON 배열처럼 생긴 경우 ("['react', 'vue']") - 혹시 모를 상황 대비
                    if (typeof field === 'string' && field.trim().startsWith('[') && field.trim().endsWith(']')) {
                        try {
                            // 작은따옴표(')를 큰따옴표(")로 바꿔서 파싱 시도
                            const parsed = JSON.parse(field.replace(/'/g, '"'))
                            if (Array.isArray(parsed)) {
                                return parsed.join(' ').toLowerCase()
                            }
                        } catch (e) {
                            // 파싱 실패하면 그냥 원본 문자열 사용
                        }
                    }

                    // 3. 그냥 문자열인 경우
                    return String(field).toLowerCase()
                }

                // 모든 필드를 문자열로 정규화
                const titleKo = normalizeField(skill.title_ko)
                const titleEn = normalizeField(skill.title_en)
                const subTitleKo = normalizeField(skill.sub_title_ko)
                const subTitleEn = normalizeField(skill.sub_title_en)
                const tags = normalizeField(skill.tags) // ["태그1", "태그2"] -> "태그1 태그2" 변환됨

                // 하나라도 검색어(혹은 초성)가 포함되면 결과에 포함 (OR 조건)
                return (
                    Hangul.search(keyword, titleKo) >= 0 ||    // 한글 제목 (초성 가능)
                    Hangul.search(keyword, subTitleKo) >= 0 || // 한글 부제 (초성 가능)
                    Hangul.search(keyword, tags) >= 0 ||       // ★ 태그 안의 한글도 초성 검색 가능!
                    titleEn.includes(lowerKeyword) ||          // 영어 제목
                    subTitleEn.includes(lowerKeyword) ||       // 영어 부제
                    tags.includes(lowerKeyword)                // 태그 (영어)
                )
            })
        }

        // B. 정렬 (likes, views, comments, title)
        processedData.sort((a, b) => {
            // 값이 null일 경우 0으로 취급하여 계산 에러 방지
            switch (sort) {
                case 'likes': // 좋아요 많은 순 (내림차순)
                    return (b.likes_count || 0) - (a.likes_count || 0)

                case 'views': // 조회수 높은 순 (내림차순)
                    return (b.views_count || 0) - (a.views_count || 0)

                case 'comments': // 댓글 많은 순 (내림차순)
                    return (b.comments_count || 0) - (a.comments_count || 0)

                case 'title': // 이름 순 (오름차순 가나다)
                default:
                    return (a.title_ko || '').localeCompare(b.title_ko || '')
            }
        })

        // C. 페이지네이션 (Slice)
        const total = processedData.length
        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit

        // 범위에 맞춰 자르기
        const paginatedData = processedData.slice(startIndex, endIndex)

        // 4. 응답 반환
        return new Response(
            JSON.stringify({
                data: paginatedData,
                meta: {
                    total: total,
                    page: page,
                    limit: limit,
                    last_page: Math.ceil(total / limit)
                }
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        )

    } catch (error) {
        // 에러 발생 시 처리
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})