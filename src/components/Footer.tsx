import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { 
  Scale, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  BookOpen,
  FileText,
  Users,
  Shield,
  Send
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { icon: BookOpen, label: "Apostilas", href: "/conteudos/apostilas" },
    { icon: FileText, label: "Artigos", href: "/conteudos/artigos" },
    { icon: Scale, label: "Constituições", href: "/conteudos/constituicoes" },
    { icon: Users, label: "Mentoria", href: "/mentoria" },
    { icon: FileText, label: "Podcast", href: "/podcast" }
  ];

  const legalLinks = [
    { label: "Política de Privacidade", href: "/privacidade" },
    { label: "Sobre Nós", href: "/sobre" },
    { label: "Contato", href: "/contato" },
    { label: "Premium", href: "/premium" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  return (
    <footer className="bg-card/50 border-t border-border/40">
      <div className="container py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg accent-gradient">
                <Scale className="h-6 w-6 text-background" />
              </div>
              <div>
                <h3 className="text-xl font-bold">LuthyAcademi</h3>
                <p className="text-sm text-muted-foreground">Educação Jurídica Acessível</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground reading-content max-w-sm">
              Democratizando o acesso ao conhecimento jurídico através de conteúdo de qualidade, 
              professores especializados e tecnologia inovadora.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="sm"
                  className="w-9 h-9 p-0 hover:bg-primary/10 hover:text-primary transition-smooth"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground">Conteúdo</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href}>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 text-muted-foreground hover:text-primary transition-smooth justify-start"
                    >
                      <link.icon className="h-4 w-4 mr-2" />
                      {link.label}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href}>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 text-muted-foreground hover:text-primary transition-smooth justify-start"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      {link.label}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Receba as últimas atualizações jurídicas e novos materiais diretamente no seu email.
            </p>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  placeholder="Seu melhor email"
                  className="bg-background/50 border-border/60 focus:border-primary/50 focus-ring"
                />
                <Button size="sm" className="accent-gradient text-background focus-ring">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Ao se inscrever, você concorda com nossa Política de Privacidade.
              </p>
            </div>
          </div>
        </div>

        <Separator className="mb-8 bg-border/60" />

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <a href="mailto:contato@luthi.online" className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-smooth">
            <Mail className="h-4 w-4 text-primary" />
            <span>contato@luthi.online</span>
          </a>
          <a href="https://wa.me/5511999990000" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-smooth">
            <Phone className="h-4 w-4 text-primary" />
            <span>+55 (11) 99999-0000</span>
          </a>
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>São Paulo, Brasil</span>
          </div>
        </div>

        <Separator className="mb-6 bg-border/60" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-muted-foreground">
          <p>
            © 2024 LuthyAcademi. Todos os direitos reservados.
          </p>
          <p>
            Desenvolvido com ❤️ para democratizar a educação jurídica.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;