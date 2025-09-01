import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center space-y-8 max-w-lg mx-auto px-4">
          <div className="space-y-4">
            <h1 className="text-8xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-3xl font-bold">Página não encontrada</h2>
            <p className="text-muted-foreground reading-content">
              A página que você está procurando não existe ou foi movida para outro endereço.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="accent-gradient text-background font-semibold focus-ring">
                <Home className="h-5 w-5 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
            <Link to="/conteudos">
              <Button variant="outline" size="lg" className="focus-ring">
                <Search className="h-5 w-5 mr-2" />
                Explorar Conteúdos
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
