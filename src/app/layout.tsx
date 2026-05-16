import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Qazi - Creative Developer & AI Specialist',
  description: 'A personal portfolio showcasing creative development, AI-powered web apps, and animated web experiences.',
  icons: {
    icon: {
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23c8a44e'/%3E%3Cstop offset='50%25' stop-color='%23f0d78c'/%3E%3Cstop offset='100%25' stop-color='%23b8943e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='32' height='32' rx='6' fill='%230a0a0f'/%3E%3Cpath d='M22.5 8.5a11 11 0 1 0 0 15' fill='none' stroke='url(%23g)' stroke-width='2.5' stroke-linecap='round'/%3E%3Cpath d='M16 10l2.5 4.3h-5z' fill='url(%23g)' opacity='0.9'/%3E%3Cpath d='M20.2 12.5l-2.5 4.3-2.5-4.3z' fill='url(%23g)' opacity='0.7'/%3E%3Cpath d='M20.2 19.5l-4.2-0.1 2.5-4.3z' fill='url(%23g)' opacity='0.8'/%3E%3Cpath d='M16 22l-2.5-4.3h5z' fill='url(%23g)' opacity='0.9'/%3E%3Cpath d='M11.8 19.5l2.5-4.3 2.5 4.3z' fill='url(%23g)' opacity='0.7'/%3E%3Cpath d='M11.8 12.5l4.2 0.1-2.5 4.3z' fill='url(%23g)' opacity='0.8'/%3E%3Ccircle cx='16' cy='16' r='1.8' fill='url(%23g)'/%3E%3C/svg%3E",
      type: 'image/svg+xml',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
