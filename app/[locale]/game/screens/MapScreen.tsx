/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect, useRef } from 'react';
import { useGame } from '../GameContext';

// Hardcoded locations based on the HTML
const LOCATIONS = [
  {
    id: 'ho-guom',
    name: 'Hồ Hoàn Kiếm',
    top: '50%',
    left: '50%',
    icon: 'temple_buddhist',
    type: 'center',
  },
  { id: 'o-quan-chuong', name: 'Ô Quan Chưởng', top: '15%', left: '50%', icon: 'fort' },
  { id: 'hang-buom', name: 'Hàng Buồm', top: '25%', left: '80%', icon: 'sailing' },
  { id: 'hang-dong', name: 'Hàng Đồng', top: '50%', left: '90%', icon: 'notifications' },
  { id: 'hang-trong', name: 'Hàng Trống', top: '75%', left: '80%', icon: 'image' },
  { id: 'lan-ong', name: 'Lãn Ông', top: '85%', left: '50%', icon: 'local_florist' },
  { id: 'dong-xuan', name: 'Đồng Xuân', top: '75%', left: '20%', icon: 'storefront' },
  { id: 'hang-ma', name: 'Hàng Mã', top: '50%', left: '10%', icon: 'local_fire_department' },
  { id: 'hang-ngang', name: 'Hàng Ngang', top: '25%', left: '20%', icon: 'menu_book' },
];

