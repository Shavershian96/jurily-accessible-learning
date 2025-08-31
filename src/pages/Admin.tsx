import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Users, Menu, FileText } from "lucide-react";

const Admin = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
            <Settings className="h-8 w-8 text-primary" />
            Painel Administrativo
          </h1>
          <p className="text-muted-foreground">
            Gerencie usuários, menus e configurações do sistema
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Usuários
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">127</p>
              <p className="text-sm text-muted-foreground">Total de usuários</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Materiais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">45</p>
              <p className="text-sm text-muted-foreground">Materiais ativos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Menu className="h-5 w-5" />
                Menus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">6</p>
              <p className="text-sm text-muted-foreground">Itens de menu</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Premium</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">23</p>
              <p className="text-sm text-muted-foreground">Assinantes ativos</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Gerenciar Usuários
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Visualize e altere as permissões dos usuários
              </p>
              <Button className="w-full">
                Acessar Gerenciamento
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Menu className="h-5 w-5" />
                Gerenciar Menus
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Configure os itens de menu do site
              </p>
              <Button className="w-full" variant="outline">
                Configurar Menus
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Logs do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Funcionalidade em desenvolvimento...
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;