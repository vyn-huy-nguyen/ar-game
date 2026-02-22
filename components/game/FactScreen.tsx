'use client';

import React, { useMemo } from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';
import { useTranslations } from 'next-intl';

export default function FactScreen() {
  const { setCurrentScreen, currentLocationId, unlockMemory } = useGame();
  const t = useTranslations('game');

  const locId = currentLocationId || 'o-quan-chuong';
  const data = useMemo(() => {
    try {
      return t.raw(`locations.${locId}`);
    } catch {
      return t.raw('locations.o-quan-chuong');
    }
  }, [t, locId]);

  const handleContinue = () => {
    if (currentLocationId) {
      unlockMemory(currentLocationId);
    }
    setCurrentScreen('collected');
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-background-dark font-display text-white">
      {/* Background Hero Image with Simulation */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.image})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Historical Overlay Simulation */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-40">
        <svg
          className="h-full w-full max-w-4xl animate-pulse-glow"
          fill="none"
          viewBox="0 0 800 600"
        >
          <g
            className="stroke-primary"
            stroke-width="1.5"
            style={{ filter: 'drop-shadow(0 0 8px #f9d406)' }}
          >
            <path d="M100 500 L100 200 L400 50 L700 200 L700 500" />
            <path d="M300 150 L300 400 L500 400 L500 150 Z" />
            <path d="M0 550 C200 540, 600 540, 800 580" stroke-opacity="0.7" stroke-width="2" />
          </g>
        </svg>
      </div>

      {/* Particle System */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div className="particle absolute left-[20%] top-[60%] h-1 w-1 animate-particle-rise rounded-full bg-primary"></div>
        <div
          className="particle absolute left-[50%] top-[50%] h-1.5 w-1.5 animate-particle-rise rounded-full bg-primary"
          style={{ animationDelay: '1.2s' }}
        ></div>
        <div
          className="particle absolute left-[70%] top-[55%] h-0.5 w-0.5 animate-particle-rise rounded-full bg-primary"
          style={{ animationDelay: '0.5s' }}
        ></div>
      </div>

      {/* Main UI Container */}
      <div className="relative z-20 flex h-full flex-col justify-between px-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-[calc(env(safe-area-inset-top)+1rem)]">
        {/* Header */}
        <div className="flex w-full items-start justify-between py-2">
          <button
            onClick={() => setCurrentScreen('quiz')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-black/40"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          {/* Location Badge */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 backdrop-blur-md">
            <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
            <span className="text-xs font-medium uppercase leading-none tracking-wide text-white/90">
              {data.title}, 19-20th
            </span>
          </div>
        </div>

        {/* Bottom Narrative Area */}
        <div className="w-full">
          <div className="glass-panel group relative w-full overflow-hidden rounded-xl p-6">
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>
            <div className="flex flex-col gap-4">
              <div className="relative z-10">
                <p className="text-glow text-xl font-light italic leading-relaxed text-white/95 md:text-2xl">
                  &quot;{data.quiz.fact}&quot;
                </p>
                <p className="mt-2 font-sans text-xs font-semibold uppercase tracking-widest text-primary/80">
                  {t('fact.label')} • {t('arrival.discovered')}
                </p>
              </div>

              <div className="mt-2 flex justify-end">
                <button
                  onClick={handleContinue}
                  className="group/btn flex items-center gap-3 transition-all hover:translate-x-1"
                >
                  <span className="text-sm font-medium text-white/80 transition-colors group-hover/btn:text-white">
                    {t('continue')}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-[0_0_15px_rgba(249,212,6,0.4)] transition-all group-hover/btn:shadow-[0_0_20px_rgba(249,212,6,0.6)]">
                    <span className="material-symbols-outlined font-bold text-background-dark">
                      arrow_forward
                    </span>
                  </div>
                </button>
              </div>
            </div>

            <div className="absolute bottom-2 left-2 h-3 w-3 rounded-bl-sm border-b border-l border-white/20"></div>
            <div className="absolute right-2 top-2 h-3 w-3 rounded-tr-sm border-r border-t border-white/20"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glass-panel {
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }
        .text-glow {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.6;
            filter: drop-shadow(0 0 5px rgba(249, 212, 6, 0.3));
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 15px rgba(249, 212, 6, 0.8));
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        @keyframes particle-rise {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
          }
        }
        .animate-particle-rise {
          animation: particle-rise 4s linear infinite;
        }
        .particle {
          background-color: #f9d406;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}
