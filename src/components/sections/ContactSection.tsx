import { Button } from "@/components/ui/button";
import { DragonballPattern } from "../DragonballPattern";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-32 relative overflow-hidden">
        <DragonballPattern id="contact-pattern" className="absolute inset-0 h-full w-full opacity-[0.03]" />
        <div className="absolute inset-x-0 bottom-0 h-[500px] bg-gradient-to-t from-background via-background/80 to-transparent z-0"></div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border border-primary/20 px-6 py-20 text-center shadow-[0_0_40px_theme(colors.primary/0.1)]">
          
          <div className="absolute inset-0 z-0 opacity-20"
            style={{
                backgroundImage: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
          
          <div className="relative">
            <p className="font-headline text-sm uppercase tracking-widest text-primary">Have a project in mind?</p>
            <h2 className="mt-2 font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Let's Build Something Amazing Together
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              I'm currently available for freelance projects and collaborations. If you have an idea you'd like to discuss, let's connect.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="shadow-[0_0_20px_theme(colors.primary/0.5)] transition-shadow hover:shadow-[0_0_30px_theme(colors.primary/0.7)]">
                Get In Touch
              </Button>
              <Button size="lg" variant="outline" className="bg-background/50">
                View My Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
