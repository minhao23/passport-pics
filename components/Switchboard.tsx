// components/Switchboard.tsx
"use client";

import React, { useEffect, useState } from 'react';

export const Switchboard = () => {
  // We use a large number to ensure the grid can fill massive 4K monitors.
  // CSS Grid will naturally wrap and hide the overflow.
  const totalDots = 1000; 

  const [litDots, setLitDots] = useState<Set<number>>(new Set());
  const [medDots, setMedDots] = useState<Set<number>>(new Set());

  // This brings the AI to life by randomly shifting the "processing" lights every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newHigh = new Set<number>();
      const newMed = new Set<number>();
      
      for (let i = 0; i < 20; i++) {
        newHigh.add(Math.floor(Math.random() * totalDots));
      }
      for (let i = 0; i < 40; i++) {
        newMed.add(Math.floor(Math.random() * totalDots));
      }
      
      setLitDots(newHigh);
      setMedDots(newMed);
    }, 1500); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#0d1117] overflow-hidden flex items-center justify-center">
      
      {/* 1. The Grid Layer */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          display: 'grid',
          // Automatically creates as many 40px columns as needed to fill the screen
          gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))', 
          gridAutoRows: '40px',
        }}
      >
        {Array.from({ length: totalDots }).map((_, i) => {
          let state = "off";
          if (litDots.has(i)) state = "high";
          else if (medDots.has(i)) state = "medium";

          return (
            <div 
              key={i} 
              className="w-full h-full border-[0.5px] border-white/[0.02] flex items-center justify-center"
            >
              <div
                className="rounded-full transition-all duration-1000 ease-in-out"
                data-state={state}
                style={{
                  width: state !== "off" ? '6px' : '4px',
                  height: state !== "off" ? '6px' : '4px',
                  backgroundColor: 
                    state === "high" ? "#3fb950" :                  // GitHub Green
                    state === "medium" ? "rgba(63, 185, 80, 0.3)" : // Muted Green
                    "rgba(255, 255, 255, 0.03)",                    // Very subtle off state
                  boxShadow: 
                    state === "high" ? "0 0 12px 1px rgba(63, 185, 80, 0.5)" : 
                    "none",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 2. Core Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] bg-[#3fb950] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

      {/* 3. Vignette Overlay (The magic touch that makes it look premium) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_10%,_#0d1117_95%)] pointer-events-none" />
    </div>
  );
};