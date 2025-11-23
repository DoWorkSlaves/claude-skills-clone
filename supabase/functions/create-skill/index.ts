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

        // 클라이언트 요청 데이터 파싱
        const {
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
            url, // 사용자가 입력한 원본 URL (Github일 수도, 아닐 수도 있음)
        } = await req.json();

        // -------------------------------------------------------
        // [핵심 로직] Github 여부에 따른 데이터 가공
        // -------------------------------------------------------
        let final_download_url: string | null = null;
        let final_license_type: string | null = null;

        // url이 있고, 'github.com'을 포함하는지 확인
        const isGithub = url && url.includes("github.com");

        if (isGithub) {
            // [Case 1: Github URL인 경우]
            // 1. DownGit 링크 생성 -> skills 테이블의 download_url로 들어감
            final_download_url = `https://downgit.github.io/#/home?url=${encodeURIComponent(url)}`;

            // 2. 라이선스 타입 'github' 설정 -> licenses 테이블로 들어감
            final_license_type = "github";
        } else {
            // [Case 2: Github URL이 아닌 경우 (예: 공식 홈페이지, 블로그 등)]
            // 1. download_url은 없음 -> NULL
            final_download_url = null;

            // 2. 라이선스 타입도 없음 -> NULL
            final_license_type = null;
        }

        // -------------------------------------------------------
        // [DB 저장] 가공된 데이터를 RPC로 전달
        // -------------------------------------------------------
        const { data, error } = await supabaseClient.rpc("create_skill_flow", {
            // 1. 카테고리 (있으면 ID, 없으면 이름 사용)
            p_category_id: category_id || null,
            p_new_category_name_ko: category_name_ko,
            p_new_category_name_en: category_name_en,

            // 2. Skills 정보
            p_title_ko: title_ko,
            p_title_en: title_en,
            p_sub_title_ko: sub_title_ko,
            p_sub_title_en: sub_title_en,

            // ★ 여기서 결정된 값이 들어갑니다 (Github이면 링크, 아니면 NULL)
            p_download_url: final_download_url,

            p_icon: icon,
            p_tags: tags,

            // 3. Contents 정보
            p_content_text: content_text,
            p_content_type: content_type,

            // 4. Licenses 정보
            // ★ Github이면 'github', 아니면 NULL
            p_license_type: final_license_type,

            // ★ 원본 URL은 Github이든 아니든 무조건 licenses 테이블의 url 컬럼에 저장
            p_github_url: url
        });

        if (error) throw error;

        return new Response(
            JSON.stringify({ success: true, skill_id: data }),
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