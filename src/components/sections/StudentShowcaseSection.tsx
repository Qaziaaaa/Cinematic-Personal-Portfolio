import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DragonballPattern } from "../DragonballPattern";

const projects = [
  { title: "Project Nebula", description: "A scroll-animated website about space exploration.", imageUrl: "https://picsum.photos/seed/showcase1/600/400", studentName: "Client Project", tags: ["animation", "web design"], reason: "A deep dive into celestial animations and storytelling." },
  { title: "AI Recipe Generator", description: "A web app that suggests recipes based on available ingredients.", imageUrl: "https://picsum.photos/seed/showcase2/600/400", studentName: "Personal Project", tags: ["ai", "web app"], reason: "An AI-powered app to solve the 'what's for dinner' problem." },
  { title: "Internal Sales Dashboard", description: "An automated dashboard for tracking sales metrics.", imageUrl: "https://picsum.photos/seed/showcase3/600/400", studentName: "Client Project", tags: ["automation", "internal tool"], reason: "Streamlining business intelligence with an automated tool." },
  { title: "Portfolio Site with Parallax", description: "A personal portfolio with smooth parallax effects.", imageUrl: "https://picsum.photos/seed/showcase4/600/400", studentName: "Personal Project", tags: ["animation", "portfolio"], reason: "Exploring advanced parallax and scroll-based animations." },
  { title: "Art Gallery CMS", description: "A CMS for a local art gallery, built without code.", imageUrl: "https://picsum.photos/seed/showcase5/600/400", studentName: "Freelance", tags: ["cms", "no-code"], reason: "Empowering a local business with a custom, easy-to-use CMS." },
];

export default async function StudentShowcaseSection() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section id="projects" className="py-20 sm:py-32 relative overflow-hidden">
      <DragonballPattern id="projects-pattern" className="absolute inset-0 h-full w-full opacity-[0.04]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-foreground sm:text-5xl">
            Featured Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A selection of my recent work, showcasing my passion for design and technology.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((work, index) => (
            <Card key={index} className="group overflow-hidden">
              <CardContent className="relative p-0">
                <Image
                  src={work.imageUrl}
                  alt={work.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint="student project"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-foreground">
                  <h3 className="font-headline text-2xl font-bold">{work.title}</h3>
                  <p className="text-sm">{work.studentName}</p>
                  <p className="mt-2 text-sm text-foreground/80">{work.reason}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {work.tags.map((tag: string) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
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
