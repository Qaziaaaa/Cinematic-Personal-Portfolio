import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const skills = [
  "Rapidly creating websites with AI tools.",
  "Designing and implementing cinematic animated web experiences.",
  "Building and automating internal tools with AI.",
  "Developing full-fledged AI-assisted web applications.",
];

export default function AboutSection() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-portrait');

  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="lg:order-2">
            <h2 className="font-headline text-4xl font-bold text-foreground sm:text-5xl">
              About Me
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              I'm a creative developer and AI enthusiast passionate about building beautiful, functional, and innovative web experiences. My mission is to demystify AI and empower clients to leverage cutting-edge technology. I believe in learning by doing and bringing ideas to life through code and creativity.
            </p>
            <ul className="mt-8 space-y-4">
              {skills.map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="ml-3 text-base text-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:order-1">
            {aboutImage && (
              <Card className="overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    width={600}
                    height={800}
                    className="h-full w-full object-cover"
                    data-ai-hint={aboutImage.imageHint}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
