import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { FireballIcon } from "../FireballIcon";
import { Button } from "../ui/button";

const skills = [
  "AI-Powered Website Development",
  "Cinematic Web Animations & UI Effects",
  "Automation & Internal Tools with AI",
  "Full-Stack AI-Assisted Applications",
];

export default function AboutSection() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-portrait');

  return (
    <section id="about" className="relative bg-background py-24 sm:py-32 overflow-hidden">
        <div
            className="absolute inset-0 z-0 opacity-5"
            style={{
                backgroundImage: 'radial-gradient(circle, hsl(var(--primary) / 0.05) 1px, transparent 1px), radial-gradient(circle, hsl(var(--primary) / 0.05) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
                backgroundPosition: '0 0, 15px 15px',
            }}
        />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative h-[600px] lg:h-full">
            {aboutImage && (
              <>
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-contain object-center"
                  data-ai-hint={aboutImage.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-primary/10 to-transparent lg:bg-gradient-to-t lg:from-background lg:via-primary/5 lg:to-transparent"></div>
                 <div className="absolute bottom-1/2 right-10 h-24 w-24 animate-glow-hand rounded-full bg-primary/30 blur-2xl"></div>
              </>
            )}
          </div>
          
          <div>
            <p className="font-headline text-sm uppercase tracking-widest text-primary">About Me</p>
            <h2 className="mt-2 font-headline text-4xl font-bold text-foreground sm:text-5xl">
              Building the Future with Code &amp; AI.
            </h2>
            <div className="mt-6 space-y-4 text-lg text-muted-foreground">
              <p>
                I’m a creative developer and AI enthusiast who loves building beautiful, high-performance web experiences.
              </p>
              <p>
                I specialize in turning complex ideas into clean, functional products — combining design, code, and AI to create tools that actually solve problems.
              </p>
              <p>
                I believe in learning by building, experimenting fast, and using technology to make life simpler, smarter, and more efficient.
              </p>
            </div>
            
            <ul className="mt-8 space-y-4">
              {skills.map((skill, index) => (
                <li key={index} className="flex items-center group">
                  <FireballIcon className="h-6 w-6 flex-shrink-0 text-primary transition-transform group-hover:scale-125" />
                  <span className="ml-4 text-base font-medium text-foreground">{skill}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <p className="text-lg font-medium text-foreground">Let’s build something powerful together.</p>
              <Button size="lg" className="mt-4 shadow-[0_0_20px_theme(colors.primary/0.5)] transition-shadow hover:shadow-[0_0_30px_theme(colors.primary/0.7)]">
                Get in Touch
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
