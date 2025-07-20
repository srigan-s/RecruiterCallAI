import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Users } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-hero-gradient flex items-center pt-20">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge variant="secondary" className="w-fit">
              <Play className="w-3 h-3 mr-2" />
              AI-Powered Interview Practice
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Master Your
                <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text block">
                  Interview
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Practice interviews with AI-powered feedback. Get personalized questions, real-time analysis, and detailed improvement suggestions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Start Practicing Now
              </Button>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5" />
                <span className="font-medium">125,000+ questions answered</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl blur-3xl"></div>
            <img
              src={heroImage}
              alt="AI interview platform interface"
              className="relative rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;