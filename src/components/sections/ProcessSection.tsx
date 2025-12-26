import { Compass, DraftingCompass, Code, Rocket } from "lucide-react";
import { DragonballPattern } from "../DragonballPattern";

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
        <DragonballPattern id="process-pattern" className="absolute inset-0 h-full w-full opacity-[0.03]" />
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-background via-background/90 to-transparent z-10"></div>
        <div className="absolute inset-x-0 bottom-0 h-[500px] bg-gradient-to-t from-background via-background/90 to-transparent z-10"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
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
                <div className="absolute left-1/2 top-0 -bottom-1/2 -translate-x-1/2 w-px bg-primary/20" aria-hidden="true"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    {processSteps.map((step, index) => {
                        const Icon = step.icon;
                        const isEven = index % 2 === 0;
                        return (
                            <div key={index} className={`relative flex items-start gap-6 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                <div className="absolute left-1/2 top-7 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary ring-4 ring-background"></div>
                                
                                <div className={`flex-shrink-0 w-16 h-16 rounded-lg bg-card border border-primary/20 flex items-center justify-center text-primary transition-all duration-300 group-hover:scale-110`}>
                                    <Icon className="h-8 w-8" />
                                </div>
                                <div className={`text-left ${isEven ? '' : 'md:text-right'}`}>
                                    <p className="font-headline text-2xl font-bold text-foreground">{`0${index + 1}. ${step.title}`}</p>
                                    <p className="mt-2 text-muted-foreground">{step.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </section>
  );
}
