import { curateStudentShowcase } from "@/ai/flows/ai-curated-student-showcase";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockStudentWorks = [
  { title: "Project Nebula", description: "A scroll-animated website about space exploration.", imageUrl: "https://picsum.photos/seed/showcase1/600/400", studentName: "Jane Doe", tags: ["animation", "web design"] },
  { title: "AI Recipe Generator", description: "A web app that suggests recipes based on available ingredients.", imageUrl: "https://picsum.photos/seed/showcase2/600/400", studentName: "John Smith", tags: ["ai", "web app"] },
  { title: "Internal Sales Dashboard", description: "An automated dashboard for tracking sales metrics.", imageUrl: "https://picsum.photos/seed/showcase3/600/400", studentName: "Emily White", tags: ["automation", "internal tool"] },
  { title: "Portfolio Site with Parallax", description: "A personal portfolio with smooth parallax effects.", imageUrl: "https://picsum.photos/seed/showcase4/600/400", studentName: "Alex Green", tags: ["animation", "portfolio"] },
  { title: "Art Gallery CMS", description: "A CMS for a local art gallery, built without code.", imageUrl: "https://picsum.photos/seed/showcase5/600/400", studentName: "Sarah Brown", tags: ["cms", "no-code"] },
];

export default async function StudentShowcaseSection() {
  let highlightedWorks: any[] = [];
  try {
    const curationResult = await curateStudentShowcase({
      studentWorks: mockStudentWorks,
      criteria: "Highlight projects that show a unique combination of design and AI, especially those with impressive visual animations or practical AI applications.",
    });
    highlightedWorks = curationResult.highlightedWorks;
  } catch (error) {
    console.error("AI curation failed, using mock data as fallback:", error);
    highlightedWorks = mockStudentWorks.slice(0, 3).map(work => ({...work, reason: "An outstanding example of creative application."}));
  }

  return (
    <section id="showcase" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-foreground sm:text-5xl">
            Student Showcase
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Discover what our members are creating. Curated by AI to highlight the most inspiring projects.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {highlightedWorks.map((work, index) => (
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
                  <p className="text-sm">by {work.studentName}</p>
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
