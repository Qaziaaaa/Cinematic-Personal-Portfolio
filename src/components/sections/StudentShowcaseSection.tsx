import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DragonballPattern } from "../DragonballPattern";

const projects = [
  { 
    title: "Project Nebula", 
    description: "A visually rich experience focused on cinematic motion and immersive storytelling.", 
    imageUrl: "https://picsum.photos/seed/showcase1/600/400", 
    studentName: "Client Project", 
    tags: ["animation", "web design"], 
    reason: "A deep dive into celestial animations and storytelling." 
  },
  { 
    title: "AI Recipe Generator", 
    description: "An AI-powered application that helps users decide what to cook using smart suggestions and clean UI.", 
    imageUrl: "https://picsum.photos/seed/showcase2/600/400", 
    studentName: "Personal Project", 
    tags: ["ai", "web app"],
    reason: "An AI-powered app to solve the 'what's for dinner' problem."
  },
  { 
    title: "Internal Sales Dashboard", 
    description: "A data-driven dashboard designed to automate insights and improve internal decision-making.", 
    imageUrl: "https://picsum.photos/seed/showcase3/600/400", 
    studentName: "Client Project", 
    tags: ["automation", "internal tool"],
    reason: "Streamlining business intelligence with an automated tool."
  },
];

export default async function StudentShowcaseSection() {

  return (
    <section id="projects" className="py-20 sm:py-32 relative overflow-hidden">
      <DragonballPattern id="projects-pattern" className="absolute inset-0 h-full w-full opacity-[0.04]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
            <p className="font-headline text-sm uppercase tracking-widest text-primary">Featured Projects</p>
            <h2 className="mt-2 font-headline text-4xl font-bold text-foreground sm:text-5xl">
                A selection of my recent work
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                A showcase of my passion for design, motion, and intelligent systems.
            </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((work, index) => (
            <Card key={index} className="group overflow-hidden rounded-lg border-primary/20 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10 hover:-translate-y-2">
              <CardContent className="relative p-0">
                <Image
                  src={work.imageUrl}
                  alt={work.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  data-ai-hint="student project"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-foreground">
                  <h3 className="font-headline text-2xl font-bold">{work.title}</h3>
                  <p className="text-sm font-medium text-primary">{work.studentName}</p>
                  <p className="mt-2 text-sm text-foreground/80">{work.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {work.tags.map((tag: string) => <Badge key={tag} variant="secondary" className="bg-white/10 text-white/80">{tag}</Badge>)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
