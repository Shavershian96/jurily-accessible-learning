import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Crown, Settings, CreditCard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Account = () => {
  const { user, isPremium } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
            <User className="h-8 w-8 text-primary" />
            Minha Conta
          </h1>
          <p className="text-muted-foreground">
            Gerencie seus dados e assinatura
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-muted-foreground">
                    {user?.email || "Não conectado"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Nome</label>
                  <p className="text-sm text-muted-foreground">
                    {user?.user_metadata?.name || "Nome não informado"}
                  </p>
                </div>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Assinatura
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant={isPremium ? "default" : "secondary"}>
                    {isPremium ? "Premium Ativo" : "Gratuito"}
                  </Badge>
                </div>
                {isPremium ? (
                  <>
                    <div>
                      <label className="text-sm font-medium">Plano</label>
                      <p className="text-sm text-muted-foreground">Premium Mensal</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Próximo pagamento</label>
                      <p className="text-sm text-muted-foreground">15 de Janeiro, 2025</p>
                    </div>
                    <Button variant="outline">Gerenciar Assinatura</Button>
                  </>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Aproveite todos os benefícios do plano Premium
                    </p>
                    <Button className="accent-gradient text-background">
                      <Crown className="h-4 w-4 mr-2" />
                      Assinar Premium
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Materiais acessados</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">3h 45m</p>
                  <p className="text-sm text-muted-foreground">Tempo de estudo</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-sm text-muted-foreground">Dias consecutivos</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acesso Rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Materiais Favoritados
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Histórico de Estudo
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Configurações
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;