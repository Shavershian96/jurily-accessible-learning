import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  FileText, 
  Scale, 
  Video,
  ArrowRight,
  TrendingUp,
  Clock,
  Users
} from "lucide-react";

const CategoriesSection = () => {
  const categories = [
    {
      icon: BookOpen,
      title: "Apostilas",
      description: "Material didático completo para concursos e estudos acadêmicos",
      count: "320+",
      trending: true,
      color: "from-blue-500/20 to-blue-600/20",
      iconColor: "text-blue-400",
      href: "/conteudos/apostilas"
    },
    {
      icon: FileText,
      title: "Artigos",
      description: "Análises jurídicas, doutrinas e pareceres especializados",
      count: "580+",
      trending: false,
      color: "from-green-500/20 to-green-600/20",
      iconColor: "text-green-400",
      href: "/conteudos/artigos"
    },
    {
      icon: Scale,
      title: "Constituições",
      description: "Constituição Federal e constituições estaduais comentadas",
      count: "45+",
      trending: true,
      color: "from-purple-500/20 to-purple-600/20",
      iconColor: "text-purple-400",
      href: "/conteudos/constituicoes"
    },
    {
      icon: Video,
      title: "Vídeos",
      description: "Aulas e palestras com professores especializados",
      count: "180+",
      trending: false,
      color: "from-red-500/20 to-red-600/20",
      iconColor: "text-red-400",
      href: "/conteudos/videos"
    }
  ];

  const stats = [
    { icon: Clock, label: "Atualizado diariamente", value: "Novo conteúdo" },
    { icon: Users, label: "Professores ativos", value: "50+ especialistas" },
    { icon: TrendingUp, label: "Taxa de aprovação", value: "85% dos alunos" }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 border-primary/20 bg-primary/5 text-primary">
            Explore Nosso Conteúdo
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Categorias de 
            <span className="accent-gradient bg-clip-text text-transparent ml-3">
              Estudo
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conteúdo organizado por especialistas para acelerar seu aprendizado jurídico
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category) => (
            <Link key={category.title} to={category.href} className="block">
              <Card className="group card-gradient border-border/60 hover:border-primary/30 transition-smooth hover:shadow-card overflow-hidden cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform pointer-events-none`}>
                      <category.icon className={`h-6 w-6 ${category.iconColor}`} />
                    </div>
                    {category.trending && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 pointer-events-none">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-smooth pointer-events-none">
                    {category.title}
                  </h3>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground reading-content pointer-events-none">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between pointer-events-none">
                    <span className="text-lg font-semibold text-foreground">
                      {category.count}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="group-hover:bg-primary/10 group-hover:text-primary transition-smooth p-2"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-smooth">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;