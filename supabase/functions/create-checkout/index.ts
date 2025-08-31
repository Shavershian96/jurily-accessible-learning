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
    const { plan } = await req.json();
    const payProvider = Deno.env.get("PAY_PROVIDER");
    
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user?.email) throw new Error("User not authenticated");

    const origin = req.headers.get("origin") || "http://localhost:8080";

    if (payProvider === "stripe") {
      const Stripe = (await import("https://esm.sh/stripe@14.21.0")).default;
      const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
        apiVersion: "2023-10-16",
      });

      // Check if customer exists
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      let customerId;
      
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      }

      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        customer_email: customerId ? undefined : user.email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: { name: `Luthi Academy ${plan === "annual" ? "Anual" : "Mensal"}` },
              unit_amount: plan === "annual" ? 9900 : 990, // $99/year or $9.90/month
              recurring: { interval: plan === "annual" ? "year" : "month" },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${origin}/account?success=1`,
        cancel_url: `${origin}/premium?canceled=1`,
        metadata: {
          userId: user.id,
        },
      });

      return new Response(JSON.stringify({ url: session.url }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } 
    
    else if (payProvider === "mercadopago") {
      // MercadoPago implementation
      const mpAccessToken = Deno.env.get("MP_ACCESS_TOKEN");
      const webhookSecret = Deno.env.get("MP_WEBHOOK_SECRET");
      
      const preference = {
        items: [
          {
            title: `Luthi Academy ${plan === "annual" ? "Anual" : "Mensal"}`,
            unit_price: plan === "annual" ? 290 : 29,
            quantity: 1,
          }
        ],
        payer: {
          email: user.email,
        },
        back_urls: {
          success: `${origin}/account?success=1`,
          failure: `${origin}/premium?canceled=1`,
          pending: `${origin}/premium?pending=1`,
        },
        notification_url: `${origin}/api/payments/webhook?provider=mp&secret=${webhookSecret}`,
        metadata: {
          user_id: user.id,
          plan: plan,
        },
      };

      const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${mpAccessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preference),
      });

      const data = await response.json();
      
      return new Response(JSON.stringify({ url: data.init_point }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    else {
      throw new Error("Payment provider not configured");
    }

  } catch (error) {
    console.error("Error in create-checkout:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});