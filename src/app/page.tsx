import PageClient from './page-client';
import AboutSection from '@/components/sections/AboutSection';
import LearningPathsSection from '@/components/sections/LearningPathsSection';
import StudentShowcaseSection from '@/components/sections/StudentShowcaseSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FaqSection from '@/components/sections/FaqSection';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/sections/Footer';

export default async function Home() {
  return (
    <PageClient>
      <main className="bg-background">
        <AboutSection />
        <LearningPathsSection />
        <StudentShowcaseSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
        <Footer />
      </main>
    </PageClient>
  );
}
