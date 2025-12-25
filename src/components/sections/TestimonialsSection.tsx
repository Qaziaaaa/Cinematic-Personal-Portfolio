import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const testimonials = [
  { id: "testimonial-1", name: "Sarah L.", role: "Designer", quote: "Qazi transformed my idea into a powerful, polished product. The attention to detail and performance was unreal.", imageId: "testimonial-1" },
  { id: "testimonial-2", name: "Mike R.", role: "Founder", quote: "The automation system saved us hours every week. Clean, fast, and extremely well built.", imageId: "testimonial-2" },
  { id: "testimonial-3", name: "Chloe T.", role: "Marketing Head", quote: "I didn’t expect something this smooth without a big dev team. The experience feels premium.", imageId: "testimonial-3" },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-32 bg-background relative overflow-hidden">
        <div
            className="absolute inset-0 z-0 opacity-10"
            style={{
                backgroundImage: 'radial-gradient(circle at center, hsl(var(--primary) / 0.03) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
            }}
        />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-foreground sm:text-5xl">
            What Clients Say
          </h2>
           <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Real experiences from people I’ve helped build powerful digital products.
          </p>
          <div className="mt-4 h-[2px] w-24 bg-primary/50 mx-auto rounded-full shadow-[0_0_15px_theme(colors.primary/0.5)]" />
        </div>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial, index) => {
            const testimonialImage = PlaceHolderImages.find(p => p.id === testimonial.imageId);
            return (
              <div
                key={testimonial.id}
                className={cn(
                  "group relative aspect-square w-full max-w-sm mx-auto rounded-full p-8 flex flex-col items-center justify-center text-center transition-all duration-500",
                  "bg-card/50 border border-primary/20",
                  "hover:scale-105 hover:shadow-[0_0_40px_theme(colors.primary/0.3)]"
                )}
                style={{ animation: `float 6s ease-in-out ${index * 1.5}s infinite` }}
              >
                {/* Inner Glow */}
                <div className="absolute inset-4 rounded-full bg-primary/5 opacity-50 blur-lg transition-all duration-500 group-hover:opacity-70" />
                
                {/* Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 transition-all duration-500 group-hover:border-primary/50" />
                <div className="absolute inset-1 rounded-full border border-primary/20 transition-all duration-500 group-hover:border-primary/30" />
                
                <div className="relative z-10 flex flex-col items-center">
                  {testimonialImage && (
                    <div className="relative mb-4">
                      <Image
                        src={testimonialImage.imageUrl}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/50 transition-all duration-500 group-hover:ring-primary"
                        data-ai-hint={testimonialImage.imageHint}
                      />
                       <div className="absolute inset-0 rounded-full shadow-[0_0_15px_2px_theme(colors.primary/0.4)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                  )}
                  
                  <blockquote className="text-base font-medium text-foreground transition-colors duration-500 group-hover:text-white">
                    “{testimonial.quote}”
                  </blockquote>
                  
                  <div className="mt-6">
                    <p className="font-headline text-lg font-bold text-white">
                      — {testimonial.name}
                    </p>
                    <Badge variant="outline" className="mt-2 border-primary/50 bg-primary/10 text-primary/90 transition-all duration-500 group-hover:bg-primary/20 group-hover:text-primary">
                      {testimonial.role}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
