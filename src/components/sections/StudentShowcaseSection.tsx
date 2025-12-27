import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Eye } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const projects = [
  { 
    title: "Project Nebula", 
    type: "Client Project",
    description: "A cinematic web experience crafted to tell a story through motion, depth, and interaction.", 
    imageId: "project-nebula",
    tags: ["animation", "web design"], 
  },
  { 
    title: "AI Recipe Generator", 
    type: "Personal Project",
    description: "An intelligent assistant that simplifies daily decisions using smart AI-driven logic and clean UI.", 
    imageId: "project-ai-recipe",
    tags: ["ai", "web app"],
  },
  { 
    title: "Internal Sales Dashboard", 
    type: "Client Project",
    description: "A data-driven internal tool built to automate insights and improve operational clarity.", 
    imageId: "project-sales-dashboard",
    tags: ["automation", "internal tool"],
  },
];

export default async function StudentShowcaseSection() {

  return (
    <section id="projects" className="py-20 sm:py-32 relative overflow-hidden bg-background">
      <div
          className="absolute inset-0 z-0 opacity-5"
          style={{
              backgroundImage: 'radial-gradient(circle, hsl(var(--primary) / 0.05) 1px, transparent 1px), radial-gradient(circle, hsl(var(--primary) / 0.05) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              backgroundPosition: '0 0, 15px 15px',
          }}
      />
       <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-background via-background/80 to-transparent z-0"></div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
            <p className="font-headline text-sm uppercase tracking-widest text-primary">Featured Projects</p>
            <h2 className="mt-2 font-headline text-4xl font-bold text-foreground sm:text-5xl">
                A selection of my recent work
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                A showcase of my passion for design, motion, and intelligent systems.
            </p>
        </div>
        <div className="mt-20 flex flex-col gap-16">
          {projects.map((work, index) => {
            const projectImage = PlaceHolderImages.find(p => p.id === work.imageId);
            return (
              <a href="#" key={index} className="group block rounded-2xl transition-all duration-300 ease-in-out hover:!opacity-100">
                <div className={cn(
                  "relative w-full overflow-hidden rounded-2xl border border-primary/20 bg-secondary transition-all duration-500",
                  "shadow-[0_0_20px_theme(colors.black)]",
                  "group-hover:border-primary/40 group-hover:shadow-[0_0_40px_theme(colors.primary/0.2)] hover:bg-card"
                )}>
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Content */}
                    <div className="flex flex-col justify-center p-8 md:p-12 order-2 md:order-1">
                      <div>
                        <div className="flex items-center gap-4">
                            <h3 className="font-headline text-3xl font-bold text-foreground transition-colors duration-300 group-hover:text-white">{work.title}</h3>
                        </div>
                        <p className="font-headline text-sm font-medium text-primary mt-1">{work.type}</p>
                        <p className="mt-4 text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">{work.description}</p>
                      </div>
                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        {work.tags.map((tag: string) => 
                          <Badge key={tag} variant="outline" className="border-primary/20 bg-primary/10 text-primary/80 transition-colors duration-300 group-hover:border-primary/50 group-hover:bg-primary/20 group-hover:text-primary">
                            {tag}
                          </Badge>
                        )}
                        <Badge variant="outline" className="h-8 w-8 p-0 items-center justify-center border-primary/20 bg-primary/10 text-primary/80 transition-colors duration-300 group-hover:border-primary/50 group-hover:bg-primary/20 group-hover:text-primary cursor-pointer">
                            <Eye className="h-4 w-4" />
                        </Badge>
                      </div>
                    </div>

                    {/* Image */}
                    {projectImage && (
                      <div className="relative h-64 md:h-full min-h-[300px] order-1 md:order-2">
                        <Image
                          src={projectImage.imageUrl}
                          alt={work.title}
                          fill
                          className="object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                          data-ai-hint={projectImage.imageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent md:bg-gradient-to-r md:from-secondary md:via-secondary/50 md:to-transparent transition-all duration-500 ease-in-out group-hover:scale-110" />
                      </div>
                    )}
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  );
}
