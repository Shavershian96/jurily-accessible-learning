import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  FileText, 
  Scale, 
  Video,
  Search,
  Filter,
  Grid,
  List,
  Download,
  Eye,
  Clock,
  Users,
  ArrowLeft
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Conteudos = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const getCurrentCategory = () => {
    const path = location.pathname;
    if (path.includes('/apostilas')) return 'apostilas';
    if (path.includes('/artigos')) return 'artigos';
    if (path.includes('/constituicoes')) return 'constituicoes';
    if (path.includes('/videos')) return 'videos';
    return 'all';
  };

  const currentCategory = getCurrentCategory();

  const contentCategories = [
    {
      icon: BookOpen,
      title: "Apostilas",
      description: "Material didático completo e estruturado",
      count: 320,
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      href: "/conteudos/apostilas"
    },
    {
      icon: FileText,
      title: "Artigos",
      description: "Análises jurídicas e doutrinas especializadas",
      count: 580,
      color: "bg-green-500/10 text-green-400 border-green-500/20",
      href: "/conteudos/artigos"
    },
    {
      icon: Scale,
      title: "Constituições",
      description: "Constituição Federal e estaduais comentadas",
      count: 45,
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      href: "/conteudos/constituicoes"
    },
    {
      icon: Video,
      title: "Vídeos",
      description: "Aulas e palestras com professores especialistas",
      count: 180,
      color: "bg-red-500/10 text-red-400 border-red-500/20",
      href: "/conteudos/videos"
    }
  ];

  const getCategoryName = () => {
    switch (currentCategory) {
      case 'apostilas': return 'Apostilas';
      case 'artigos': return 'Artigos';
      case 'constituicoes': return 'Constituições';
      case 'videos': return 'Vídeos';
      default: return 'Todos os Conteúdos';
    }
  };

  const getFilteredContent = () => {
    const allContent = [
      {
        title: "Nova Lei de Licitações - Análise Completa",
        type: "artigo",
        typeLabel: "Artigo",
        author: "Prof. Ana Silva",
        date: "2024-01-15",
        views: 1250,
        duration: "15 min",
        isPremium: false,
        description: "Estudo detalhado das principais mudanças trazidas pela nova lei de licitações e contratos administrativos."
      },
      {
        title: "Direito Constitucional - Módulo Avançado",
        type: "apostila",
        typeLabel: "Apostila",
        author: "Prof. Carlos Santos",
        date: "2024-01-12",
        views: 890,
        duration: "3h 30min",
        isPremium: true,
        description: "Curso completo sobre os princípios fundamentais do direito constitucional brasileiro."
      },
      {
        title: "Constituição Federal Comentada - 2024",
        type: "constituicao",
        typeLabel: "Constituição",
        author: "Prof. Maria Costa",
        date: "2024-01-10",
        views: 2100,
        duration: "5h 20min",
        isPremium: false,
        description: "Versão completa da Constituição Federal com comentários artigo por artigo."
      },
      {
        title: "Processo Penal - Aula Magna sobre Prisões",
        type: "video",
        typeLabel: "Vídeo",
        author: "Prof. João Oliveira",
        date: "2024-01-08",
        views: 1650,
        duration: "2h 15min",
        isPremium: true,
        description: "Videoaula especial sobre os tipos de prisão no ordenamento jurídico brasileiro."
      },
      {
        title: "Direito Civil - Contratos e Responsabilidade",
        type: "apostila",
        typeLabel: "Apostila",
        author: "Profa. Laura Mendes",
        date: "2024-01-06",
        views: 980,
        duration: "4h 10min",
        isPremium: false,
        description: "Material didático abrangente sobre teoria geral dos contratos e responsabilidade civil."
      },
      {
        title: "Análise Crítica da Jurisprudência do STF",
        type: "artigo",
        typeLabel: "Artigo",
        author: "Dr. Pedro Lima",
        date: "2024-01-03",
        views: 720,
        duration: "2h 30min",
        isPremium: true,
        description: "Análise das principais decisões do Supremo Tribunal Federal em 2024."
      }
    ];

    if (currentCategory === 'all') return allContent;
    return allContent.filter(content => content.type === currentCategory);
  };

  const filteredContent = getFilteredContent().filter(content => 
    content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-background via-card/50 to-muted/30 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {currentCategory !== 'all' && (
              <Link to="/conteudos" className="inline-flex items-center text-muted-foreground hover:text-primary transition-smooth mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para todos os conteúdos
              </Link>
            )}
            
            <Badge className="accent-gradient text-background px-4 py-2">
              <BookOpen className="h-4 w-4 mr-2" />
              Biblioteca Jurídica
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {getCategoryName()}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {currentCategory === 'all' 
                ? "Acesse nossa vasta biblioteca de materiais jurídicos, desde apostilas básicas até análises avançadas"
                : `Explore nossa coleção de ${getCategoryName().toLowerCase()} especialmente selecionados para seu aprendizado`
              }
            </p>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título, autor ou área..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-background/80 border-border/60 focus:border-primary/50 focus-ring"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid - Only show if viewing all content */}
      {currentCategory === 'all' && (
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Explore por Categoria</h2>
              <p className="text-muted-foreground">Escolha o tipo de conteúdo que você deseja estudar</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {contentCategories.map((category) => (
                <Link key={category.title} to={category.href} className="block">
                  <Card className="group card-gradient border-border/60 hover:border-primary/30 transition-smooth hover:shadow-card cursor-pointer">
                    <CardHeader className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-smooth">
                        {category.title}
                      </CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="text-2xl font-bold text-foreground mb-2">
                        {category.count}+
                      </div>
                      <Badge className={category.color}>
                        Disponível
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content Listing */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {currentCategory === 'all' ? 'Conteúdo Recente' : `${getCategoryName()} Disponíveis`}
              </h2>
              <p className="text-muted-foreground">
                {filteredContent.length} {filteredContent.length === 1 ? 'material encontrado' : 'materiais encontrados'}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="focus-ring"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="focus-ring"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content Grid */}
          <div className={`grid gap-6 mb-12 ${
            viewMode === 'grid' 
              ? 'md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredContent.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum conteúdo encontrado</h3>
                <p className="text-muted-foreground">
                  Tente ajustar sua busca ou explore outras categorias.
                </p>
              </div>
            ) : (
              filteredContent.map((content, index) => (
                <Card 
                  key={index}
                  className="group card-gradient border-border/60 hover:border-primary/30 transition-smooth hover:shadow-card"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        {content.typeLabel}
                      </Badge>
                      {content.isPremium && (
                        <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-smooth line-clamp-2">
                      {content.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {content.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{content.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{content.views.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{content.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 hover:bg-accent/50 transition-smooth focus-ring"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {content.isPremium ? 'Visualizar' : 'Ler Agora'}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-primary/10 hover:text-primary transition-smooth focus-ring"
                        aria-label="Fazer download"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Conteudos;