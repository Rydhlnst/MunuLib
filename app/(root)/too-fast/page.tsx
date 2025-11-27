"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoveRight, RefreshCw, TriangleAlert } from "lucide-react";

const TooFastHero = () => {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="relative pb-24 w-full flex flex-col items-center justify-center overflow-hidden bg-background px-4">
      
      {/* 1. Background Effects (Hero Style) */}
      {/* Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
      {/* Radial Gradient (Spotlight effect) */}
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />

      {/* 2. Main Content */}
      <div className="container flex flex-col items-center gap-6 text-center animate-in fade-in zoom-in duration-500">
        
        {/* Status Badge */}
        <Badge variant="outline" className="px-4 py-1.5 text-sm border-orange-500/50 text-orange-600 bg-orange-50 dark:bg-orange-950/30 backdrop-blur-sm">
          <TriangleAlert className="mr-2 h-3.5 w-3.5" />
          Rate Limit Exceeded
        </Badge>

        {/* Large Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          Whoa, slow down.
        </h1>

        {/* Sub-headline / Description */}
        <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl leading-relaxed">
          We detected too many requests from your device in a short period. 
          The system is taking a quick breather.
        </p>

        {/* Countdown as Main Visual */}
        <div className="py-8">
          <div className="relative flex items-center justify-center">
            {/* Huge Number */}
            <span className="text-[8rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/20 select-none tabular-nums">
              {counter}
            </span>
            <span className="absolute -bottom-2 text-sm font-medium text-muted-foreground tracking-widest uppercase">
              seconds left
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mt-4">
          <Button
            size="lg"
            onClick={handleRetry}
            disabled={counter > 0}
            className={`h-12 px-8 rounded-full text-base font-semibold transition-all duration-300 ${
              counter === 0 ? "shadow-[0_0_20px_-5px_hsl(var(--primary))]" : ""
            }`}
          >
            {counter > 0 ? (
              <span className="flex items-center">
                Retrying automatically...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Reload Page <RefreshCw className="h-4 w-4" />
              </span>
            )}
          </Button>

          {/* Optional Secondary Button */}
          <Button variant="ghost" className="group text-muted-foreground hover:text-foreground">
            Why did this happen?
            <MoveRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

      </div>

      {/* Footer Element */}
      <div className="absolute bottom-0 text-xs text-muted-foreground/60">
        Error Code: 429_TOO_MANY_REQUESTS
      </div>
    </div>
  );
};

export default TooFastHero;
