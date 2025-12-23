"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Youtube, Instagram, Twitter } from 'lucide-react';
import { communityConfig } from '@/lib/config';

const TOTAL_FRAMES = 240;
const FRAME_URL_PREFIX = 'https://kicfhcemxzavsyfrvxgf.supabase.co/storage/v1/object/public/Webp%20sequence/frame_';
const FRAME_URL_SUFFIX = '_delay-0.04s.webp';

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
          // Still resolve so that Promise.all doesn't fail on a single image error
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
    const canvasAspect = canvas.width / canvas.height;
    const imgAspect = img.width / img.height;

    let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;

    if (imgAspect > canvasAspect) {
      sHeight = img.height;
      sWidth = sHeight * canvasAspect;
      sx = (img.width - sWidth) / 2;
    } else {
      sWidth = img.width;
      sHeight = sWidth / canvasAspect;
      sy = (img.height - sHeight) / 2;
    }
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
  }, []);
  
  useEffect(() => {
    if (!isMounted) return;
    preloadImages().then(() => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
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
          const scrollHeight = heroRef.current.scrollHeight - window.innerHeight;
  
          let scrollFraction = 0;
          if (scrollHeight > 0) {
            scrollFraction = Math.min(1, Math.max(0, (scrollY - scrollTop) / scrollHeight));
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
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
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
      cancelAnimationFrame(animationFrameId);
    };
  }, [drawFrame, isMounted]);

  return (
    <div ref={heroRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden rounded-b-2xl">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-4 py-8 text-foreground sm:px-6 lg:px-8">
          
          <div className="self-start">
            {/* Removed hero text */}
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-right sm:right-6 lg:right-8">
            {/* Removed tagline, description, and AI button */}
          </div>

          <div className="flex justify-center space-x-6">
            <a href={communityConfig.socials.youtube} aria-label="Youtube" className="text-foreground/70 transition-colors hover:text-primary">
              <Youtube size={24} />
            </a>
            <a href={communityConfig.socials.instagram} aria-label="Instagram" className="text-foreground/70 transition-colors hover:text-primary">
              <Instagram size={24} />
            </a>
            <a href={communityConfig.socials.twitter} aria-label="Twitter" className="text-foreground/70 transition-colors hover:text-primary">
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
