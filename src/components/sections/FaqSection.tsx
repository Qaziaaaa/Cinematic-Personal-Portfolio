import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { question: "Do I need coding skills?", answer: "Not at all! Our community is built for everyone, from complete beginners to seasoned professionals. We focus on tools and techniques that don't require traditional coding." },
  { question: "What tools will I learn?", answer: "You'll get hands-on experience with a range of AI-powered and no-code tools, including Google AI Studio, Firebase Studio, Opal, and various automation platforms to build websites and applications." },
  { question: "What is 'vibecoding'?", answer: "Vibecoding is our term for creative coding and development focused on aesthetics, animation, and user experience. It's about building things that not only work well but also feel amazing to interact with." },
  { question: "Can beginners join?", answer: "Absolutely! We have dedicated learning paths for complete beginners to guide you from the basics to building your first AI-powered project. Our community is supportive and ready to help." },
];

export default function FaqSection() {
  return (
    <section id="faq" className="py-20 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-foreground sm:text-5xl">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
