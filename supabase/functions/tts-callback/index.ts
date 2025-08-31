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
    const { jobId, materialId, status, audioUrl, secret } = await req.json();
    
    // Validate webhook secret
    const webhookSecret = Deno.env.get("TTS_WEBHOOK_SECRET");
    if (secret !== webhookSecret) {
      throw new Error("Invalid webhook secret");
    }

    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    if (status === "DONE") {
      // Update audioJobs table
      await supabaseService
        .from("audioJobs")
        .update({
          status: "DONE",
          resultUrl: audioUrl,
          log: "Audio generation completed successfully",
        })
        .eq("id", jobId);

      // Update materials table with audioUrl
      await supabaseService
        .from("materials")
        .update({
          audioUrl: audioUrl,
        })
        .eq("id", materialId);

    } else if (status === "FAILED") {
      // Update audioJobs table with failure
      await supabaseService
        .from("audioJobs")
        .update({
          status: "FAILED",
          log: "Audio generation failed",
        })
        .eq("id", jobId);
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in tts-callback:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});