import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MaterialCard from "./MaterialCard";
import { Star, ArrowRight } from "lucide-react";

const FeaturedMaterials = () => {
  const featuredMaterials = [
    {
      title: "Direito Constitucional - Fundamentos e Aplicações",
      description: "Curso completo sobre os princípios fundamentais do direito constitucional brasileiro, incluindo análise jurisprudencial e casos práticos.",
      type: "apostila" as const,
      author: "Prof. Ana Silva",
      views: 1250,
      duration: "3h 30min",
      isPremium: false,
      hasAudio: true,
      isLiked: false,
      tags: ["Constitucional", "Básico", "Concursos"]
    },
    {
      title: "Análise da Lei 14.133/2021 - Nova Lei de Licitações",
      description: "Estudo detalhado das principais mudanças trazidas pela nova lei de licitações e contratos administrativos.",
      type: "artigo" as const,
      author: "Dr. Carlos Santos",
      views: 890,
      duration: "1h 45min",
      isPremium: true,
      hasAudio: true,
      isLiked: true,
      tags: ["Administrativo", "Licitações", "Atualização"]
    },
    {
      title: "Constituição Federal de 1988 - Comentada",
      description: "Versão completa da Constituição Federal com comentários artigo por artigo e jurisprudência atualizada do STF.",
      type: "constituicao" as const,
      author: "Prof. Maria Costa",
      views: 2100,
      duration: "5h 20min",
      isPremium: false,
      hasAudio: false,
      isLiked: false,
      tags: ["CF/88", "Comentários", "STF"]
    },
    {
      title: "Processo Penal - Aula Magna sobre Prisões",
      description: "Videoaula especial sobre os tipos de prisão no ordenamento jurídico brasileiro e suas aplicações práticas.",
      type: "video" as const,
      author: "Prof. João Oliveira",
      views: 1650,
      duration: "2h 15min",
      isPremium: true,
      hasAudio: false,
      isLiked: true,
      tags: ["Penal", "Prisões", "Prática"]
    },
    {
      title: "Direito Civil - Contratos e Responsabilidade",
      description: "Material didático abrangente sobre teoria geral dos contratos e responsabilidade civil no direito brasileiro.",
      type: "apostila" as const,
      author: "Profa. Laura Mendes",
      views: 980,
      duration: "4h 10min",
      isPremium: false,
      hasAudio: true,
      isLiked: false,
      tags: ["Civil", "Contratos", "Responsabilidade"]
    },
    {
      title: "Reforma do Judiciário - Impactos e Perspectivas",
      description: "Análise crítica das propostas de reforma do poder judiciário e seus possíveis impactos no sistema de justiça.",
      type: "artigo" as const,
      author: "Dr. Pedro Lima",
      views: 720,
      duration: "2h 30min",
      isPremium: true,
      hasAudio: false,
      isLiked: false,
      tags: ["Judiciário", "Reforma", "Análise"]
    }
  ];

  return (
    <section className="py-20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 border-primary/20 bg-primary/5 text-primary">
            <Star className="h-3 w-3 mr-2" />
            Conteúdo em Destaque
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Materiais Mais 
            <span className="accent-gradient bg-clip-text text-transparent ml-3">
              Acessados
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Descubra o conteúdo favorito dos nossos estudantes e acelere seu aprendizado
          </p>
        </div>

        {/* Materials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredMaterials.map((material, index) => (
            <MaterialCard
              key={index}
              {...material}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            className="px-8 py-6 text-lg border-primary/30 hover:bg-primary/5 hover:border-primary/50 transition-smooth focus-ring"
          >
            Ver Todos os Materiais
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMaterials;