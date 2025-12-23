"use client";

import { useState } from 'react';
import Loader from '@/components/Loader';
import ParallaxHero from '@/components/ParallaxHero';

export default function PageClient({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  return (
    <>
      <Loader progress={progress} loading={loading} />
      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <ParallaxHero
          onProgress={setProgress}
          onLoaded={() => setLoading(false)}
        />
        {children}
      </div>
    </>
  );
}
