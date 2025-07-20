import { Button } from "@/components/ui/button";
import { Sparkles, Menu, User, LogOut, Mic } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            <span className="text-xl font-bold text-foreground">RecruiterCall</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Success Stories
            </a>
            {user ? (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate("/interview")}>
                  <Mic className="w-4 h-4 mr-2" />
                  Start Interview
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;