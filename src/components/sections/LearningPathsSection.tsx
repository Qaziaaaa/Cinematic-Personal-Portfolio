import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";

const services = [
  { id: "path-animated-websites", title: "Animated Websites", description: "Master scroll-based animations and cinematic web experiences." },
  { id: "path-ai-builders", title: "AI Website Builders", description: "Build and launch stunning websites in minutes with AI-powered platforms." },
  { id: "path-internal-tools", title: "Internal AI Tools", description: "Automate workflows and create powerful internal applications." },
  { id: "path-ai-apps", title: "AI App Development", description: "Learn to integrate AI into full-stack applications from scratch." }
];

export default function LearningPathsSection() {
  return (
    <section id="services" className="py-20 sm:py-32 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-foreground sm:text-5xl">
            What I Do
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            I offer a range of services, from building visually stunning animated websites to developing complex AI-driven applications.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(path => {
            const pathImage = PlaceHolderImages.find(p => p.id === path.id);
            return (
              <a href="#" key={path.id} className="group block">
                <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
                  {pathImage && (
                    <div className="overflow-hidden">
                      <Image
                        src={pathImage.imageUrl}
                        alt={path.title}
                        width={400}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={pathImage.imageHint}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="font-headline">{path.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{path.description}</CardDescription>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <span className="flex items-center text-sm font-semibold text-primary transition-colors group-hover:text-primary/80">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
