"use client";

import { Progress } from "@/components/ui/progress";
import Logo from "./Logo";

export default function Loader({ progress, loading }: { progress: number, loading: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="w-full max-w-xs text-center">
        <div className="mx-auto animate-pulse">
          <Logo />
        </div>
        <p className="text-muted-foreground mt-4">Loading cinematic experience...</p>
        <Progress value={progress} className="mt-4 h-2" />
        <p className="mt-2 text-sm text-muted-foreground">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
