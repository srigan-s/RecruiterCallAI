import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ganan Sivagnanenthirarajah",
      role: "Technical Product Manager at Majestyk",
      content: "RecruiterCall transformed my interview preparation. The AI feedback helped me identify gaps in my responses and improved my confidence significantly. I landed my dream PM role!",
      image: testimonial1,
    },
    {
      name: "Gokul Unnikrishnan",
      role: "Software Engineer at Cloudflare",
      content: "The STAR method coaching and real-time feedback were game-changers. I went from nervous interviews to confident conversations. Highly recommend for any tech professional!",
      image: testimonial2,
    },
    {
      name: "Ugan Sivagnanenthirarajah",
      role: "Product Manager at Microsoft",
      content: "The personalized questions based on job descriptions made all the difference. I practiced scenarios specific to my target role and aced my Microsoft interview!",
      image: testimonial3,
    },
    {
      name: "Srigan Sivagnanenthirarajah",
      role: "CEO at MiniAI",
      content: "As someone who interviews candidates regularly, I can say RecruiterCall's feedback quality is exceptional. It's like having a personal interview coach available 24/7.",
      image: testimonial4,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Success Stories
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card-gradient border-border hover:border-accent/50 transition-all duration-300 hover:shadow-accent-glow">
              <CardContent className="p-8 space-y-6">
                <Quote className="w-8 h-8 text-accent" />
                
                <blockquote className="text-lg text-muted-foreground leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-accent/20"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;