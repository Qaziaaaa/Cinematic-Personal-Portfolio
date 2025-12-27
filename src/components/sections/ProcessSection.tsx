import { Compass, DraftingCompass, Code, Rocket } from "lucide-react";

const processSteps = [
  {
    icon: Compass,
    title: "Discover & Define",
    description: "We start by diving deep into your vision, goals, and challenges to establish a clear foundation for the project.",
  },
  {
    icon: DraftingCompass,
    title: "Design & Prototype",
    description: "Next, I design high-fidelity mockups and interactive prototypes to visualize the end product and refine the user experience.",
  },
  {
    icon: Code,
    title: "Develop & Iterate",
    description: "With a solid plan, I build the application with clean, scalable code, providing regular updates and incorporating feedback.",
  },
  {
    icon: Rocket,
    title: "Launch & Optimize",
    description: "After rigorous testing, we deploy the project. I continue to monitor and optimize for performance, ensuring a flawless launch.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 sm:py-32 relative bg-background overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-background via-background/90 to-transparent z-10"></div>
        <div className="absolute inset-x-0 bottom-0 h-[500px] bg-gradient-to-t from-background via-background/90 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] opacity-20"></div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="text-center">
                <p className="font-headline text-sm uppercase tracking-widest text-primary">My Process</p>
                <h2 className="mt-2 font-headline text-4xl font-bold text-foreground sm:text-5xl">
                    A Blueprint for Success
                </h2>
                <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                    My process is built on clarity, collaboration, and a relentless focus on quality. Here’s how I turn ideas into reality.
                </p>
            </div>

            <div className="relative mt-20">
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-primary/20"></div>
              <div className="space-y-16">
                {processSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isEven = index % 2 === 0;
                  return (
                    <div key={index} className="relative flex items-center justify-center">
                      <div className={`w-1/2 ${isEven ? 'pr-8' : 'pl-8'}`}>
                        <div className={`p-8 group relative rounded-2xl bg-card/80 backdrop-blur-sm border border-primary/20 transition-all duration-300 hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_0_40px_theme(colors.primary/0.2)] ${isEven ? 'text-right' : 'text-left'}`}>
                          <div className={`absolute top-4 text-5xl font-bold text-primary/10 transition-colors duration-300 group-hover:text-primary/20 ${isEven ? 'left-4' : 'right-4'}`}>
                              0{index + 1}
                          </div>
                          <h3 className="font-headline text-2xl font-bold text-foreground">{step.title}</h3>
                          <p className="mt-2 text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary border-4 border-background group-hover:scale-110 transition-all duration-300">
                          <Icon className="h-8 w-8" />
                      </div>
                       <div className={`w-1/2 ${isEven ? 'pl-8' : 'pr-8'}`}></div>
                    </div>
                  )
                })}
              </div>
            </div>
        </div>
    </section>
  );
}
