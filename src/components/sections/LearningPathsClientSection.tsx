"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Bot, Settings, Zap } from "lucide-react";
import { FireballIcon } from "../FireballIcon";

const services = [
  { 
    id: "path-animated-websites", 
    title: "Motion That Brings Ideas to Life", 
    description: "I create cinematic, scroll-based websites that feel alive — smooth, responsive, and visually powerful.",
    abilities: ["Energy-smooth animations", "Cinematic transitions", "High-performance UI motion"],
    icon: FireballIcon,
    theme: "orange",
    imageHint: "website animation"
  },
  { 
    id: "path-ai-builders", 
    title: "Speed, Intelligence, Precision", 
    description: "Launch websites at lightning speed using AI-powered systems that handle layout, structure, and content generation.",
    abilities: ["AI-generated layouts", "Smart content systems", "Rapid deployment"],
    icon: Bot,
    theme: "blue",
    imageHint: "AI builder"
  },
  { 
    id: "path-internal-tools", 
    title: "Power That Works Behind the Scenes", 
    description: "Custom-built AI tools that automate workflows, optimize operations, and remove repetitive work.",
    abilities: ["Workflow automation", "AI dashboards", "Productivity boosters"],
    icon: Settings,
    theme: "yellow",
    imageHint: "internal tools"
  },
  { 
    id: "path-ai-apps", 
    title: "From Idea to Ultimate Form", 
    description: "Full-stack AI applications built for real-world performance, scalability, and impact.",
    abilities: ["AI integrations", "Backend + frontend systems", "Scalable architectures"],
    icon: Zap,
    theme: "red",
    imageHint: "AI app"
  }
];

const themeClasses = {
  orange: {
    card: "border-primary/20 hover:border-primary/50 hover:shadow-primary/20",
    icon: "text-primary",
    ability: "before:bg-primary/50",
    cta: "text-primary group-hover:text-primary/80"
  },
  blue: {
    card: "border-blue-500/20 hover:border-blue-500/50 hover:shadow-blue-500/20",
    icon: "text-blue-400",
    ability: "before:bg-blue-400/50",
    cta: "text-blue-400 group-hover:text-blue-300"
  },
  yellow: {
    card: "border-yellow-500/20 hover:border-yellow-500/50 hover:shadow-yellow-500/20",
    icon: "text-yellow-400",
    ability: "before:bg-yellow-400/50",
    cta: "text-yellow-400 group-hover:text-yellow-300"
  },
  red: {
    card: "border-red-500/20 hover:border-red-500/50 hover:shadow-red-500/20",
    icon: "text-red-500",
    ability: "before:bg-red-500/50",
    cta: "text-red-500 group-hover:text-red-400"
  },
};

export default function LearningPathsClientSection() {
  return (
    <section id="services" className="py-20 sm:py-32 bg-background relative overflow-hidden">
        <div
            className="absolute inset-0 z-0 opacity-5"
            style={{
                backgroundImage: 'radial-gradient(circle, hsl(var(--primary) / 0.05) 1px, transparent 1px), radial-gradient(circle, hsl(var(--primary) / 0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                backgroundPosition: '0 0, 20px 20px',
                animation: 'float 20s linear infinite',
            }}
        />
         <style jsx>{`
            @keyframes float {
                0% { transform: translate(0, 0); }
                50% { transform: translate(10px, 10px); }
                100% { transform: translate(0, 0); }
            }
        `}</style>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-foreground sm:text-5xl">
            What I Do
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            I build powerful digital experiences — combining code, creativity, and AI, just like mastering energy.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(service => {
            const pathImage = PlaceHolderImages.find(p => p.id === service.id);
            const Icon = service.icon;
            const theme = themeClasses[service.theme as keyof typeof themeClasses];
            return (
              <a href="#" key={service.id} className="group block h-full">
                <Card className={`flex h-full flex-col overflow-hidden transition-all duration-300 bg-card/80 backdrop-blur-sm hover:-translate-y-2 ${theme.card}`}>
                  {pathImage && (
                    <div className="overflow-hidden aspect-[4/3] relative">
                      <Image
                        src={pathImage.imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={service.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent"></div>
                    </div>
                  )}
                  <CardHeader className="flex-row items-center gap-4">
                    <Icon className={`h-8 w-8 flex-shrink-0 ${theme.icon}`} />
                    <CardTitle className="font-headline text-lg leading-tight">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <CardDescription>{service.description}</CardDescription>
                    <div className="mt-4">
                        <p className="text-sm font-semibold text-foreground/80 mb-2">Abilities:</p>
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                            {service.abilities.map(ability => (
                                <li key={ability} className="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-1.5 before:w-1.5 before:rounded-full before:opacity-80 before:shadow-[0_0_8px_2px_currentColor] before:transition-all" style={{color: `hsl(var(--primary)) `}}>
                                   <span className="text-muted-foreground">{ability}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <span className={`flex items-center text-sm font-semibold transition-all duration-300 ${theme.cta}`}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
