import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section id="cta" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary/10 px-6 py-20 text-center shadow-lg sm:px-16">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
          <div className="relative">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Start Building Beautiful AI Websites Today
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Unlock your creative potential and join a community of innovators shaping the future of web creation.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg">Join Andynocode Community</Button>
              <Button size="lg" variant="outline" className="bg-background/50">
                Explore Courses
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
