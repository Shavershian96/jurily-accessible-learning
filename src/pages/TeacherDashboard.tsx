import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Plus, FileText, Volume2 } from "lucide-react";

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            Painel do Professor
          </h1>
          <p className="text-muted-foreground">
            Gerencie seus materiais e conteúdos educacionais
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Meus Materiais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Materiais publicados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                Áudios Gerados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-muted-foreground">Áudios disponíveis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Professor Ativo</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 mb-8">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Material
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            Gerar Áudio
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Materiais Recentes</CardTitle>
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

export default TeacherDashboard;