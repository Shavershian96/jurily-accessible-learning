import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get user info to check if admin
    const authHeader = req.headers.get("Authorization");
    let isAdmin = false;
    
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseClient.auth.getUser(token);
      
      if (data.user) {
        // Check if user is admin/superadmin
        const { data: profile } = await supabaseClient
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .maybeSingle();
        
        isAdmin = profile?.role === "ADMIN" || profile?.role === "SUPERADMIN";
      }
    }

    // Build query based on admin status
    let query = supabaseClient
      .from("menus")
      .select("*")
      .order("orderIndex", { ascending: true });

    // Non-admin users only see visible menus
    if (!isAdmin) {
      query = query.eq("visible", true);
    }

    const { data: menus, error } = await query;

    if (error) throw error;

    return new Response(JSON.stringify(menus || []), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in get-menus:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});