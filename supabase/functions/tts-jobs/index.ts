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
    const { materialId, text, url } = await req.json();
    
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseService.auth.getUser(token);
    const user = data.user;
    
    if (!user) throw new Error("User not authenticated");

    // Create job in audioJobs table
    const { data: job, error } = await supabaseService
      .from("audioJobs")
      .insert({
        materialId: materialId,
        requestedBy: user.id,
        status: "PENDING",
        log: "Job created",
      })
      .select()
      .single();

    if (error) throw error;

    // Call external TTS service
    const ttsEndpoint = Deno.env.get("TTS_ENDPOINT");
    const webhookSecret = Deno.env.get("TTS_WEBHOOK_SECRET");
    const origin = req.headers.get("origin") || "http://localhost:8080";

    if (ttsEndpoint) {
      const payload = {
        jobId: job.id,
        materialId: materialId,
        text: text,
        url: url,
        webhookUrl: `${origin}/api/tts/callback`,
        secret: webhookSecret,
      };

      try {
        const response = await fetch(ttsEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`TTS service error: ${response.status}`);
        }

        // Update job status
        await supabaseService
          .from("audioJobs")
          .update({
            status: "PROCESSING",
            log: "Sent to TTS service",
          })
          .eq("id", job.id);

      } catch (ttsError) {
        // Update job with error
        await supabaseService
          .from("audioJobs")
          .update({
            status: "FAILED",
            log: `TTS service error: ${ttsError.message}`,
          })
          .eq("id", job.id);
        
        throw ttsError;
      }
    }

    return new Response(JSON.stringify({ ok: true, jobId: job.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in tts-jobs:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});