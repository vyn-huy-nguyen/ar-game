'use client';

import React, { useMemo } from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';
import { useTranslations } from 'next-intl';

// Background images per location
const LOCATION_BG: Record<string, string> = {
  'o-quan-chuong':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC4MLT-Sf2ajhapj7lnhs_TrXrwHE5gkbX0phBDDWtO21uljx7PjGzNyq9Kb8lDEIv4X-IKe9qtlrFmkufN6i05o8zpV2YRl1atFwOsus5VmyJrWIqcLHAhfpv2IxqVbEAmkm-G7NRtg6d-pdbFHJVKqNwgFxM9OVS90EJXWcNexxkTVwa0MbELMmTawxo2L8ckCfHaLO5j1C4v-RA1owOG6LPXGK2HXYvKcPapYAOEWjv-I93tOrnkI2jXmom0yr-QP6_3q8Upvhsl',
};

const DEFAULT_BG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDkYYgAtSHck1GUzYNJCg7rS9rPKGfGzLoUvy1wZ422LNEoo_hSLKt0sbpMYoKdYvpHBJBW1E1lZvWLDNcPDnK9_2I0xz002BO-nP2e6RnXbn3Z-OHDqFw5bLSQ8WLVA1xln8A4zkPAuWLq4dE4US_lIvWr55USKSExWFZd2H3YacVa7U1I50S1I0N2L-mMFxBO70uhmXbEQHdjqd0xxr5JnzpsJjb-fh4JOkDOwgBFqaggPgQYGyqZeNqaGNPXpgSKRX4xTbD9R8ne';

// Location order for the memory index
const LOCATION_ORDER = [
  'o-quan-chuong',
  'hang-ngang',
  'hang-buom',
  'hang-dong',
  'hang-bac',
  'dong-xuan',
  'hang-trong',
  'lan-ong',
];

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

  const bgUrl = useMemo(() => {
    return LOCATION_BG[locId] || DEFAULT_BG;
  }, [locId]);

  const memoryIndex = LOCATION_ORDER.indexOf(locId) + 1;

  const handleContinue = () => {
    if (currentLocationId) {
      unlockMemory(currentLocationId);
    }
    setCurrentScreen('collected');
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-background-dark font-display text-white">
      {/* Full Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Historical Overlay — Architectural SVG */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <svg
          className="h-full w-full max-w-4xl animate-pulse-glow opacity-90"
          fill="none"
          viewBox="0 0 800 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            className="stroke-primary"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            style={{ filter: 'drop-shadow(0 0 8px #f9d406)' }}
          >
            {/* Main arch */}
            <path
              d="M250 550 L250 350 C250 280 300 250 400 250 C500 250 550 280 550 350 L550 550"
              strokeWidth="2"
            />
            <path
              d="M270 550 L270 360 C270 300 310 270 400 270 C490 270 530 300 530 360 L530 550"
              strokeDasharray="5 5"
            />
            {/* Left wing */}
            <path d="M100 550 L100 400 C100 360 120 340 175 340 C230 340 250 360 250 400 L250 550" />
            <path d="M100 340 L100 280 L250 280" />
            {/* Right wing */}
            <path d="M550 550 L550 400 C550 360 570 340 625 340 C680 340 700 360 700 400 L700 550" />
            <path d="M550 280 L700 280 L700 340" />
            {/* Roof */}
            <path d="M300 250 L300 180 L500 180 L500 250" />
            <path d="M280 180 L520 180 L400 120 L280 180" />
            {/* Roof details */}
            <path d="M350 180 L350 220 M450 180 L450 220" strokeOpacity="0.6" />
            {/* Side details */}
            <path d="M150 450 L200 450 M600 450 L650 450" strokeOpacity="0.3" />
            <path d="M300 400 L350 400 M450 400 L500 400" strokeOpacity="0.3" />
            {/* Ground lines */}
            <path d="M200 580 L600 580 M150 590 L650 590" strokeOpacity="0.2" />
          </g>
        </svg>

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="particle absolute left-[20%] top-[60%] h-1 w-1 animate-particle-rise"></div>
          <div
            className="particle absolute left-[50%] top-[50%] h-1.5 w-1.5 animate-particle-rise"
            style={{ animationDelay: '1.2s' }}
          ></div>
          <div
            className="particle absolute left-[70%] top-[55%] h-0.5 w-0.5 animate-particle-rise"
            style={{ animationDelay: '0.5s' }}
          ></div>
          <div
            className="particle absolute left-[35%] top-[65%] h-1 w-1 animate-particle-rise"
            style={{ animationDelay: '2.1s' }}
          ></div>
          <div
            className="particle absolute left-[80%] top-[45%] h-1 w-1 animate-particle-rise"
            style={{ animationDelay: '1.5s' }}
          ></div>
          <div
            className="particle absolute left-[45%] top-[40%] h-2 w-2 animate-particle-rise bg-white blur-[1px]"
            style={{ animationDelay: '0.8s' }}
          ></div>
        </div>
      </div>

      {/* Main UI Container */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between">
        {/* Header */}
        <div className="pointer-events-auto flex w-full items-start justify-between p-6">
          <button
            onClick={() => setCurrentScreen('quiz')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-black/40"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          {/* Location Badge */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 backdrop-blur-md">
            <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
            <span className="text-xs font-medium uppercase tracking-wide text-white/90">
              {data.name}
            </span>
          </div>
        </div>

        {/* Bottom Narrative Panel */}
        <div className="pointer-events-auto w-full px-6 pb-8">
          <div className="glass-panel relative w-full overflow-hidden rounded-xl p-6">
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>

            <div className="flex flex-col gap-4">
              <div className="relative z-10">
                {/* Narrative text — using font-display (Noto Serif) with italic */}
                <p className="text-glow text-xl font-light italic leading-relaxed text-white/95 md:text-2xl">
                  &quot;{data.narrative}&quot;
                </p>
                {/* Memory label */}
                <p className="font-body mt-2 text-xs font-semibold uppercase tracking-widest text-primary/80">
                  {t('fact.label')} #{String(memoryIndex).padStart(2, '0')} •{' '}
                  {t('arrival.discovered')}
                </p>
              </div>

              {/* Continue button */}
              <div className="mt-2 flex items-center justify-end">
                <button
                  onClick={handleContinue}
                  className="group/btn flex cursor-pointer items-center gap-3 transition-all hover:translate-x-1"
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

            {/* Corner decorations */}
            <div className="absolute bottom-2 left-2 h-3 w-3 rounded-bl-sm border-b border-l border-white/20"></div>
            <div className="absolute right-2 top-2 h-3 w-3 rounded-tr-sm border-r border-t border-white/20"></div>
          </div>
        </div>
      </div>

      {/* Film grain overlay */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] opacity-10"></div>

      <style jsx>{`
        .glass-panel {
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
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
          position: absolute;
          background-color: #f9d406;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
