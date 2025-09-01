import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  ArrowRight, 
  CheckCircle,
  Star,
  Play
} from "lucide-react";

const Hero = () => {
  const stats = [
    { icon: BookOpen, label: "Materiais", value: "1,200+" },
    { icon: GraduationCap, label: "Professores", value: "50+" },
    { icon: Users, label: "Estudantes", value: "15,000+" },
  ];

  const highlights = [
    "Conteúdo gratuito de qualidade",
    "Professores especializados",
    "Áudios gerados por IA",
    "Acesso ilimitado premium"
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with subtle gradient and glow */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"></div>

      <div className="container relative z-10 text-center">
        {/* Badge */}
        <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-primary/20 bg-primary/5 text-primary">
          <Star className="h-3 w-3 mr-2" />
          Educação Jurídica de Excelência
        </Badge>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-transparent">
          Educação Jurídica
          <br />
          <span className="accent-gradient bg-clip-text text-transparent">
            Acessível
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          Acesse apostilas, artigos e constituições com qualidade profissional. 
          Conteúdo gratuito e premium para impulsionar seus estudos jurídicos.
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
          {highlights.map((highlight) => (
            <div key={highlight} className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/mentoria">
            <Button 
              size="lg" 
              className="accent-gradient text-background font-semibold hover:opacity-90 transition-smooth px-8 py-6 text-lg shadow-glow focus-ring"
            >
              <GraduationCap className="h-5 w-5 mr-2" />
              Quero Mentoria
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
          
          <Link to="/podcast">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-border/60 hover:bg-accent/10 hover:border-primary/50 transition-smooth px-8 py-6 text-lg focus-ring"
            >
              <Play className="h-5 w-5 mr-2" />
              Ouvir Podcast
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 text-primary">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;