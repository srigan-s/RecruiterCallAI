import { Card, CardContent } from "@/components/ui/card";
import { Brain, Mic, BarChart3 } from "lucide-react";
import featureAi from "@/assets/feature-ai.jpg";
import featureVoice from "@/assets/feature-voice.jpg";
import featureAnalytics from "@/assets/feature-analytics.jpg";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Question Generation",
      description: "Get personalized interview questions tailored to your specific role and industry. Our AI analyzes job descriptions to create relevant, challenging questions.",
      image: featureAi,
    },
    {
      icon: Mic,
      title: "Real-Time Voice & Text Input",
      description: "Practice with natural voice input or traditional typing. Our speech recognition technology captures your responses accurately for realistic interview simulation.",
      image: featureVoice,
    },
    {
      icon: BarChart3,
      title: "Detailed Performance Analytics",
      description: "Receive comprehensive feedback with scoring, strengths analysis, and improvement suggestions. Track your progress over time with detailed analytics.",
      image: featureAnalytics,
    },
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Powerful Features for Interview Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to ace your next interview, powered by cutting-edge AI technology
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card-gradient border-border hover:border-accent/50 transition-all duration-300 group hover:shadow-accent-glow">
              <CardContent className="p-6 space-y-6">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  <feature.icon className="absolute bottom-4 left-4 w-8 h-8 text-accent" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;