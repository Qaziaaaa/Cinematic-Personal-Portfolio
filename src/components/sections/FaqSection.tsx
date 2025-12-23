"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { question: "What kind of projects do you take on?", answer: "I specialize in creating custom websites with a focus on animation and AI integration, building internal tools, and developing full-stack web applications. If you have a creative or technical challenge, I'm interested!" },
  { question: "What's your development process?", answer: "My process is collaborative and transparent. We'll start with a discovery call to understand your goals, followed by design mockups, development sprints with regular check-ins, and a final launch. Your feedback is crucial at every stage." },
  { question: "What technologies do you use?", answer: "I work with a modern tech stack including Next.js, React, and Tailwind CSS. For AI features, I use tools like Google's Genkit and Firebase to build powerful, scalable solutions without the overhead of traditional backend development." },
  { question: "What are your rates?", answer: "My rates depend on the scope and complexity of the project. I offer project-based pricing and hourly consulting. Get in touch for a detailed quote tailored to your needs." },
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
