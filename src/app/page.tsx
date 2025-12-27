import PageClient from './page-client';
import AboutSection from '@/components/sections/AboutSection';
import ProcessSection from '@/components/sections/ProcessSection';
import LearningPathsSection from '@/components/sections/LearningPathsSection';
import StudentShowcaseSection from '@/components/sections/StudentShowcaseSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FaqClientSection from '@/components/sections/FaqClientSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

export default async function Home() {
  return (
    <PageClient>
      <main className="bg-background">
        <AboutSection />
        <ProcessSection />
        <LearningPathsSection />
        <StudentShowcaseSection />
        <TestimonialsSection />
        <FaqClientSection />
        <ContactSection />
        <Footer />
      </main>
    </PageClient>
  );
}
