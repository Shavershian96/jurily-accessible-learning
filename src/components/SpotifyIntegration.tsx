import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Play, Headphones, TrendingUp } from "lucide-react";

const SpotifyIntegration = () => {
  const handleSpotifyConnect = () => {
    // TODO: Implementar autenticação Spotify
    console.log("Conectar ao Spotify");
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background to-accent/5">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2 border-primary/20 bg-primary/5 text-primary">
            <Music className="h-3 w-3 mr-2" />
            Nova Funcionalidade
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Integração com 
            <span className="accent-gradient bg-clip-text text-transparent"> Spotify</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sincronize seus estudos jurídicos com suas playlists favoritas. 
            Transforme o aprendizado em uma experiência ainda mais envolvente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Card Principal */}
          <Card className="relative overflow-hidden border-border/60 bg-card/50 backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/10 blur-2xl"></div>
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Music className="h-6 w-6 text-primary" />
                </div>
                Conecte seu Spotify
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <p className="text-muted-foreground">
                Acesse suas playlists e crie trilhas sonoras personalizadas para cada matéria jurídica.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Playlists por área do direito</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Música de foco para estudos</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Sincronização automática</span>
                </div>
              </div>

              <Button 
                onClick={handleSpotifyConnect}
                className="w-full accent-gradient text-background font-semibold hover:opacity-90 transition-smooth mt-6"
              >
                <Play className="h-4 w-4 mr-2" />
                Conectar ao Spotify
              </Button>
            </CardContent>
          </Card>

          {/* Cards de Recursos */}
          <div className="space-y-6">
            <Card className="border-border/40 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-smooth hover-scale">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                    <Headphones className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Playlists Curadas</h3>
                    <p className="text-sm text-muted-foreground">
                      Playlists especialmente criadas para cada área do direito, 
                      otimizadas para concentração e retenção.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-smooth hover-scale">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Análise de Produtividade</h3>
                    <p className="text-sm text-muted-foreground">
                      Acompanhe como diferentes estilos musicais afetam 
                      seu desempenho nos estudos.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-smooth hover-scale">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                    <Music className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Modo Foco</h3>
                    <p className="text-sm text-muted-foreground">
                      Ative o modo foco e deixe a IA escolher as melhores 
                      músicas para cada tipo de estudo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotifyIntegration;