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
    const url = new URL(req.url);
    const provider = url.searchParams.get("provider");
    
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    if (provider === "mp") {
      // MercadoPago webhook
      const secret = url.searchParams.get("secret");
      const webhookSecret = Deno.env.get("MP_WEBHOOK_SECRET");
      
      if (secret !== webhookSecret) {
        throw new Error("Invalid webhook secret");
      }

      const { data } = await req.json();
      
      if (data.type === "payment") {
        const paymentId = data.id;
        const mpAccessToken = Deno.env.get("MP_ACCESS_TOKEN");
        
        // Get payment details
        const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          headers: {
            "Authorization": `Bearer ${mpAccessToken}`,
          },
        });
        
        const payment = await paymentResponse.json();
        
        if (payment.status === "approved") {
          const userId = payment.metadata?.user_id;
          const plan = payment.metadata?.plan;
          
          if (userId) {
            // Calculate period end (30 days for monthly, 365 for annual)
            const periodDays = plan === "annual" ? 365 : 30;
            const currentPeriodEnd = new Date();
            currentPeriodEnd.setDate(currentPeriodEnd.getDate() + periodDays);
            
            await supabaseService
              .from("subscriptions")
              .upsert({
                userId: userId,
                tier: "PREMIUM",
                status: "ACTIVE",
                provider: "mercadopago",
                providerSubId: paymentId.toString(),
                currentPeriodEnd: currentPeriodEnd.toISOString(),
              }, { onConflict: 'userId' });
          }
        }
      }
    } 
    
    else {
      // Stripe webhook
      const Stripe = (await import("https://esm.sh/stripe@14.21.0")).default;
      const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
        apiVersion: "2023-10-16",
      });
      
      const sig = req.headers.get("stripe-signature");
      const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
      
      if (!sig || !webhookSecret) {
        throw new Error("Missing signature or webhook secret");
      }

      const body = await req.text();
      const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

      if (event.type === "checkout.session.completed" || event.type === "invoice.payment_succeeded") {
        const session = event.data.object as any;
        const userId = session.metadata?.userId;
        
        if (userId && session.subscription) {
          // Get subscription details
          const subscription = await stripe.subscriptions.retrieve(session.subscription);
          
          await supabaseService
            .from("subscriptions")
            .upsert({
              userId: userId,
              tier: "PREMIUM",
              status: "ACTIVE",
              provider: "stripe",
              providerSubId: subscription.id,
              currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
            }, { onConflict: 'userId' });
        }
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in payments-webhook:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});