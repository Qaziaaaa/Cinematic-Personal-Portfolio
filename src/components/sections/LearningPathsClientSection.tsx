
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Bot, Settings, Zap } from "lucide-react";
import { FireballIcon } from "../FireballIcon";

const services = [
  { 
    id: "path-animated-websites", 
    title: "Animated Websites", 
    subTitle: "Smooth. Cinematic. Impactful.",
    description: "I build scroll-based animated websites that feel alive — designed to impress, engage, and convert.",
    abilities: ["Fluid animations", "Cinematic transitions", "High-performance UI"],
    imageHint: "website animation"
  },
  { 
    id: "path-ai-builders", 
    title: "AI Website Builders", 
    subTitle: "Fast creation. Smart structure.",
    description: "AI-powered websites built for speed, clarity, and scalability — without sacrificing design quality.",
    abilities: ["AI-driven layouts", "Smart content generation", "Rapid deployment"],
    imageHint: "AI builder"
  },
  { 
    id: "path-internal-tools", 
    title: "Internal AI Tools", 
    subTitle: "Automation with intelligence.",
    description: "Custom AI tools that streamline workflows and eliminate repetitive work.",
    abilities: ["Workflow automation", "Intelligent dashboards", "Business optimization"],
    imageHint: "internal tools"
  },
  { 
    id: "path-ai-apps", 
    title: "AI App Development", 
    subTitle: "From idea to powerful system.",
    description: "End-to-end AI applications built for real-world performance and growth.",
    abilities: ["Full-stack development", "AI integration", "Scalable architecture"],
    imageHint: "AI app"
  }
];

export default function LearningPathsClientSection() {
  return (
    <section id="services" className="py-20 sm:py-32 bg-background relative overflow-hidden">
        <div
            className="absolute inset-0 z-0 opacity-5"
            style={{
                backgroundImage: 'radial-gradient(circle, hsl(var(--primary) / 0.05) 1px, transparent 1px), radial-gradient(circle, hsl(var(--primary) / 0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                backgroundPosition: '0 0, 20px 20px',
            }}
        />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-foreground sm:text-5xl">
            What I Do
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            I build powerful digital experiences that blend design, motion, and artificial intelligence.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(service => {
            return (
              <a href="#" key={service.id} className="group block h-full">
                <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 hover:shadow-primary/10 hover:-translate-y-2">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl leading-tight text-foreground">{service.title}</CardTitle>
                    <CardDescription className="font-medium text-primary">{service.subTitle}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-muted-foreground">{service.description}</p>
                      <ul className="mt-6 space-y-3">
                        {service.abilities.map(ability => (
                          <li key={ability} className="flex items-center gap-3">
                            <FireballIcon className="h-4 w-4 flex-shrink-0 text-primary" />
                            <span className="text-sm text-foreground">{ability}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <span className="flex items-center text-sm font-semibold text-primary transition-all duration-300">
                        Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
