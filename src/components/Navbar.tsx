import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  BookOpen, 
  Search, 
  Menu, 
  X, 
  User, 
  GraduationCap,
  Scale,
  FileText,
  Crown,
  LogOut,
  Settings
} from "lucide-react";

interface MenuItem {
  id: number;
  label: string;
  href: string;
  orderIndex: number;
  visible: boolean;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [dynamicMenus, setDynamicMenus] = useState<MenuItem[]>([]);
  const { user, signOut, isAdmin, isTeacher } = useAuth();

  const staticMenuItems = [
    { icon: BookOpen, label: "Catálogo", href: "/catalog" },
    { icon: Crown, label: "Premium", href: "/premium" },
  ];

  const protectedMenuItems = [
    { icon: GraduationCap, label: "Professor", href: "/teacher/dashboard", roles: ["TEACHER", "ADMIN", "SUPERADMIN"] },
    { icon: Settings, label: "Admin", href: "/admin", roles: ["ADMIN", "SUPERADMIN"] },
  ];

  const fetchDynamicMenus = async () => {
    try {
      const { data } = await supabase.functions.invoke("get-menus");
      if (data) {
        setDynamicMenus(data);
      }
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  };

  useEffect(() => {
    fetchDynamicMenus();
  }, [user]);

  // Combine all menu items
  const allMenuItems = [
    ...staticMenuItems,
    ...dynamicMenus.map(menu => ({ icon: FileText, label: menu.label, href: menu.href })),
    ...protectedMenuItems.filter(item => 
      isTeacher && item.roles.includes("TEACHER") ||
      isAdmin && (item.roles.includes("ADMIN") || item.roles.includes("SUPERADMIN"))
    )
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg accent-gradient">
            <Scale className="h-6 w-6 text-background" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">Luthi Academy</span>
            <span className="text-xs text-muted-foreground">Educação Jurídica Acessível</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {allMenuItems.map((item) => (
            <Link key={item.label} to={item.href}>
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary hover:bg-accent/50 transition-smooth"
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Olá, {user.user_metadata?.name || user.email?.split('@')[0]}
                </span>
                <Button variant="outline" size="sm" onClick={signOut} className="focus-ring">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="focus-ring">
                    <User className="h-4 w-4 mr-2" />
                    Entrar
                  </Button>
                </Link>
                <Link to="/premium">
                  <Button variant="default" size="sm" className="accent-gradient text-background font-medium focus-ring">
                    <Crown className="h-4 w-4 mr-2" />
                    Premium
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Search Bar - Expandable */}
      {isSearchOpen && (
        <div className="border-t border-border/40 bg-card/50 backdrop-blur-sm p-4">
          <div className="container">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar materiais, artigos, constituições..."
                className="pl-9 bg-background/50 border-border/60 focus:border-primary/50 focus-ring"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-card/95 backdrop-blur-sm">
          <div className="container py-4 space-y-3">
            {allMenuItems.map((item) => (
              <Link key={item.label} to={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground hover:bg-accent/50 transition-smooth"
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="pt-4 border-t border-border/40 space-y-2">
              {user ? (
                <>
                  <div className="text-sm text-muted-foreground mb-2">
                    Olá, {user.user_metadata?.name || user.email?.split('@')[0]}
                  </div>
                  <Button variant="outline" onClick={signOut} className="w-full focus-ring">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="outline" className="w-full focus-ring">
                      <User className="h-4 w-4 mr-2" />
                      Entrar
                    </Button>
                  </Link>
                  <Link to="/premium">
                    <Button variant="default" className="w-full accent-gradient text-background font-medium focus-ring">
                      <Crown className="h-4 w-4 mr-2" />
                      Tornar-se Premium
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;