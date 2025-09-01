import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Target, 
  Heart,
  Users,
  BookOpen,
  Award,
  Lightbulb,
  Shield,
  Globe,
  Star,
  CheckCircle,
  MessageCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Sobre = () => {
  const values = [
    {
      icon: BookOpen,
      title: "Acessibilidade",
      description: "Democratizamos o conhecimento jurídico, tornando-o acessível a todos, independentemente de condição social ou econômica."
    },
    {
      icon: Award,
      title: "Excelência",
      description: "Buscamos sempre a mais alta qualidade em nossos materiais, com professores especialistas e conteúdo atualizado."
    },
    {
      icon: Heart,
      title: "Compromisso Social",
      description: "Acreditamos que a educação jurídica de qualidade é um direito e uma ferramenta de transformação social."
    },
    {
      icon: Lightbulb,
      title: "Inovação",
      description: "Utilizamos tecnologia e metodologias modernas para criar experiências de aprendizado envolventes e eficazes."
    }
  ];

  const team = [
    {
      name: "Prof. Ana Silva",
      role: "Fundadora e Diretora Acadêmica",
      description: "Doutora em Direito Constitucional, aprovada no concurso para Procuradora da República. Especialista em preparação para concursos de alto nível.",
      image: "/placeholder.svg"
    },
    {
      name: "Prof. Carlos Santos",
      role: "Coordenador de Conteúdo",
      description: "Mestre em Direito Administrativo, aprovado para Juiz Federal. Autor de diversos livros sobre direito público e preparação para concursos.",
      image: "/placeholder.svg"
    },
    {
      name: "Prof. Maria Oliveira",
      role: "Especialista em Metodologia",
      description: "Pedagoga e especialista em educação à distância. Desenvolve metodologias inovadoras para otimização do aprendizado jurídico.",
      image: "/placeholder.svg"
    }
  ];

  const achievements = [
    {
      number: "2.500+",
      label: "Estudantes Impactados",
      description: "Alunos que já utilizaram nossos materiais"
    },
    {
      number: "150+",
      label: "Materiais Criados",
      description: "Apostilas, resumos e conteúdos exclusivos"
    },
    {
      number: "50+",
      label: "Aprovações",
      description: "Alunos aprovados em concursos de alto nível"
    },
    {
      number: "98%",
      label: "Satisfação",
      description: "Índice de satisfação dos nossos usuários"
    }
  ];

  const timeline = [
    {
      year: "2020",
      title: "Fundação",
      description: "Nascimento da LuthyAcademi com a missão de democratizar a educação jurídica no Brasil."
    },
    {
      year: "2021",
      title: "Primeiro Podcast",
      description: "Lançamento do podcast 'Leitura da Constituição', que se tornou referência no segmento."
    },
    {
      year: "2022",
      title: "Plataforma Digital",
      description: "Criação da plataforma online com materiais exclusivos e sistema de mentoria."
    },
    {
      year: "2023",
      title: "Reconhecimento",
      description: "Premiação como melhor plataforma de educação jurídica digital do ano."
    },
    {
      year: "2024",
      title: "Expansão",
      description: "Lançamento do programa de mentoria e parcerias com principais bancas organizadoras."
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
              <Heart className="h-4 w-4 mr-2" />
              Nossa História
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Sobre a
              </span>
              <br />
              LuthyAcademi
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto reading-content">
              Nascemos da convicção de que a educação jurídica de qualidade deve ser acessível a todos. 
              Nossa missão é democratizar o conhecimento do direito e formar profissionais preparados 
              para transformar a sociedade.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center border-border/50 bg-gradient-to-br from-primary/10 to-transparent">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground reading-content">
                  Democratizar o acesso à educação jurídica de excelência, formando profissionais 
                  éticos e capacitados para construir uma sociedade mais justa.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border/50 bg-gradient-to-br from-secondary/10 to-transparent">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-secondary/10">
                    <Globe className="h-8 w-8 text-secondary" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground reading-content">
                  Ser a principal referência em educação jurídica digital no Brasil, 
                  reconhecida pela qualidade e inovação em nossos métodos de ensino.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border/50 bg-gradient-to-br from-accent/10 to-transparent">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-accent/10">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Valores</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground reading-content">
                  Excelência acadêmica, inclusão social, inovação tecnológica e 
                  compromisso com a transformação da sociedade através do direito.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nossos Valores</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Princípios que guiam todas nossas ações e decisões
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-border/50">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm reading-content">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nossos Números</h2>
            <p className="text-muted-foreground">
              Resultados que comprovam nosso impacto na educação jurídica
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center border-border/50 bg-gradient-to-br from-card to-muted/20">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">{achievement.number}</div>
                  <div className="font-semibold mb-2">{achievement.label}</div>
                  <div className="text-sm text-muted-foreground">{achievement.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-card/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nossa Equipe</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Profissionais experientes e apaixonados por educação jurídica
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-border/50">
                <CardContent className="p-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                    <GraduationCap className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <Badge variant="secondary" className="mb-4">{member.role}</Badge>
                  <p className="text-muted-foreground text-sm reading-content">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nossa Trajetória</h2>
            <p className="text-muted-foreground">
              Marcos importantes da nossa história
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="h-16 w-px bg-border/60 mt-4" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline">{item.year}</Badge>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground reading-content">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold">Faça Parte da Nossa História</h2>
            <p className="text-xl text-muted-foreground reading-content">
              Junte-se a milhares de estudantes que já transformaram suas vidas 
              com nossa educação jurídica de qualidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="accent-gradient text-background font-semibold focus-ring">
                <Users className="h-5 w-5 mr-2" />
                Começar Agora
              </Button>
              <Button variant="outline" size="lg" className="focus-ring">
                <MessageCircle className="h-5 w-5 mr-2" />
                Falar Conosco
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sobre;