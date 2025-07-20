import { Button } from "@/components/ui/button";
import { TrendingUp, Play } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-hero-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Practice makes perfect
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't leave your interview to chance. Perfect your answers before your interview.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" className="group">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Try Now
            </Button>
            
            <Button variant="outline" size="xl" className="group">
              <TrendingUp className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              View Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;