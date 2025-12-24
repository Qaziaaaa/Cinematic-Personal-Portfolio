"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Instagram, Linkedin, Github } from 'lucide-react';
import { communityConfig } from '@/lib/config';

const TOTAL_FRAMES = 115;
const FRAME_URL_PREFIX = 'https://kicfhcemxzavsyfrvxgf.supabase.co/storage/v1/object/public/Webp%20sequence/frame_';
const FRAME_URL_SUFFIX = '_delay-0.04s.webp';
const ANIMATION_DURATION_VH = 400; 

const padFrame = (frame: number) => frame.toString().padStart(3, '0');

interface ParallaxHeroProps {
  onProgress: (progress: number) => void;
  onLoaded: () => void;
}

export default function ParallaxHero({ onProgress, onLoaded }: ParallaxHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCache = useRef<HTMLImageElement[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const frameIndex = useRef<number>(0);
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const preloadImages = useCallback(async () => {
    if (imageCache.current.length > 0) {
      onProgress(100);
      onLoaded();
      return;
    }
  
    const loadPromises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = `${FRAME_URL_PREFIX}${padFrame(i)}${FRAME_URL_SUFFIX}`;
        img.onload = () => {
          imageCache.current[i] = img;
          const loadedCount = imageCache.current.filter(Boolean).length;
          onProgress((loadedCount / TOTAL_FRAMES) * 100);
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
      });
    });
  
    try {
      await Promise.all(loadPromises);
    } catch (error) {
      // console.error("Failed to preload images:", error);
    } finally {
      onLoaded();
    }
  }, [onProgress, onLoaded]);
  
  const drawFrame = useCallback((index: number) => {
    if (!canvasRef.current || !imageCache.current[index]) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const img = imageCache.current[index];
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
  
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    context.scale(dpr, dpr);

    const canvasAspect = rect.width / rect.height;
    const imgAspect = img.naturalWidth / img.naturalHeight;

    let sx = 0, sy = 0, sWidth = img.naturalWidth, sHeight = img.naturalHeight;
    if (imgAspect > canvasAspect) { // Image is wider than canvas
        sHeight = img.naturalHeight;
        sWidth = img.naturalHeight * canvasAspect;
        sx = (img.naturalWidth - sWidth) / 2;
    } else { // Image is taller than canvas
        sWidth = img.naturalWidth;
        sHeight = img.naturalWidth / canvasAspect;
        sy = (img.naturalHeight - sHeight) / 2;
    }
    
    context.clearRect(0, 0, rect.width, rect.height);
    context.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, rect.width, rect.height);
  }, []);
  
  useEffect(() => {
    if (!isMounted) return;
    preloadImages().then(() => {
      if (canvasRef.current) {
        drawFrame(0);
      }
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
      if (canvasRef.current) {
        drawFrame(frameIndex.current);
      }
    };
  
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
  
    handleScroll();
    handleResize();
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [drawFrame, isMounted]);

  return (
    <div ref={heroRef} style={{ height: `${ANIMATION_DURATION_VH + 100}vh` }} className="relative w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden rounded-b-2xl">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-center px-4 text-foreground sm:px-6 lg:px-8">
          
          <div className="max-w-sm">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {communityConfig.introLine}
            </h1>
            <p className="mt-4 text-lg leading-7 text-gray-300">
              {communityConfig.description}
            </p>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center space-x-6">
            <a href={communityConfig.socials.linkedin} aria-label="LinkedIn" className="text-foreground/70 transition-colors hover:text-primary">
              <Linkedin size={24} />
            </a>
            <a href={communityConfig.socials.github} aria-label="GitHub" className="text-foreground/70 transition-colors hover:text-primary">
              <Github size={24} />
            </a>
            <a href={communityConfig.socials.instagram} aria-label="Instagram" className="text-foreground/70 transition-colors hover:text-primary">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
