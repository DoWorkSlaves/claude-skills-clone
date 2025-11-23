import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // 1. Handle CORS (Allow browser preflight requests)
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // 2. Initialize Supabase Client
        // Pass the user's authorization header to maintain RLS policies
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            {
                global: {
                    headers: { Authorization: req.headers.get('Authorization')! },
                },
            }
        )

        // 3. Extract skill_id from the request body
        const { skill_id } = await req.json()

        if (!skill_id) {
            throw new Error("skill_id is required")
        }

        // 4. [Core Logic 1] Increment view count (Call RPC)
        // Even if this fails, we should still return the data, so we just log the error without throwing.
        const { error: rpcError } = await supabase.rpc('increment_views', { row_id: skill_id })
        if (rpcError) console.error("Error incrementing views:", rpcError)

        // 5. [Core Logic 2] Fetch detailed data (Using Joins)
        // Fetch skill info along with linked categories, contents, and licenses
        const { data, error } = await supabase
            .from('skills')
            .select(`
        *,
        categories:fk_categories(*),
        contents(*),
        licenses(*)
      `)
            .eq('id', skill_id)
            .single()

        if (error) throw error

        // 6. Return the result
        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})