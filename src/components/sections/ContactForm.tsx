"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function ContactForm() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setLoading(false);
        toast({
            title: "Message Sent!",
            description: "Thanks for reaching out. I'll get back to you soon.",
        });

        // Reset form
        (event.target as HTMLFormElement).reset();
    }


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="font-headline text-2xl font-bold text-foreground">Send me a message</h3>
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required placeholder="Your Name" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="your.email@example.com" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" required placeholder="Tell me about your project..." rows={4} />
            </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Sending...' : 'Send Message'}
        </Button>
    </form>
  );
}
