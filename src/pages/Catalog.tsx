import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, BookOpen, FileText, Scale, Video, Crown, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Material {
  id: number;
  title: string;
  slug: string;
  type: string;
  isPremium: boolean;
  authorId: string;
  publishedAt: string;
  tags: string[];
  views: number;
}

const MATERIAL_TYPES = [
  { value: "APOSTILA", label: "Apostilas", icon: BookOpen },
  { value: "ARTIGO", label: "Artigos", icon: FileText },
  { value: "CONSTITUICAO", label: "Constituições", icon: Scale },
  { value: "VIDEO", label: "Vídeos", icon: Video },
];

const Catalog = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState("APOSTILA");
  const [showOnlyFree, setShowOnlyFree] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { toast } = useToast();

  // Debounced search term
  const debouncedSearchTerm = useMemo(() => {
    const timer = setTimeout(() => searchTerm, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchMaterials = async (reset = false) => {
    try {
      setLoading(true);
      const currentPage = reset ? 1 : page;
      const limit = 12;
      const offset = (currentPage - 1) * limit;

      let query = supabase
        .from("materials")
        .select("*")
        .eq("type", activeType)
        .order("publishedAt", { ascending: false })
        .range(offset, offset + limit - 1);

      // Filter by premium status
      if (showOnlyFree) {
        query = query.eq("isPremium", false);
      }

      // Search filter
      if (searchTerm.trim()) {
        query = query.or(`title.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (reset) {
        setMaterials(data || []);
        setPage(2);
      } else {
        setMaterials(prev => [...prev, ...(data || [])]);
        setPage(prev => prev + 1);
      }

      setHasMore((data || []).length === limit);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar materiais",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Reset and fetch when filters change
  useEffect(() => {
    setPage(1);
    fetchMaterials(true);
  }, [activeType, showOnlyFree, debouncedSearchTerm]);

  const getTypeIcon = (type: string) => {
    const typeConfig = MATERIAL_TYPES.find(t => t.value === type);
    return typeConfig?.icon || BookOpen;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container py-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Catálogo de Materiais</h1>
          <p className="text-xl text-muted-foreground">
            Explore nossa biblioteca completa de conteúdo jurídico
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por título ou tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-background/50 border-border/60 focus:border-primary/50 focus-ring"
            />
          </div>

          {/* Free content toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="free-only"
              checked={showOnlyFree}
              onCheckedChange={setShowOnlyFree}
            />
            <Label htmlFor="free-only" className="text-sm font-medium">
              Apenas gratuitos
            </Label>
          </div>
        </div>

        {/* Type Tabs */}
        <Tabs value={activeType} onValueChange={setActiveType} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            {MATERIAL_TYPES.map((type) => (
              <TabsTrigger
                key={type.value}
                value={type.value}
                className="flex items-center gap-2"
              >
                <type.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{type.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {MATERIAL_TYPES.map((type) => (
            <TabsContent key={type.value} value={type.value} className="mt-6">
              {/* Materials Grid */}
              {materials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {materials.map((material) => {
                    const TypeIcon = getTypeIcon(material.type);
                    
                    return (
                      <Link key={material.id} to={`/material/${material.slug}`}>
                        <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-border/60 hover:border-primary/50 cursor-pointer group">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <TypeIcon className="h-4 w-4" />
                                <span className="text-xs uppercase tracking-wide font-medium">
                                  {material.type}
                                </span>
                              </div>
                              {material.isPremium && (
                                <Badge variant="secondary" className="accent-gradient text-background text-xs">
                                  <Crown className="h-3 w-3 mr-1" />
                                  Premium
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                              {material.title}
                            </CardTitle>
                          </CardHeader>
                          
                          <CardContent className="pt-0">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(material.publishedAt)}
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {material.views} visualizações
                              </div>
                            </div>
                            
                            {material.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-3">
                                {material.tags.slice(0, 3).map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {material.tags.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{material.tags.length - 3}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <type.icon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nenhum material encontrado</h3>
                  <p className="text-muted-foreground">
                    {searchTerm 
                      ? "Tente ajustar sua busca ou filtros"
                      : `Ainda não temos ${type.label.toLowerCase()} disponíveis`
                    }
                  </p>
                </div>
              )}

              {/* Load More Button */}
              {hasMore && materials.length > 0 && (
                <div className="text-center mt-8">
                  <Button
                    onClick={() => fetchMaterials()}
                    disabled={loading}
                    variant="outline"
                    className="px-8"
                  >
                    {loading ? "Carregando..." : "Carregar mais"}
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Catalog;