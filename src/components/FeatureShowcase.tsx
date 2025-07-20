import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Mic, TrendingUp, Users } from "lucide-react";
import featureAi from "@/assets/feature-ai.jpg";
import featureVoice from "@/assets/feature-voice.jpg";
import featureAnalytics from "@/assets/feature-analytics.jpg";

const FeatureShowcase = () => {
  const showcases = [
    {
      icon: Brain,
      title: "Generate tailored questions",
      description: "Generate powerful and accurate questions for any type of interview using our trained Chat GPT model. Simply enter the job description or describe the role you want to practice for.",
      image: featureAi,
      badge: "AI-Powered",
    },
    {
      icon: Mic,
      title: "Interview with voice",
      description: "We simulate a real interview environment by allowing you to input with your voice or text. Our questions can even be read out loud.",
      image: featureVoice,
      badge: "Voice Recognition",
    },
    {
      icon: TrendingUp,
      title: "Review feedback instantly",
      description: "Understand how to improve your answers and see how you compared to the ideal candidate with scores and a revised answer. It's as simple as that.",
      image: featureAnalytics,
      badge: "Analytics",
    },
  ];

  return (
    <section className="py-20 bg-feature-gradient">
      <div className="container mx-auto px-6">
        <div className="space-y-20">
          {showcases.map((showcase, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <Badge variant="secondary" className="w-fit">
                  <showcase.icon className="w-3 h-3 mr-2" />
                  {showcase.badge}
                </Badge>
                
                <h2 className="text-4xl font-bold text-foreground">
                  {showcase.title}
                </h2>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {showcase.description}
                </p>
                
                <div className="flex items-center gap-6">
                  <Button variant="cta" size="lg">
                    Try Now
                  </Button>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">125,000 questions answered by users with the power of AI.</span>
                  </div>
                </div>
              </div>

              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <Card className="bg-card border-border overflow-hidden hover:shadow-accent-glow transition-all duration-300">
                  <CardContent className="p-0">
                    <img
                      src={showcase.image}
                      alt={showcase.title}
                      className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;