export default function MapScreen() {
  const { setCurrentScreen, setCurrentLocationId, unlockedMemories } = useGame();
  const firefliesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Determine fireflies
    if (firefliesRef.current) {
      const container = firefliesRef.current;
      container.innerHTML = '';
      const fireflyCount = 20;

      for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'absolute rounded-full bg-primary-glow blur-[1px] animate-fly';

        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const animDuration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        const moveX = (Math.random() - 0.5) * 200;
        const moveY = (Math.random() - 0.5) * 200;

        firefly.style.left = `${left}%`;
        firefly.style.top = `${top}%`;
        firefly.style.width = `${size}px`;
        firefly.style.height = `${size}px`;
        firefly.style.animationDuration = `${animDuration}s`;
        firefly.style.animationDelay = `${delay}s`;
        firefly.style.setProperty('--x', `${moveX}px`);
        firefly.style.setProperty('--y', `${moveY}px`);

        container.appendChild(firefly);
      }
    }
  }, []);

  const handleLocationClick = (id: string) => {
    if (id === 'ho-guom') return; // Center point
    setCurrentLocationId(id);
    setCurrentScreen('arrival');
  };

  return (
    <div className="bg-background-light font-body selection:bg-primary selection:text-background-dark dark:bg-background-dark relative min-h-screen w-full overflow-hidden text-white">
      {/* Background Gradients */}
      <div className="from-navy-mid via-background-dark pointer-events-none fixed inset-0 z-0 bg-gradient-to-b to-black"></div>
      <div
        ref={firefliesRef}
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      ></div>

      <div className="relative z-10 mx-auto flex h-screen w-full max-w-md flex-col">
        {/* Header */}
        <header className="relative flex-none px-6 pb-2 pt-6 text-center">
          <div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full bg-gradient-to-b from-black/60 to-transparent"></div>
          <div className="relative z-10">
            <p className="text-primary font-display mb-1 text-xs uppercase tracking-[0.2em] opacity-80">
              Historical Puzzle Game
            </p>
            <h1 className="from-primary-glow via-primary to-primary-glow font-display bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent drop-shadow-md md:text-3xl">
              Hà Nội
            </h1>
            <p className="font-display mt-1 inline-block border-b border-white/10 pb-4 text-sm tracking-widest text-white/90">
              Những Mảnh Ghép Thời Gian
            </p>
          </div>
          {/* Progress */}
          <div className="border-primary/30 absolute right-4 top-6 flex items-center space-x-2 rounded-full border bg-black/40 px-3 py-1 backdrop-blur-sm">
            <span className="material-symbols-outlined text-primary text-sm">stars</span>
            <span className="text-primary-glow text-xs font-bold">{unlockedMemories.length}/8</span>
          </div>
        </header>

        {/* Map Area */}
        <main className="relative flex w-full flex-grow items-center justify-center overflow-hidden px-4">
          <div className="relative aspect-square w-full max-w-[400px]">
            {/* SVG Path Circle */}
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              viewBox="0 0 400 400"
            >
              <defs>
                <filter height="140%" id="glow" width="140%" x="-20%" y="-20%">
                  <feGaussianBlur result="blur" stdDeviation="3"></feGaussianBlur>
                  <feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
                </filter>
              </defs>
              <ellipse
                cx="200"
                cy="200"
                rx="160"
                ry="140"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeDasharray="10"
                strokeOpacity="0.6"
                className="animate-[dash_30s_linear_infinite]"
                style={{ filter: 'drop-shadow(0 0 4px #F9E79F)' }}
              ></ellipse>
            </svg>

            {/* Nodes */}
            {LOCATIONS.map((loc) => {
              const isUnlocked = unlockedMemories.includes(loc.id);
              // Center Node Special Styling
              if (loc.type === 'center') {
                return (
                  <div
                    key={loc.id}
                    className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-32 w-40 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center"
                  >
                    <div className="bg-primary/20 animate-pulse-slow absolute inset-0 rounded-full blur-3xl"></div>
                    <div className="group relative z-20 flex flex-col items-center">
                      <div className="to-navy-light/80 border-primary/50 relative flex h-20 w-20 items-center justify-center rounded-lg border bg-gradient-to-t from-black/80 shadow-[0_0_30px_rgba(212,175,55,0.3)] backdrop-blur-sm">
                        <span className="material-symbols-outlined text-primary text-4xl drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">
                          {loc.icon}
                        </span>
                        <div className="border-primary/20 absolute -bottom-4 h-8 w-32 rounded-[100%] border-t bg-blue-500/10 blur-sm"></div>
                      </div>
                      <span className="font-display text-primary-glow border-primary/20 mt-3 rounded border bg-black/60 px-2 py-0.5 text-[10px] uppercase tracking-widest backdrop-blur-md">
                        {loc.name}
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={loc.id}
                  onClick={() => handleLocationClick(loc.id)}
                  className={`group absolute -translate-x-1/2 -translate-y-1/2 transform transition-all duration-300 hover:scale-110 active:scale-95`}
                  style={{ top: loc.top, left: loc.left }}
                  aria-label={`Visit ${loc.name}`}
                >
                  {/* Specific styling per node type usually, but generalizing for loop */}
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-colors
                            ${
                              isUnlocked
                                ? 'bg-primary border-primary text-background-dark'
                                : 'bg-navy-mid group-hover:border-primary group-hover:text-primary border border-white/30 text-white/70'
                            }
                            ${loc.id === 'hang-dong' ? 'border-primary animate-float h-14 w-14 border-2 bg-gradient-to-br from-[#4a3b18] to-black shadow-[0_0_20px_rgba(212,175,55,0.6)]' : ''}
                            ${loc.id === 'o-quan-chuong' ? 'from-navy-light border-primary/60 h-12 w-12 border bg-gradient-to-br to-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : ''}
                            ${loc.id === 'dong-xuan' ? 'h-11 w-11 border border-red-500/50 bg-gradient-to-br from-red-900/40 to-black shadow-[0_0_10px_rgba(200,50,50,0.3)]' : ''}
                             ${loc.id === 'hang-ngang' ? 'border-primary h-12 w-12 border bg-gradient-to-b from-[#2a1a00] to-black shadow-[0_0_15px_rgba(212,175,55,0.5)]' : ''}
                        `}
                  >
                    {loc.id === 'o-quan-chuong' && (
                      <div className="bg-primary/30 absolute -inset-1 animate-pulse rounded-full blur"></div>
                    )}

                    <span
                      className={`material-symbols-outlined text-lg ${loc.id === 'hang-dong' ? 'text-primary-glow text-2xl' : ''}`}
                    >
                      {isUnlocked ? 'check' : loc.icon}
                    </span>
                  </div>

                  <span
                    className={`absolute left-1/2 top-full mt-1 w-max -translate-x-1/2 rounded px-1 text-[9px] transition-opacity
                             ${isUnlocked ? 'text-primary bg-black/70 font-bold' : 'bg-black/70 text-white/80 opacity-0 group-hover:opacity-100'}
                             ${loc.id === 'hang-dong' ? '!text-primary-glow font-display !bottom-6 !top-auto bg-transparent !text-[10px] !opacity-100' : ''}
                             
                        `}
                  >
                    {loc.name}
                  </span>
                </button>
              );
            })}
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-20 flex-none bg-gradient-to-t from-black to-transparent px-6 pb-8 pt-4">
          <div className="mb-4 text-center">
            <p className="text-primary/80 font-serif text-xs italic">
              &quot;The bell echoes from the ancient guild...&quot;
            </p>
          </div>
          <div className="bg-navy-mid relative h-3 w-full overflow-hidden rounded-full border border-white/10 shadow-inner">
            <div
              className="via-primary to-primary-glow absolute left-0 top-0 h-full bg-gradient-to-r from-[#8a6e1e] shadow-[0_0_10px_rgba(212,175,55,0.8)]"
              style={{ width: `${(unlockedMemories.length / 8) * 100}%` }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between text-[10px] font-bold uppercase tracking-wider text-white/40">
            <span>Hành trình ký ức</span>
            <span>{Math.round((unlockedMemories.length / 8) * 100)}% Hoàn thành</span>
          </div>
          <button className="from-primary/10 to-primary/30 border-primary text-primary font-display hover:bg-primary mt-6 w-full rounded-lg border bg-gradient-to-r py-3 font-bold uppercase tracking-[0.15em] shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-300 hover:text-black">
            Continue Journey
          </button>
        </footer>

        {/* Corner Accents */}
        <div className="border-primary/30 pointer-events-none absolute left-4 top-4 h-8 w-8 rounded-tl-lg border-l border-t"></div>
        <div className="border-primary/30 pointer-events-none absolute right-4 top-4 h-8 w-8 rounded-tr-lg border-r border-t"></div>
        <div className="border-primary/30 pointer-events-none absolute bottom-4 left-4 h-8 w-8 rounded-bl-lg border-b border-l"></div>
        <div className="border-primary/30 pointer-events-none absolute bottom-4 right-4 h-8 w-8 rounded-br-lg border-b border-r"></div>
      </div>

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 1000;
          }
        }
        @keyframes fly {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--x), var(--y));
            opacity: 0;
          }
        }
        .animate-fly {
          animation: fly 10s infinite;
        }
      `}</style>
    </div>
  );
}
