import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Crown, 
  FileText, 
  Volume2, 
  Download,
  Calendar,
  User,
  Eye,
  Tag
} from "lucide-react";

interface Material {
  id: number;
  title: string;
  slug: string;
  type: string;
  content: string;
  pdfUrl: string;
  audioUrl: string;
  isPremium: boolean;
  authorId: string;
  publishedAt: string;
  tags: string[];
  views: number;
}

const Material = () => {
  const { slug } = useParams<{ slug: string }>();
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const { user, isPremium } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchMaterial();
    }
  }, [slug]);

  const fetchMaterial = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("materials")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        toast({
          title: "Material não encontrado",
          description: "O material solicitado não existe ou foi removido.",
          variant: "destructive",
        });
        return;
      }

      setMaterial(data);
      
      // Check access: free content or premium user or author
      const canAccess = !data.isPremium || isPremium || (user && data.authorId === user.id);
      setHasAccess(canAccess);

      // Increment view count
      if (canAccess) {
        await supabase
          .from("materials")
          .update({ views: data.views + 1 })
          .eq("id", data.id);
      }

    } catch (error: any) {
      toast({
        title: "Erro ao carregar material",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { plan: "monthly" }
      });

      if (error) throw error;

      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      toast({
        title: "Erro ao criar checkout",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando material...</p>
        </div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Material não encontrado</h2>
          <p className="text-muted-foreground mb-6">
            O material solicitado não existe ou foi removido.
          </p>
          <Link to="/catalog">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Catálogo
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/catalog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="uppercase tracking-wide font-medium">{material.type}</span>
              {material.isPremium && (
                <Badge variant="secondary" className="accent-gradient text-background">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight mb-4">{material.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(material.publishedAt)}
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {material.views} visualizações
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {!hasAccess ? (
          // Premium Paywall
          <Card className="max-w-2xl mx-auto border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full accent-gradient flex items-center justify-center mb-4">
                <Crown className="h-8 w-8 text-background" />
              </div>
              <CardTitle className="text-2xl">Conteúdo Premium</CardTitle>
              <CardDescription>
                Este material está disponível apenas para assinantes premium.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="text-center">
              {/* Teaser - show first 200 characters */}
              {material.content && (
                <div className="mb-6 p-4 bg-background/50 rounded-lg border border-border/40">
                  <p className="text-muted-foreground">
                    {material.content.substring(0, 200)}...
                  </p>
                </div>
              )}
              
              <div className="space-y-4">
                <h3 className="font-semibold">Com o plano Premium você terá acesso a:</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Todo o conteúdo exclusivo</li>
                  <li>• Áudios gerados por IA</li>
                  <li>• Download de PDFs</li>
                  <li>• Suporte prioritário</li>
                </ul>
                
                <Button 
                  onClick={handleSubscribe}
                  className="accent-gradient text-background font-semibold w-full"
                  size="lg"
                >
                  <Crown className="h-5 w-5 mr-2" />
                  Assinar Premium
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Full Content
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {material.audioUrl && (
                <Button variant="outline" className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  Ouvir Áudio
                </Button>
              )}
              {material.pdfUrl && (
                <Button variant="outline" asChild>
                  <a href={material.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar PDF
                  </a>
                </Button>
              )}
            </div>

            {/* Audio Player */}
            {material.audioUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Volume2 className="h-5 w-5" />
                    Áudio do Material
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <audio controls className="w-full">
                    <source src={material.audioUrl} type="audio/mpeg" />
                    Seu navegador não suporta o elemento de áudio.
                  </audio>
                </CardContent>
              </Card>
            )}

            {/* PDF Viewer */}
            {material.pdfUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5" />
                    Documento PDF
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[4/5] bg-muted rounded-lg overflow-hidden">
                    <iframe
                      src={material.pdfUrl}
                      className="w-full h-full border-0"
                      title="PDF Viewer"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Text Content */}
            {material.content && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Conteúdo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {material.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {material.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Tag className="h-5 w-5" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {material.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Material;