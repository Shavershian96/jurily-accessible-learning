import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Users,
  Headphones,
  BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Resposta rápida em horário comercial",
      contact: "+55 (11) 99999-0000",
      action: "Chamar no WhatsApp",
      link: "https://wa.me/5511999990000",
      available: true
    },
    {
      icon: Mail,
      title: "E-mail",
      description: "Para dúvidas detalhadas e documentos",
      contact: "contato@luthi.online",
      action: "Enviar E-mail",
      link: "mailto:contato@luthi.online",
      available: true
    },
    {
      icon: Phone,
      title: "Telefone",
      description: "Atendimento telefônico especializado",
      contact: "+55 (11) 3333-4444",
      action: "Ligar Agora",
      link: "tel:+551133334444",
      available: true
    }
  ];

  const supportTypes = [
    {
      icon: BookOpen,
      title: "Dúvidas sobre Conteúdo",
      description: "Materiais, apostilas e metodologia de estudo",
      responseTime: "2-4 horas"
    },
    {
      icon: Users,
      title: "Suporte à Mentoria",
      description: "Agendamentos, planos e acompanhamento",
      responseTime: "1-2 horas"
    },
    {
      icon: Headphones,
      title: "Suporte Técnico",
      description: "Problemas na plataforma ou acesso aos materiais",
      responseTime: "30 min - 1 hora"
    }
  ];

  const businessHours = [
    { day: "Segunda a Sexta", hours: "8h às 18h" },
    { day: "Sábado", hours: "9h às 14h" },
    { day: "Domingo", hours: "Fechado" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.email || !formData.mensagem) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha nome, e-mail e mensagem.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envio (aqui você integraria com Supabase ou email service)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em até 24 horas.",
      });
      
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: ''
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente ou use um de nossos canais diretos.",
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
              <MessageCircle className="h-4 w-4 mr-2" />
              Suporte Personalizado
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Entre em
              </span>
              <br />
              Contato
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto reading-content">
              Estamos aqui para ajudar você em sua jornada de estudos. Nossa equipe está 
              pronta para esclarecer dúvidas, fornecer suporte e orientar seu aprendizado.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Formas de Contato</h2>
            <p className="text-muted-foreground">
              Escolha o canal que melhor atende sua necessidade
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center border-border/50 hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <method.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="text-lg font-semibold">{method.contact}</div>
                  
                  <Button 
                    className="w-full accent-gradient text-background font-semibold focus-ring"
                    onClick={() => window.open(method.link, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {method.action}
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-muted-foreground">Disponível</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-card/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Envie sua Mensagem</h2>
              <p className="text-muted-foreground">
                Preencha o formulário e nossa equipe entrará em contato
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
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
                        <label htmlFor="telefone" className="text-sm font-medium">Telefone</label>
                        <Input
                          id="telefone"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleInputChange}
                          className="focus-ring"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="assunto" className="text-sm font-medium">Assunto</label>
                        <Input
                          id="assunto"
                          name="assunto"
                          value={formData.assunto}
                          onChange={handleInputChange}
                          className="focus-ring"
                          placeholder="Ex: Dúvida sobre mentoria"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="mensagem" className="text-sm font-medium">Mensagem *</label>
                      <Textarea
                        id="mensagem"
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleInputChange}
                        required
                        className="focus-ring"
                        placeholder="Descreva sua dúvida ou solicitação em detalhes..."
                        rows={6}
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
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Support Info */}
              <div className="space-y-8">
                {/* Support Types */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Headphones className="h-5 w-5 text-primary" />
                      Tipos de Suporte
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {supportTypes.map((type, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <type.icon className="h-4 w-4 text-primary" />
                          <span className="font-medium">{type.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">{type.description}</p>
                        <div className="flex items-center gap-2 ml-6 text-xs">
                          <Clock className="h-3 w-3 text-green-500" />
                          <span className="text-green-500">Resposta em {type.responseTime}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Business Hours */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Horário de Atendimento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {businessHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{schedule.day}</span>
                        <span className="text-sm font-medium">{schedule.hours}</span>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-border/60">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertCircle className="h-4 w-4" />
                        Emergências: WhatsApp 24h
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Location */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Localização
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>São Paulo, SP - Brasil</p>
                      <p className="text-muted-foreground">
                        Atendimento 100% digital para sua comodidade e segurança.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;