import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_ANON_KEY") ?? "",
            {
                global: {
                    headers: { Authorization: req.headers.get("Authorization")! },
                },
            }
        );

        // 1. 요청 데이터 파싱
        const {
            skill_id, // [필수]

            // 아래는 모두 선택 사항 (Optional)
            category_id,
            category_name_ko,
            category_name_en,
            title_ko,
            title_en,
            sub_title_ko,
            sub_title_en,
            icon,
            tags,
            content_text,
            content_type,
            url,
        } = await req.json();

        if (!skill_id) {
            throw new Error("skill_id is required");
        }

        // 2. URL 재계산 로직 (url 필드가 요청에 포함된 경우에만 수행)
        let final_download_url = null;
        let final_license_type = null;

        // url이 undefined가 아니라는 것은 사용자가 URL을 수정하려고 보냈다는 뜻
        if (url !== undefined) {
            const isGithub = url && url.includes("github.com");
            if (isGithub) {
                final_download_url = `https://downgit.github.io/#/home?url=${encodeURIComponent(url)}`;
                final_license_type = "github";
            } else {
                // Github이 아닌 URL로 변경됨 -> 기존 속성 제거
                final_download_url = null;
                final_license_type = null;
            }
        }

        // 3. DB 함수 호출
        // JS의 undefined 값은 DB 함수로 넘어갈 때 무시되거나 null로 처리되어
        // SQL의 DEFAULT NULL을 트리거합니다.
        const { error } = await supabaseClient.rpc("update_skill_flow", {
            p_skill_id: skill_id,

            p_category_id: category_id,
            p_new_category_name_ko: category_name_ko,
            p_new_category_name_en: category_name_en,

            p_title_ko: title_ko,
            p_title_en: title_en,
            p_sub_title_ko: sub_title_ko,
            p_sub_title_en: sub_title_en,

            // url이 요청에 없었으면 undefined -> SQL에서 기존값 유지
            // url이 요청에 있었으면 계산된 값(또는 null) 전달 -> SQL에서 업데이트
            p_download_url: url !== undefined ? final_download_url : undefined,

            p_icon: icon,
            p_tags: tags,

            p_content_text: content_text,
            p_content_type: content_type,

            p_license_type: url !== undefined ? final_license_type : undefined,
            p_github_url: url
        });

        if (error) throw error;

        return new Response(
            JSON.stringify({ success: true, message: "Skill updated successfully" }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            }
        );

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});