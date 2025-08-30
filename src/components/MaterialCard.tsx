import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { 
  BookOpen, 
  FileText, 
  Scale, 
  Video, 
  Volume2, 
  Eye, 
  Heart, 
  Clock,
  User,
  Lock,
  Crown
} from "lucide-react";

interface MaterialCardProps {
  title: string;
  description: string;
  type: "apostila" | "artigo" | "constituicao" | "video";
  author: string;
  views: number;
  duration?: string;
  isPremium?: boolean;
  hasAudio?: boolean;
  isLiked?: boolean;
  tags?: string[];
}

const MaterialCard = ({ 
  title, 
  description, 
  type, 
  author, 
  views, 
  duration,
  isPremium = false,
  hasAudio = false,
  isLiked = false,
  tags = []
}: MaterialCardProps) => {
  
  const getTypeIcon = () => {
    switch (type) {
      case "apostila": return BookOpen;
      case "artigo": return FileText;
      case "constituicao": return Scale;
      case "video": return Video;
      default: return FileText;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "apostila": return "Apostila";
      case "artigo": return "Artigo";
      case "constituicao": return "Constituição";
      case "video": return "Vídeo";
      default: return "Material";
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "apostila": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "artigo": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "constituicao": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "video": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const TypeIcon = getTypeIcon();

  return (
    <Card className="group card-gradient border-border/60 hover:border-primary/30 transition-smooth hover:shadow-card overflow-hidden">
      <CardHeader className="space-y-3">
        {/* Type and Premium Badge */}
        <div className="flex items-center justify-between">
          <Badge className={`${getTypeColor()} border`}>
            <TypeIcon className="h-3 w-3 mr-1" />
            {getTypeLabel()}
          </Badge>
          {isPremium && (
            <Badge className="bg-secondary/10 text-secondary border-secondary/20">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-smooth line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 reading-content">
          {description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs bg-muted/30 border-border/40 text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs bg-muted/30 border-border/40 text-muted-foreground">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{views.toLocaleString()}</span>
            </div>
            {duration && (
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{duration}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {hasAudio && (
              <Volume2 className="h-3 w-3 text-primary" />
            )}
            <button className="hover:text-primary transition-smooth">
              <Heart className={`h-3 w-3 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex w-full gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 hover:bg-accent/50 transition-smooth focus-ring"
          >
            {isPremium ? (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Visualizar
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Ler Agora
              </>
            )}
          </Button>
          
          {hasAudio && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-primary/10 hover:text-primary transition-smooth focus-ring"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default MaterialCard;