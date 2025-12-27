"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Slash, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { communityConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

function Logo() {
    return (
        <div className="flex items-center font-headline text-xl font-bold">
            <ChevronLeft className="h-6 w-6 text-primary" strokeWidth={3} />
            <span className="mx-[-4px]">Qazi</span>
            <div className="relative inline-flex items-center">
                <Slash className="h-6 w-6 text-primary/80" strokeWidth={3} />
                <ChevronRight className="h-6 w-6 text-primary ml-[-11px]" strokeWidth={3} />
            </div>
        </div>
    )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "pt-2" : "pt-4"
    )}>
      <div className={cn(
        "container mx-auto max-w-5xl rounded-full border border-white/10 bg-white/5 backdrop-blur-lg transition-all duration-300",
        isScrolled ? "py-2" : "py-3"
      )}>
        <div className="flex items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-foreground transition-opacity hover:opacity-80">
            <div className="hidden sm:inline"><Logo /></div>
            <div className="sm:hidden"><Logo /></div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button size="sm">Get in Touch</Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={() => setIsOpen(false)}>
        <div className={cn(
          "fixed top-4 right-4 w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-card border border-border p-6 shadow-lg transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-[110%]"
        )} onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-foreground transition-opacity hover:opacity-80">
              <Logo />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="mt-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
             <Button className="mt-4 w-full">Get in Touch</Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
