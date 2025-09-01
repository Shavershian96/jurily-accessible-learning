import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  MessageCircle,
  Calendar,
  Star,
  Zap,
  Target,
  BookOpen,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Mentoria = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    area: '',
    fase: '',
    observacoes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const plans = [
    {
      name: "Start",
      price: "R$ 197",
      duration: "30 dias",
      description: "Ideal para quem está começando",
      features: [
        "Avaliação inicial completa",
        "Plano de estudo personalizado",
        "1 sessão de mentoria individual",
        "Material de apoio exclusivo",
        "Suporte via WhatsApp"
      ],
      icon: Target,
      badge: "Iniciante",
      gradient: "bg-gradient-to-br from-primary/20 to-secondary/20"
    },
    {
      name: "Pro",
      price: "R$ 497",
      duration: "mensal",
      description: "Para quem quer acelerar os resultados",
      features: [
        "4 sessões de mentoria semanais",
        "Cronograma de estudos detalhado",
        "Simulados exclusivos",
        "Revisão de questões comentadas",
        "Grupo VIP no Telegram",
        "Suporte prioritário"
      ],
      icon: Zap,
      badge: "Mais Popular",
      gradient: "bg-gradient-to-br from-secondary/20 to-primary/20",
      popular: true
    },
    {
      name: "Oral",
      price: "R$ 297",
      duration: "por sessão",
      description: "Preparação específica para prova oral",
      features: [
        "Simulado de prova oral",
        "Banca técnica especializada",
        "Feedback detalhado",
        "Técnicas de apresentação",
        "Material de sustentação oral"
      ],
      icon: MessageCircle,
      badge: "Especializado",
      gradient: "bg-gradient-to-br from-accent/20 to-primary/20"
    }
  ];

  const testimonials = [
    {
      name: "Ana Carolina",
      role: "Aprovada no TJ-SP",
      content: "A mentoria foi fundamental para minha aprovação. O plano de estudos personalizado e o suporte constante fizeram toda a diferença.",
      rating: 5
    },
    {
      name: "Marcus Vinícius", 
      role: "Aprovado no MP-RJ",
      content: "As sessões de mentoria me ajudaram a focar no que realmente importa. Economizei meses de estudo com a orientação correta.",
      rating: 5
    },
    {
      name: "Juliana Santos",
      role: "Aprovada na Defensoria",
      content: "O simulado oral foi perfeito! Me senti muito mais confiante na prova após a preparação com a mentoria.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Como funciona o processo de mentoria?",
      answer: "Após a contratação, você receberá um formulário detalhado para avaliarmos seu perfil. Em seguida, montamos um plano personalizado e agendamos as sessões conforme o plano escolhido."
    },
    {
      question: "As sessões são online ou presenciais?",
      answer: "Todas as sessões são realizadas online via Google Meet ou Zoom, permitindo flexibilidade de horários e eliminando deslocamentos."
    },
    {
      question: "Posso trocar de plano durante o período?",
      answer: "Sim! Você pode fazer upgrade do seu plano a qualquer momento. Para downgrade, entre em contato conosco para avaliarmos a melhor forma."
    },
    {
      question: "Qual a qualificação dos mentores?",
      answer: "Todos nossos mentores são aprovados em concursos de alto nível (magistratura, ministério público, defensoria) e possuem experiência comprovada em coaching para concursos."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular envio (aqui você integraria com Supabase ou email)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Formulário enviado com sucesso!",
        description: "Entraremos em contato em até 24 horas para agendar sua primeira sessão.",
      });
      
      setFormData({
        nome: '',
        email: '',
        whatsapp: '',
        area: '',
        fase: '',
        observacoes: ''
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar formulário",
        description: "Tente novamente ou entre em contato conosco diretamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-background via-card/50 to-muted/30 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="accent-gradient text-background px-4 py-2">
              <GraduationCap className="h-4 w-4 mr-2" />
              Mentoria Especializada
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Mentoria Jurídica
              </span>
              <br />
              para Concursos
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto reading-content">
              Acelere sua aprovação com orientação personalizada de quem já conquistou a vaga dos seus sonhos.
              Planos flexíveis para cada fase da sua jornada.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="accent-gradient text-background font-semibold focus-ring">
                <MessageCircle className="h-5 w-5 mr-2" />
                Quero Mentoria
              </Button>
              <Button variant="outline" size="lg" className="focus-ring">
                <Calendar className="h-5 w-5 mr-2" />
                Agendar Sessão
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Escolha seu Plano</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Diferentes planos para diferentes momentos da sua preparação
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name} 
                className={`relative ${plan.gradient} border-border/50 transition-all duration-300 hover:scale-105 hover:shadow-glow ${plan.popular ? 'ring-2 ring-primary/50' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="accent-gradient text-background">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <plan.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">{plan.price}</div>
                    <div className="text-sm text-muted-foreground">por {plan.duration}</div>
                  </div>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full accent-gradient text-background font-semibold focus-ring">
                    Contratar Plano
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-card/30">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Solicite sua Mentoria</h2>
              <p className="text-muted-foreground">
                Preencha o formulário e nossa equipe entrará em contato para personalizar seu plano de estudos
              </p>
            </div>

            <Card className="border-border/50">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="nome" className="text-sm font-medium">Nome Completo *</label>
                      <Input
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                        className="focus-ring"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">E-mail *</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="focus-ring"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp *</label>
                      <Input
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        required
                        className="focus-ring"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="area" className="text-sm font-medium">Área do Concurso *</label>
                      <Input
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        required
                        className="focus-ring"
                        placeholder="Ex: Magistratura, MP, Defensoria"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="fase" className="text-sm font-medium">Fase Atual *</label>
                    <Input
                      id="fase"
                      name="fase"
                      value={formData.fase}
                      onChange={handleInputChange}
                      required
                      className="focus-ring"
                      placeholder="Ex: Objetiva, Discursiva, Oral"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="observacoes" className="text-sm font-medium">Observações</label>
                    <Textarea
                      id="observacoes"
                      name="observacoes"
                      value={formData.observacoes}
                      onChange={handleInputChange}
                      className="focus-ring"
                      placeholder="Conte-nos sobre suas dificuldades, objetivos e experiências anteriores..."
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full accent-gradient text-background font-semibold focus-ring"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background mr-2" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Solicitar Mentoria
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Histórias de Sucesso</h2>
            <p className="text-muted-foreground">
              Veja o que nossos mentorados conquistaram
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 reading-content">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-card/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
              <p className="text-muted-foreground">
                Esclarecemos as principais dúvidas sobre nossa mentoria
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3 text-primary">{faq.question}</h3>
                    <p className="text-muted-foreground reading-content">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Mentoria;