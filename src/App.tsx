import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import Material from "./pages/Material";
import Premium from "./pages/Premium";
import TeacherDashboard from "./pages/TeacherDashboard";
import Admin from "./pages/Admin";
import Account from "./pages/Account";
import Auth from "./pages/Auth";
import Mentoria from "./pages/Mentoria";
import Podcast from "./pages/Podcast";
import Conteudos from "./pages/Conteudos";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Privacidade from "./pages/Privacidade";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/material/:slug" element={<Material />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/account" element={<Account />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/mentoria" element={<Mentoria />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/conteudos" element={<Conteudos />} />
            <Route path="/conteudos/apostilas" element={<Conteudos />} />
            <Route path="/conteudos/artigos" element={<Conteudos />} />
            <Route path="/conteudos/constituicoes" element={<Conteudos />} />
            <Route path="/conteudos/videos" element={<Conteudos />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/privacidade" element={<Privacidade />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
