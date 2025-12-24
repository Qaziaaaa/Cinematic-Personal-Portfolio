import { CodeXml, Github, Instagram, Linkedin } from 'lucide-react';
import { communityConfig } from '@/lib/config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <CodeXml className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-bold">{communityConfig.name}</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a href="#about" className="transition-colors hover:text-primary">About</a>
            <a href="#services" className="transition-colors hover:text-primary">Services</a>
            <a href="#projects" className="transition-colors hover:text-primary">Projects</a>
            <a href="#faq" className="transition-colors hover:text-primary">FAQ</a>
            <a href="#contact" className="transition-colors hover:text-primary">Contact</a>
          </nav>
          <div className="flex justify-center space-x-6">
            <a href={communityConfig.socials.linkedin} aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-primary">
              <Linkedin size={24} />
            </a>
            <a href={communityConfig.socials.github} aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-primary">
              <Github size={24} />
            </a>
            <a href={communityConfig.socials.instagram} aria-label="Instagram" className="text-muted-foreground transition-colors hover:text-primary">
              <Instagram size={24} />
            </a>
          </div>
        </div>
        <div id="contact" className="mt-8 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          &copy; {currentYear} {communityConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
