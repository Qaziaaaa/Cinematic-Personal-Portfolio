import { cn } from "@/lib/utils";

export function FireballIcon({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 z-10 animate-pulse-slow"
      >
        <defs>
          <radialGradient id="fireballGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="white" />
            <stop offset="60%" stopColor="currentColor" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="25" fill="url(#fireballGradient)" />
      </svg>
      <div className="absolute inset-0 z-0 animate-pulse-slower rounded-full bg-primary/50 blur-md" />
    </div>
  );
}
