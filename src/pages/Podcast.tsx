import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  Play, 
  ExternalLink, 
  Clock, 
  Calendar,
  Download,
  Share2,
  BookOpen,
  Volume2,
  Headphones
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Podcast = () => {
  const episodes = [
    {
      title: "Preâmbulo da Constituição",
      description: "Análise completa do preâmbulo constitucional e sua importância jurídica",
      duration: "15 min",
      date: "2024-01-15",
      spotifyUrl: "https://open.spotify.com/episode/example1"
    },
    {
      title: "Artigo 1º - Fundamentos da República",
      description: "Soberania, cidadania, dignidade da pessoa humana e valores sociais do trabalho",
      duration: "22 min", 
      date: "2024-01-08",
      spotifyUrl: "https://open.spotify.com/episode/example2"
    },
    {
      title: "Artigo 2º - Separação dos Poderes",
      description: "Harmonia e independência entre Executivo, Legislativo e Judiciário",
      duration: "18 min",
      date: "2024-01-01",
      spotifyUrl: "https://open.spotify.com/episode/example3"
    },
    {
      title: "Artigo 3º - Objetivos Fundamentais",
      description: "Construir uma sociedade livre, justa e solidária",
      duration: "20 min",
      date: "2023-12-25",
      spotifyUrl: "https://open.spotify.com/episode/example4"
    }
  ];

  const stats = [
    {
      icon: Play,
      number: "50+",
      label: "Episódios",
      description: "Artigos explicados"
    },
    {
      icon: Clock,
      number: "15h",
      label: "Conteúdo",
      description: "Total gravado"
    },
    {
      icon: Headphones,
      number: "2.5k",
      label: "Ouvintes",
      description: "Mensais ativos"
    },
    {
      icon: BookOpen,
      number: "183",
      label: "Artigos",
      description: "Para cobrir"
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
              <Mic className="h-4 w-4 mr-2" />
              Podcast Educativo
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Leitura da
              </span>
              <br />
              Constituição
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto reading-content">
              Aprenda a Constituição Federal de forma prática e acessível. Cada episódio explica 
              artigos específicos com comentários jurídicos e aplicações práticas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="accent-gradient text-background font-semibold focus-ring"
                onClick={() => window.open('https://open.spotify.com/show/116oUNLD4pIqTkzHtYtYKj', '_blank')}
              >
                <Volume2 className="h-5 w-5 mr-2" />
                Ouvir no Spotify
              </Button>
              <Button variant="outline" size="lg" className="focus-ring">
                <Share2 className="h-5 w-5 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Spotify Player Embed */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Player Oficial</h2>
              <p className="text-muted-foreground">
                Ouça diretamente aqui ou acesse nossa página no Spotify
              </p>
            </div>
            
            <div className="relative bg-card/50 rounded-2xl p-6 shadow-card">
              <iframe 
                src="https://open.spotify.com/embed/show/116oUNLD4pIqTkzHtYtYKj?utm_source=generator&theme=0" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-xl"
                title="Podcast Leitura da Constituição no Spotify"
              />
              
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  onClick={() => window.open('https://open.spotify.com/show/116oUNLD4pIqTkzHtYtYKj', '_blank')}
                  className="focus-ring"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Abrir no Spotify
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-card/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Impacto do Projeto</h2>
              <p className="text-muted-foreground">
                Democratizando o acesso ao conhecimento constitucional
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center border-border/50 bg-gradient-to-br from-card to-muted/20">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <stat.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="font-semibold mb-1">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Episodes */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Episódios Recentes</h2>
              <p className="text-muted-foreground">
                Acompanhe os últimos artigos explicados
              </p>
            </div>

            <div className="space-y-6">
              {episodes.map((episode, index) => (
                <Card key={index} className="border-border/50 hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-full bg-primary/10">
                            <Play className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(episode.date).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {episode.duration}
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2">{episode.title}</h3>
                        <p className="text-muted-foreground reading-content mb-4">
                          {episode.description}
                        </p>
                        
                        <div className="flex gap-3">
                          <Button 
                            size="sm" 
                            className="accent-gradient text-background focus-ring"
                            onClick={() => window.open(episode.spotifyUrl, '_blank')}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Ouvir
                          </Button>
                          <Button variant="outline" size="sm" className="focus-ring">
                            <Share2 className="h-4 w-4 mr-2" />
                            Compartilhar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open('https://open.spotify.com/show/116oUNLD4pIqTkzHtYtYKj', '_blank')}
                className="focus-ring"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Ver Todos os Episódios
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Project */}
      <section className="py-20 bg-card/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Sobre o Projeto</h2>
            <div className="space-y-6 text-muted-foreground reading-content">
              <p>
                O podcast "Leitura da Constituição" nasceu da necessidade de tornar o texto 
                constitucional mais acessível para estudantes, profissionais do direito e 
                cidadãos interessados em conhecer seus direitos e deveres.
              </p>
              <p>
                Cada episódio é cuidadosamente preparado com explicações didáticas, 
                exemplos práticos e comentários jurisprudenciais, transformando o estudo 
                da Constituição em uma experiência envolvente e educativa.
              </p>
              <p>
                Nossa missão é democratizar o conhecimento constitucional, contribuindo 
                para uma sociedade mais consciente e juridicamente informada.
              </p>
            </div>
            
            <div className="mt-8">
              <Button 
                size="lg"
                className="accent-gradient text-background font-semibold focus-ring"
                onClick={() => window.open('https://open.spotify.com/show/116oUNLD4pIqTkzHtYtYKj', '_blank')}
              >
                <Headphones className="h-5 w-5 mr-2" />
                Começar a Ouvir
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Podcast;