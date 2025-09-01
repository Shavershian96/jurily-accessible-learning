import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Search, 
  Filter,
  Clock, 
  Calendar,
  FileText,
  Video,
  Download,
  Eye,
  ArrowRight,
  Tag,
  User
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Conteudos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("todos");

  const categories = [
    { id: "todos", label: "Todos", count: 24 },
    { id: "artigos", label: "Artigos", count: 12 },
    { id: "resumos", label: "Resumos", count: 8 },
    { id: "dicas", label: "Dicas", count: 4 }
  ];

  const contents = [
    {
      id: 1,
      title: "Direitos Fundamentais na Constituição de 1988",
      description: "Análise completa dos direitos e garantias fundamentais previstos no Título II da Constituição Federal.",
      category: "artigos",
      type: "article",
      readTime: "15 min",
      publishDate: "2024-01-15",
      author: "Prof. Ana Silva",
      views: 1250,
      tags: ["Direitos Fundamentais", "Constituição", "CF/88"],
      featured: true
    },
    {
      id: 2,
      title: "Como Memorizar Leis: Técnicas Eficazes",
      description: "Estratégias comprovadas para memorização de textos legais e artigos constitucionais.",
      category: "dicas",
      type: "tip",
      readTime: "8 min",
      publishDate: "2024-01-12",
      author: "Prof. Carlos Santos",
      views: 890,
      tags: ["Memorização", "Técnicas de Estudo", "Concursos"],
      featured: false
    },
    {
      id: 3,
      title: "Resumo: Processo Legislativo",
      description: "Síntese do processo de criação das leis no ordenamento jurídico brasileiro.",
      category: "resumos",
      type: "summary",
      readTime: "12 min",
      publishDate: "2024-01-10",
      author: "Prof. Maria Oliveira",
      views: 675,
      tags: ["Processo Legislativo", "Direito Constitucional"],
      featured: false
    },
    {
      id: 4,
      title: "Princípios da Administração Pública",
      description: "Estudo detalhado dos princípios expressos e implícitos que regem a Administração Pública.",
      category: "artigos",
      type: "article",
      readTime: "20 min",
      publishDate: "2024-01-08",
      author: "Prof. João Costa",
      views: 1120,
      tags: ["Administração Pública", "Princípios", "Direito Administrativo"],
      featured: true
    },
    {
      id: 5,
      title: "Organização dos Poderes: Resumo Prático",
      description: "Esquema visual da organização dos Poderes Executivo, Legislativo e Judiciário.",
      category: "resumos",
      type: "summary",
      readTime: "10 min",
      publishDate: "2024-01-05",
      author: "Prof. Ana Silva",
      views: 980,
      tags: ["Separação de Poderes", "Organização do Estado"],
      featured: false
    },
    {
      id: 6,
      title: "Controle de Constitucionalidade Simplificado",
      description: "Guia prático sobre controle concentrado e difuso de constitucionalidade no Brasil.",
      category: "dicas",
      type: "tip",
      readTime: "18 min",
      publishDate: "2024-01-03",
      author: "Prof. Roberto Lima",
      views: 1340,
      tags: ["Controle de Constitucionalidade", "STF", "Direito Constitucional"],
      featured: true
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return FileText;
      case 'summary': return BookOpen;
      case 'tip': return Video;
      default: return FileText;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'article': return 'Artigo';
      case 'summary': return 'Resumo';
      case 'tip': return 'Dica';
      default: return 'Conteúdo';
    }
  };

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = activeFilter === "todos" || content.category === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const featuredContents = contents.filter(content => content.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-background via-card/50 to-muted/30 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="accent-gradient text-background px-4 py-2">
              <BookOpen className="h-4 w-4 mr-2" />
              Centro de Conhecimento
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Conteúdos
              </span>
              <br />
              Educacionais
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto reading-content">
              Artigos, resumos, dicas e materiais exclusivos para acelerar seus estudos 
              jurídicos e preparação para concursos.
            </p>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título, tema ou palavra-chave..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50 border-border/60 focus:border-primary/50 focus-ring"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      {featuredContents.length > 0 && (
        <section className="py-20">
          <div className="container">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Conteúdos em Destaque</h2>
              <p className="text-muted-foreground">
                Os materiais mais importantes e acessados da semana
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredContents.map((content) => {
                const TypeIcon = getTypeIcon(content.type);
                return (
                  <Card key={content.id} className="border-border/50 hover:shadow-glow transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          <TypeIcon className="h-3 w-3 mr-1" />
                          {getTypeLabel(content.type)}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Eye className="h-4 w-4 mr-1" />
                          {content.views}
                        </div>
                      </div>
                      
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        {content.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {content.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(content.publishDate).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {content.readTime}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          {content.author}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {content.tags.slice(0, 2).map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors focus-ring">
                          Ler Conteúdo
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="py-8 bg-card/30">
        <div className="container">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "default" : "outline"}
                onClick={() => setActiveFilter(category.id)}
                className={`focus-ring ${activeFilter === category.id ? 'accent-gradient text-background' : ''}`}
              >
                <Filter className="h-4 w-4 mr-2" />
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* All Content */}
      <section className="py-20">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Todos os Conteúdos</h2>
            <p className="text-muted-foreground">
              {filteredContents.length} {filteredContents.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            </p>
          </div>

          {filteredContents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredContents.map((content) => {
                const TypeIcon = getTypeIcon(content.type);
                return (
                  <Card key={content.id} className="border-border/50 hover:shadow-glow transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                          <TypeIcon className="h-3 w-3 mr-1" />
                          {getTypeLabel(content.type)}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Eye className="h-4 w-4 mr-1" />
                          {content.views}
                        </div>
                      </div>
                      
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        {content.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {content.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(content.publishDate).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {content.readTime}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          {content.author}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {content.tags.slice(0, 2).map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors focus-ring">
                          Ler Conteúdo
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum conteúdo encontrado</h3>
              <p className="text-muted-foreground mb-6">
                Tente ajustar os filtros ou usar outros termos de busca.
              </p>
              <Button variant="outline" onClick={() => { setSearchTerm(""); setActiveFilter("todos"); }}>
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Conteudos;