"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Instagram, Linkedin, Github } from 'lucide-react';
import { communityConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { PlaceHolderImages } from '@/lib/placeholder-images';

// All available frame numbers — exactly matching files in public/frames/
const AVAILABLE_FRAMES = [
  0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,
  20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,
  40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,
  60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,
  80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,
  100,101,102,103,104,105,106,107,109,110,
  111,114,115,120,121,122,123,125,130,140
];
const TOTAL_FRAMES = AVAILABLE_FRAMES.length;
const ANIMATION_DURATION_VH = 400;
// Load frames in batches to avoid overwhelming the browser
const BATCH_SIZE = 15;

const padFrame = (frame: number) => frame.toString().padStart(3, '0');
const getFramePath = (frameNum: number) => `/frames/frame_${padFrame(frameNum)}_delay-0.04s.webp`;

interface ParallaxHeroProps {
  onProgress: (progress: number) => void;
  onLoaded: () => void;
}

function DesktopHero({ onProgress, onLoaded }: ParallaxHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCache = useRef<HTMLImageElement[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const frameIndex = useRef<number>(0);
  const canvasSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Batch-load images for better performance — avoids 100+ simultaneous requests
  const preloadImages = useCallback(async () => {
    if (imageCache.current.length > 0) {
      onProgress(100);
      onLoaded();
      return;
    }

    let loadedCount = 0;

    for (let batchStart = 0; batchStart < TOTAL_FRAMES; batchStart += BATCH_SIZE) {
      const batchEnd = Math.min(batchStart + BATCH_SIZE, TOTAL_FRAMES);
      const batchPromises: Promise<void>[] = [];

      for (let i = batchStart; i < batchEnd; i++) {
        batchPromises.push(
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = getFramePath(AVAILABLE_FRAMES[i]);
            img.onload = () => {
              imageCache.current[i] = img;
              loadedCount++;
              onProgress((loadedCount / TOTAL_FRAMES) * 100);
              resolve();
            };
            img.onerror = () => {
              // Skip missing frames silently — no 404 noise
              loadedCount++;
              onProgress((loadedCount / TOTAL_FRAMES) * 100);
              resolve();
            };
          })
        );
      }

      await Promise.all(batchPromises);
    }

    onLoaded();
  }, [onProgress, onLoaded]);

  // Optimized: only resize canvas when dimensions actually change
  const drawFrame = useCallback((index: number) => {
    if (!canvasRef.current || !imageCache.current[index]) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const img = imageCache.current[index];
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Only resize canvas buffer when dimensions change — major perf win
    const newW = Math.round(rect.width * dpr);
    const newH = Math.round(rect.height * dpr);
    if (canvasSizeRef.current.w !== newW || canvasSizeRef.current.h !== newH) {
      canvas.width = newW;
      canvas.height = newH;
      canvasSizeRef.current = { w: newW, h: newH };
    }

    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const canvasAspect = rect.width / rect.height;
    const imgAspect = img.naturalWidth / img.naturalHeight;

    let sx = 0, sy = 0, sWidth = img.naturalWidth, sHeight = img.naturalHeight;
    if (imgAspect > canvasAspect) {
      sWidth = img.naturalHeight * canvasAspect;
      sx = (img.naturalWidth - sWidth) / 2;
    } else {
      sHeight = img.naturalWidth / canvasAspect;
      sy = (img.naturalHeight - sHeight) / 2;
    }

    context.clearRect(0, 0, rect.width, rect.height);
    context.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, rect.width, rect.height);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    preloadImages().then(() => {
      if (canvasRef.current) drawFrame(0);
    });
  }, [isMounted, preloadImages, drawFrame]);

  useEffect(() => {
    if (!isMounted) return;

    let animationFrameId: number;
    let isTicking = false;

    const handleScroll = () => {
      if (!isTicking) {
        animationFrameId = requestAnimationFrame(() => {
          if (!heroRef.current) return;
          const scrollY = window.scrollY;
          const rect = heroRef.current.getBoundingClientRect();
          const scrollTop = scrollY + rect.top;

          const animationScrollHeight = window.innerHeight * (ANIMATION_DURATION_VH / 100);

          let scrollFraction = 0;
          if (animationScrollHeight > 0) {
            scrollFraction = Math.min(1, Math.max(0, (scrollY - scrollTop) / animationScrollHeight));
          }

          const newFrameIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(scrollFraction * TOTAL_FRAMES)));

          if (newFrameIndex !== frameIndex.current) {
            frameIndex.current = newFrameIndex;
            drawFrame(frameIndex.current);
          }
          isTicking = false;
        });
        isTicking = true;
      }
    };

    const handleResize = () => {
      // Reset cached size so drawFrame will re-measure
      canvasSizeRef.current = { w: 0, h: 0 };
      if (canvasRef.current) drawFrame(frameIndex.current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [drawFrame, isMounted]);

  return (
    <div ref={heroRef} style={{ height: `${ANIMATION_DURATION_VH + 100}vh` }} className="relative w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden rounded-b-2xl">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full filter contrast-[1.1] saturate-[1.1] brightness-100"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-center px-4 text-foreground sm:px-6 lg:px-8">
          <div className="max-w-sm">
            <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="text-white">{communityConfig.introLine.part1}</span>
              <span className="text-primary">{communityConfig.introLine.part2}</span>
            </h1>
            <p className="mt-4 text-lg leading-7 text-white">
              {communityConfig.description}
            </p>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center space-x-6">
            <a href={communityConfig.socials.linkedin} aria-label="LinkedIn" className="text-foreground/70 transition-colors hover:text-primary"><Linkedin size={24} /></a>
            <a href={communityConfig.socials.github} aria-label="GitHub" className="text-foreground/70 transition-colors hover:text-primary"><Github size={24} /></a>
            <a href={communityConfig.socials.instagram} aria-label="Instagram" className="text-foreground/70 transition-colors hover:text-primary"><Instagram size={24} /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileHero({ onLoaded }: { onLoaded: () => void }) {
  const gokuImage = PlaceHolderImages.find(p => p.id === 'mobile-hero-bg');

  useEffect(() => {
    onLoaded();
  }, [onLoaded]);

  return (
    <div className="relative h-screen w-full overflow-hidden rounded-b-2xl">
      {gokuImage && (
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center filter contrast-125 saturate-125"
          style={{ backgroundImage: `url(${gokuImage.imageUrl})` }}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50" />
      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 text-center text-foreground sm:px-6 lg:px-8">
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-white">{communityConfig.introLine.part1}</span>
            <span className="text-primary">{communityConfig.introLine.part2}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg leading-7 text-white">
            {communityConfig.description}
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center space-x-6">
          <a href={communityConfig.socials.linkedin} aria-label="LinkedIn" className="text-foreground/70 transition-colors hover:text-primary"><Linkedin size={24} /></a>
          <a href={communityConfig.socials.github} aria-label="GitHub" className="text-foreground/70 transition-colors hover:text-primary"><Github size={24} /></a>
          <a href={communityConfig.socials.instagram} aria-label="Instagram" className="text-foreground/70 transition-colors hover:text-primary"><Instagram size={24} /></a>
        </div>
      </div>
    </div>
  );
}

export default function ParallaxHero({ onProgress, onLoaded }: ParallaxHeroProps) {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return null; // or a placeholder/spinner
  }

  return isMobile
    ? <MobileHero onLoaded={onLoaded} />
    : <DesktopHero onProgress={onProgress} onLoaded={onLoaded} />;
}
