import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  PlayCircle, 
  Headphones, 
  BookOpen, 
  Download,
  ExternalLink,
  Mic,
  Users,
  Clock,
  Star,
  GraduationCap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Podcast = () => {
  const episodes = [
    {
      title: "Artigo 1º - Princípios Fundamentais",
      description: "Análise detalhada dos princípios que regem a República Federativa do Brasil",
      duration: "25:30",
      date: "2024-01-15",
      isNew: true
    },
    {
      title: "Artigo 5º - Direitos e Garantias Individuais",
      description: "Exploração dos direitos fundamentais previstos na Constituição",
      duration: "42:15",
      date: "2024-01-10",
      isNew: false
    },
    {
      title: "Artigo 37 - Administração Pública",
      description: "Princípios da administração pública e seus desdobramentos",
      duration: "38:20",
      date: "2024-01-05",
      isNew: false
    }
  ];

  const stats = [
    { icon: Users, label: "Ouvintes", value: "50K+" },
    { icon: Clock, label: "Horas de conteúdo", value: "200+" },
    { icon: Star, label: "Avaliação", value: "4.9" }
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
              Podcast Educacional
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Podcast
              </span>
              <br />
              Leitura da Constituição
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto reading-content">
              Aprenda a Constituição Federal de 1988 de forma prática e acessível. 
              Artigo por artigo, com explicações claras e exemplos do dia a dia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://open.spotify.com/show/116oUNLD4pIqTkzHtYtYKj" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button size="lg" className="accent-gradient text-background font-semibold focus-ring">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Ouvir no Spotify
                </Button>
              </a>
              <Link to="/mentoria">
                <Button variant="outline" size="lg" className="focus-ring">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Quero Mentoria
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Spotify Embed */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Ouça Diretamente Aqui</h2>
              <p className="text-muted-foreground">
                Player integrado do Spotify para sua conveniência
              </p>
            </div>
            
            <div className="bg-card/50 border border-border/60 rounded-lg p-6">
              <iframe 
                src="https://open.spotify.com/embed/show/116oUNLD4pIqTkzHtYtYKj?utm_source=generator&theme=0"
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-lg"
                title="Podcast Leitura da Constituição - Spotify Player"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Episodes List */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Episódios Recentes</h2>
              <p className="text-muted-foreground">
                Explore os artigos da Constituição já explicados
              </p>
            </div>
            
            <div className="grid gap-6">
              {episodes.map((episode, index) => (
                <Card key={index} className="card-gradient border-border/60 hover:border-primary/30 transition-smooth">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        <PlayCircle className="h-3 w-3 mr-1" />
                        Episódio
                      </Badge>
                      {episode.isNew && (
                        <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                          Novo
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{episode.title}</CardTitle>
                    <CardDescription className="text-base">{episode.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{episode.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>{new Date(episode.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <a 
                        href="https://open.spotify.com/show/116oUNLD4pIqTkzHtYtYKj" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" className="w-full focus-ring">
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Ouvir Episódio
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 text-primary">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Podcast;