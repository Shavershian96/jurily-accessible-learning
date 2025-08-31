import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Crown, 
  Check, 
  Sparkles, 
  Zap,
  BookOpen,
  Volume2,
  Download,
  MessageCircle,
  ArrowRight
} from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Gratuito",
    price: "R$ 0",
    period: "para sempre",
    description: "Perfeito para começar seus estudos",
    features: [
      "Acesso a materiais gratuitos",
      "Busca básica",
      "Suporte por email",
      "Acesso limitado ao catálogo"
    ],
    buttonText: "Plano Atual"
  },
  {
    id: "monthly",
    name: "Premium Mensal",
    price: "R$ 29",
    period: "por mês",
    description: "Acesso completo com flexibilidade mensal",
    features: [
      "Acesso a todo conteúdo premium",
      "Áudios gerados por IA",
      "Download de PDFs",
      "Busca avançada",
      "Suporte prioritário",
      "Novos materiais semanais"
    ],
    popular: true,
    buttonText: "Assinar Mensal"
  },
  {
    id: "annual",
    name: "Premium Anual",
    price: "R$ 290",
    period: "por ano",
    description: "Melhor valor - economize 2 meses",
    features: [
      "Tudo do plano mensal",
      "2 meses grátis (economia de R$ 58)",
      "Acesso antecipado a novos recursos",
      "Sessões de mentoria mensais",
      "Certificados de conclusão",
      "Grupo VIP no Discord"
    ],
    buttonText: "Assinar Anual"
  }
];

const Premium = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { user, isPremium } = useAuth();
  const { toast } = useToast();

  const handleSubscribe = async (plan: string) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para assinar um plano premium.",
        variant: "destructive",
      });
      return;
    }

    if (plan === "free") return;

    try {
      setLoading(plan);
      
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { plan }
      });

      if (error) throw error;

      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      toast({
        title: "Erro ao criar checkout",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
        
        <div className="container relative z-10 py-20 text-center">
          <div className="mx-auto w-20 h-20 rounded-full accent-gradient flex items-center justify-center mb-8">
            <Crown className="h-10 w-10 text-background" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Desbloqueie Seu
            <br />
            <span className="accent-gradient bg-clip-text text-transparent">
              Potencial Jurídico
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Acesse todo nosso catálogo premium com materiais exclusivos, 
            áudios gerados por IA e muito mais para acelerar seus estudos.
          </p>

          {isPremium && (
            <Badge variant="secondary" className="accent-gradient text-background text-lg px-6 py-2 mb-6">
              <Sparkles className="h-5 w-5 mr-2" />
              Você já é Premium!
            </Badge>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Por que escolher o Premium?</h2>
          <p className="text-xl text-muted-foreground">
            Recursos exclusivos para turbinar seus estudos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: BookOpen,
              title: "Conteúdo Exclusivo",
              description: "Acesso a apostilas, artigos e materiais premium de alta qualidade"
            },
            {
              icon: Volume2,
              title: "Áudios com IA",
              description: "Ouça qualquer material com nossa tecnologia de síntese de voz"
            },
            {
              icon: Download,
              title: "Downloads Ilimitados",
              description: "Baixe PDFs e materiais para estudar offline quando quiser"
            },
            {
              icon: MessageCircle,
              title: "Suporte Premium",
              description: "Atendimento prioritário e suporte técnico especializado"
            }
          ].map((feature, index) => (
            <Card key={index} className="text-center border-border/60 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="container pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Escolha seu plano</h2>
          <p className="text-xl text-muted-foreground">
            Comece gratuitamente ou desbloqueie todo o potencial
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${
                plan.popular 
                  ? "border-primary ring-2 ring-primary/20 scale-105" 
                  : "border-border/60"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 accent-gradient text-background">
                  <Zap className="h-3 w-3 mr-1" />
                  Mais Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading === plan.id || (plan.id === "free" && !isPremium)}
                  className={`w-full ${
                    plan.popular 
                      ? "accent-gradient text-background hover:opacity-90" 
                      : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {loading === plan.id ? (
                    "Processando..."
                  ) : (
                    <>
                      {plan.buttonText}
                      {plan.id !== "free" && <ArrowRight className="h-4 w-4 ml-2" />}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <h3 className="text-2xl font-bold text-center mb-8">Perguntas Frequentes</h3>
          
          <div className="space-y-6">
            {[
              {
                question: "Posso cancelar a qualquer momento?",
                answer: "Sim, você pode cancelar sua assinatura a qualquer momento. Você continuará tendo acesso até o final do período pago."
              },
              {
                question: "Qual a diferença entre os planos?",
                answer: "O plano anual oferece 2 meses grátis e recursos exclusivos como mentoria e certificados. O mensal oferece flexibilidade."
              },
              {
                question: "Como funciona o período de teste?",
                answer: "Oferecemos 7 dias gratuitos para você experimentar todos os recursos premium sem compromisso."
              },
              {
                question: "Posso fazer upgrade/downgrade?",
                answer: "Sim, você pode alterar seu plano a qualquer momento através da sua conta."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-border/60">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">{faq.question}</h4>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;