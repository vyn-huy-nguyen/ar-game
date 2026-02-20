/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { useGame } from '../GameContext';

export default function ARScreen() {
  const { setCurrentScreen, unlockMemory, currentLocationId, unlockedMemories } = useGame();
  const [isFound, setIsFound] = useState(false);

  const handleObjectClick = () => {
    setIsFound(true);
    if (currentLocationId) {
      unlockMemory(currentLocationId);
    }
    setTimeout(() => {
      setCurrentScreen('collected');
    }, 1500);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark relative h-screen w-full overflow-hidden font-sans text-white">
      {/* Camera Feed Background */}
      <div
        className="absolute inset-0 h-full w-full bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://lh3.googleusercontent.com/aida-public/AB6AXuDToY4t0L1RQdDim6pA4RE8FmBbYRm9OlURuvun1TdzZSBWrf11QpR0VLsLyWSto_gcmA28O447FtETgcvwH0qV207EA1XouRYXIaxDQCP6BOXdpGLkDWNejSeSVlJ54o-B_vFQx5X6SQdzrg4FuaF9-qdf0DU5niEiApi5zTnxeqksXwQAEI1DJ8YvEeO1oA7FQcnOz_hScPel4cWukgOIfTeGak9lAyrVwb-hTq4-ZCTrJ70yC_pj_cjrX9hdT6Xkyn8UDnLoS2yt)',
        }}
        aria-label="Hanoi historic street scene"
      >
        {/* Vignette overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      </div>

      {/* UI Layer */}
      <div className="safe-area-padding relative z-10 flex h-full w-full flex-col justify-between">
        {/* Header: Progress & Close */}
        <div className="flex items-start justify-between p-6 pt-12">
          {/* Progress Badge */}
          <div className="border-primary/20 bg-background-dark/90 flex items-center gap-2 rounded-full border px-4 py-2 shadow-lg backdrop-blur-sm">
            <span className="material-symbols-outlined text-primary text-sm">history_edu</span>
            <span className="text-primary text-sm font-bold tracking-widest">
              {unlockedMemories.length} / 8
            </span>
          </div>
          {/* Close Button */}
          <button
            onClick={() => setCurrentScreen('map')}
            className="border-primary/20 bg-background-dark/90 hover:bg-background-dark group flex h-10 w-10 items-center justify-center rounded-full border shadow-lg backdrop-blur-sm transition-colors"
          >
            <span className="material-symbols-outlined text-primary transition-transform group-hover:scale-110">
              close
            </span>
          </button>
        </div>

        {/* Center: AR Scanner Reticle */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {/* Reticle Container */}
          <div className="relative h-64 w-64 opacity-90 md:h-80 md:w-80">
            {/* Cornerstone Brackets */}
            <div className="border-primary absolute left-0 top-0 h-12 w-12 rounded-tl-lg border-l-[3px] border-t-[3px] shadow-[0_0_15px_rgba(249,212,6,0.5)]"></div>
            <div className="border-primary absolute right-0 top-0 h-12 w-12 rounded-tr-lg border-r-[3px] border-t-[3px] shadow-[0_0_15px_rgba(249,212,6,0.5)]"></div>
            <div className="border-primary absolute bottom-0 left-0 h-12 w-12 rounded-bl-lg border-b-[3px] border-l-[3px] shadow-[0_0_15px_rgba(249,212,6,0.5)]"></div>
            <div className="border-primary absolute bottom-0 right-0 h-12 w-12 rounded-br-lg border-b-[3px] border-r-[3px] shadow-[0_0_15px_rgba(249,212,6,0.5)]"></div>

            {/* Animated Scan Line */}
            <div className="animate-scan-move via-primary absolute left-0 h-[2px] w-full bg-gradient-to-r from-transparent to-transparent shadow-[0_0_10px_#f9d406]"></div>

            {/* Center Focus Point */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-primary h-1 w-1 rounded-full shadow-[0_0_15px_rgba(249,212,6,0.5)]"></div>
            </div>

            {/* Interactive Object (Hidden/Glowing) - Pointer events auto enabled */}
            <div
              className="pointer-events-auto absolute left-1/2 top-1/2 z-50 h-40 w-40 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              onClick={handleObjectClick}
            >
              {/* Visual cue to click - shimmer only, mainly invisible/integrated to environment */}
              <div className="bg-primary absolute inset-0 animate-pulse rounded-full opacity-0 transition-opacity hover:opacity-20"></div>
            </div>

            {/* Decorative Accents */}
            <div className="absolute left-2 top-2 h-2 w-2 rounded-tl-sm border-l border-t border-white/50"></div>
            <div className="absolute right-2 top-2 h-2 w-2 rounded-tr-sm border-r border-t border-white/50"></div>
            <div className="absolute bottom-2 left-2 h-2 w-2 rounded-bl-sm border-b border-l border-white/50"></div>
            <div className="absolute bottom-2 right-2 h-2 w-2 rounded-br-sm border-b border-r border-white/50"></div>
          </div>

          {/* Simluated Tracking Dots */}
          <div className="absolute left-1/4 top-1/3 h-2 w-2 rounded-full bg-white/30 blur-[1px]"></div>
          <div className="absolute bottom-1/3 right-1/4 h-1.5 w-1.5 rounded-full bg-white/20 blur-[1px]"></div>
        </div>

        {/* Footer: Instructions */}
        <div className="flex w-full justify-center p-6 pb-12">
          <div className="animate-fade-in-up border-primary/30 bg-background-dark/90 w-full max-w-sm rounded-xl border-t p-4 shadow-xl backdrop-blur-md">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="bg-primary/10 mb-1 flex h-8 w-8 items-center justify-center rounded-full">
                <span className="material-symbols-outlined text-primary animate-pulse">
                  videocam
                </span>
              </div>
              <p className="text-sm font-light leading-relaxed tracking-wide text-white">
                {isFound ? (
                  <span className="text-primary font-bold">Đã tìm thấy mảnh ghép!</span>
                ) : (
                  <>
                    Di chuyển camera để quét các{' '}
                    <span className="text-primary font-medium">mảnh ghép ký ức</span>
                  </>
                )}
              </p>
              {/* Progress Dots */}
              <div className="mt-1 flex gap-1">
                <div className="bg-primary h-1 w-1 rounded-full"></div>
                <div className="h-1 w-1 rounded-full bg-white/20"></div>
                <div className="h-1 w-1 rounded-full bg-white/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scanMove {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        .animate-scan-move {
          animation: scanMove 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
