import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const testimonials = [
  { id: "testimonial-1", name: "Sarah L.", role: "Designer", quote: "This community transformed my design process. The AI tools are a game-changer for creating dynamic websites.", imageId: "testimonial-1" },
  { id: "testimonial-2", name: "Mike R.", role: "Founder", quote: "I automated my entire onboarding process with an internal tool I built here. Saved me 10 hours a week!", imageId: "testimonial-2" },
  { id: "testimonial-3", name: "Chloe T.", role: "Hobbyist", quote: "I never thought I could build something so cool without coding. The vibecoding path is so much fun!", imageId: "testimonial-3" },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-32 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-foreground sm:text-5xl">
            From Our Community
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Hear what our members have to say about their journey with us.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map(testimonial => {
            const testimonialImage = PlaceHolderImages.find(p => p.id === testimonial.imageId);
            return (
              <Card key={testimonial.id} className="flex flex-col">
                <CardContent className="flex flex-1 flex-col justify-between p-6">
                  <blockquote className="text-lg text-foreground">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="mt-6 flex items-center">
                    {testimonialImage && (
                      <Image
                        src={testimonialImage.imageUrl}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                        data-ai-hint={testimonialImage.imageHint}
                      />
                    )}
                    <div className="ml-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <Badge variant="outline" className="mt-1">{testimonial.role}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
