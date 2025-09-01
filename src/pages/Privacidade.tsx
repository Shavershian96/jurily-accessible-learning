import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Lock, 
  Eye,
  UserCheck,
  FileText,
  Mail,
  Database,
  Settings,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacidade = () => {
  const sections = [
    {
      id: "coleta",
      title: "Coleta de Informações",
      icon: Database,
      content: [
        "Coletamos informações que você nos fornece diretamente, como nome, e-mail e telefone ao se cadastrar ou entrar em contato conosco.",
        "Dados de navegação são coletados automaticamente através de cookies e tecnologias similares para melhorar sua experiência.",
        "Informações de uso da plataforma, como materiais acessados e tempo de estudo, para personalizar seu aprendizado.",
        "Dados de pagamento processados por terceiros seguros (Stripe, PagSeguro) - não armazenamos informações de cartão de crédito."
      ]
    },
    {
      id: "uso",
      title: "Uso das Informações",
      icon: Settings,
      content: [
        "Fornecer e melhorar nossos serviços educacionais e de mentoria jurídica.",
        "Personalizar sua experiência de aprendizado e recomendar conteúdos relevantes.",
        "Comunicar atualizações importantes, novos materiais e oportunidades educacionais.",
        "Processar pagamentos e gerenciar sua conta e assinaturas.",
        "Cumprir obrigações legais e resolver disputas quando necessário."
      ]
    },
    {
      id: "compartilhamento",
      title: "Compartilhamento de Dados",
      icon: UserCheck,
      content: [
        "Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing.",
        "Compartilhamos dados apenas com prestadores de serviços essenciais (processamento de pagamentos, hospedagem, análise).",
        "Podemos divulgar informações quando exigido por lei ou para proteger nossos direitos legítimos.",
        "Em caso de fusão ou aquisição, seus dados podem ser transferidos mediante notificação prévia."
      ]
    },
    {
      id: "seguranca",
      title: "Segurança dos Dados",
      icon: Lock,
      content: [
        "Utilizamos criptografia SSL/TLS para proteger dados em trânsito.",
        "Armazenamento seguro em serviços certificados (Supabase) com backup regular.",
        "Controles de acesso rigorosos - apenas pessoal autorizado acessa dados pessoais.",
        "Monitoramento contínuo contra acessos não autorizados e atividades suspeitas.",
        "Políticas internas de segurança e treinamento regular da equipe."
      ]
    },
    {
      id: "cookies",
      title: "Cookies e Tecnologias",
      icon: Eye,
      content: [
        "Usamos cookies essenciais para funcionalidade básica da plataforma.",
        "Cookies de análise para entender como você usa nossos serviços (Google Analytics).",
        "Cookies de preferência para lembrar suas configurações e escolhas.",
        "Você pode controlar cookies através das configurações do seu navegador.",
        "Alguns recursos podem não funcionar corretamente se cookies forem desabilitados."
      ]
    },
    {
      id: "direitos",
      title: "Seus Direitos (LGPD)",
      icon: Shield,
      content: [
        "Acesso: Você pode solicitar uma cópia dos seus dados pessoais que processamos.",
        "Retificação: Correção de dados pessoais inexatos ou incompletos.",
        "Exclusão: Solicitação de remoção dos seus dados, salvo quando a retenção for obrigatória por lei.",
        "Portabilidade: Transferência dos seus dados para outro serviço em formato estruturado.",
        "Oposição: Recusa ao processamento de dados para finalidades específicas como marketing direto."
      ]
    }
  ];

  const contacts = [
    {
      title: "Encarregado de Dados (DPO)",
      email: "dpo@luthi.online",
      description: "Para exercer seus direitos ou esclarecer dúvidas sobre tratamento de dados"
    },
    {
      title: "Suporte Geral",
      email: "contato@luthi.online", 
      description: "Para questões gerais sobre a plataforma e serviços"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-background via-card/50 to-muted/30 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="accent-gradient text-background px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              LGPD Compliance
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Política de
              </span>
              <br />
              Privacidade
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto reading-content">
              Transparência total sobre como coletamos, usamos e protegemos suas informações pessoais. 
              Comprometidos com a Lei Geral de Proteção de Dados (LGPD).
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Última atualização: Janeiro 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>LGPD Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introduction */}
            <Card className="border-border/50 bg-primary/5">
              <CardContent className="p-8">
                <div className="space-y-4 reading-content">
                  <h2 className="text-2xl font-bold mb-4">Compromisso com sua Privacidade</h2>
                  <p>
                    A LuthyAcademi está comprometida em proteger sua privacidade e garantir a transparência 
                    no tratamento de dados pessoais. Esta política explica como coletamos, usamos, armazenamos 
                    e protegemos suas informações.
                  </p>
                  <p>
                    Seguimos rigorosamente a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018) e 
                    adotamos as melhores práticas internacionais de segurança e privacidade.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Sections */}
            {sections.map((section, index) => (
              <Card key={section.id} className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 reading-content">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            {/* Data Retention */}
            <Card className="border-border/50 bg-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-secondary/10">
                    <FileText className="h-5 w-5 text-secondary" />
                  </div>
                  Retenção de Dados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 reading-content">
                  <p>
                    Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades 
                    para as quais foram coletados, respeitando os prazos legais aplicáveis:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li>• Dados de conta: Durante a vigência da relação contratual + 5 anos</li>
                    <li>• Dados de pagamento: 5 anos após a última transação</li>
                    <li>• Dados de navegação: 12 meses</li>
                    <li>• Comunicações: 3 anos após o último contato</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Alterações */}
            <Card className="border-border/50 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-accent/10">
                    <AlertTriangle className="h-5 w-5 text-accent" />
                  </div>
                  Alterações nesta Política
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 reading-content">
                  <p>
                    Podemos atualizar esta política periodicamente para refletir mudanças em nossas práticas 
                    ou na legislação aplicável. Quando isso ocorrer:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li>• Notificaremos você por e-mail sobre mudanças significativas</li>
                    <li>• Atualizaremos a data da "última modificação" no topo desta página</li>
                    <li>• Disponibilizaremos um resumo das principais mudanças</li>
                    <li>• Seu uso continuado dos serviços constitui aceitação das alterações</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  Contatos para Questões de Privacidade
                </CardTitle>
                <CardDescription>
                  Entre em contato conosco para exercer seus direitos ou esclarecer dúvidas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {contacts.map((contact, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold">{contact.title}</h4>
                      <p className="text-primary font-medium">{contact.email}</p>
                      <p className="text-sm text-muted-foreground">{contact.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Prazo de resposta:</strong> Responderemos suas solicitações em até 15 dias corridos, 
                    conforme estabelecido pela LGPD. Para questões complexas, poderemos prorrogar este prazo por 
                    mais 15 dias, mediante justificativa.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacidade;