'use client';

import React from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';
import { useTranslations } from 'next-intl';

const MEMORIES = [
  { id: 'ho-guom', icon: 'castle' },
  { id: 'o-quan-chuong', icon: 'castle' },
  { id: 'hang-buom', icon: 'sailing' },
  { id: 'hang-dong', icon: 'notifications' },
  { id: 'hang-trong', icon: 'image' },
  { id: 'lan-ong', icon: 'local_florist' },
  { id: 'dong-xuan', icon: 'storefront' },
  { id: 'hang-ma', icon: 'local_fire_department' },
];

export default function LibraryScreen() {
  const { setCurrentScreen, unlockedMemories } = useGame();
  const t = useTranslations('game');

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-background-dark font-display text-white">
      {/* Background Gradients & Particles */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-background-dark to-background-dark"></div>
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-particle-float absolute rounded-full bg-primary opacity-0 shadow-[0_0_4px_#f9d406]"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${90 + Math.random() * 10}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-md flex-col">
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between px-6 pb-2 pt-6">
          <button
            onClick={() => setCurrentScreen('arrival')}
            className="group flex items-center gap-2 text-white/80 transition-colors hover:text-primary"
          >
            <span className="material-symbols-outlined text-[24px] transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            <span className="hidden text-sm font-medium tracking-wide sm:inline">
              {t('navigation.back')}
            </span>
          </button>
          <h1 className="gold-gradient-text flex-grow pr-8 text-center text-2xl font-bold uppercase tracking-wide md:text-3xl">
            {t('library_title')}
          </h1>
        </header>

        <div className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

        {/* Scrollable Content */}
        <main className="custom-scrollbar flex-grow overflow-y-auto px-6 pb-24 pt-2">
          <div className="grid grid-cols-2 gap-4 pb-8">
            {MEMORIES.map((memory, index) => {
              const isUnlocked = unlockedMemories.includes(memory.id);
              if (isUnlocked) {
                return (
                  <div
                    key={memory.id}
                    className="card-glass group relative flex flex-col items-center gap-3 overflow-hidden rounded-xl p-4 text-center transition-all hover:border-primary/40 hover:shadow-[0_0_15px_rgba(249,212,6,0.1)]"
                  >
                    <div className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-bl-xl bg-primary/10 text-primary">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-slate-800 transition-transform duration-300 group-hover:scale-110">
                      <span className="material-symbols-outlined text-[28px] text-primary">
                        {memory.icon}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h3 className="line-clamp-1 text-sm font-semibold text-white">
                        {t(`locations.${memory.id}.name`)}
                      </h3>
                      <span className="text-[10px] uppercase tracking-wider text-white/50">
                        {t('found_fragment')} #{String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <button className="group/btn mt-auto flex w-full items-center justify-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-primary transition-all hover:bg-primary hover:text-background-dark">
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      <span className="text-xs font-bold">{t('download_pdf')}</span>
                    </button>
                  </div>
                );
              }
              return (
                <div
                  key={memory.id}
                  className="card-locked relative flex flex-col items-center gap-3 overflow-hidden rounded-xl p-4 text-center opacity-75"
                >
                  <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-slate-800/50">
                    <span className="material-symbols-outlined text-[24px] text-white/20">
                      lock
                    </span>
                  </div>
                  <div className="flex w-full flex-col items-center gap-0.5">
                    <div className="mb-1 h-4 w-2/3 rounded bg-white/10"></div>
                    <span className="text-[10px] uppercase tracking-wider text-white/30">
                      {t('locked')}
                    </span>
                  </div>
                  <div className="mt-auto flex h-8 w-full items-center justify-center rounded-lg border border-dashed border-white/10 bg-white/5">
                    <span className="material-symbols-outlined text-[16px] text-white/20">
                      lock
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      <style jsx>{`
        .gold-gradient-text {
          background: linear-gradient(to bottom, #f9d406, #dcb805);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
        }
        .card-glass {
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(249, 212, 6, 0.15);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
        .card-locked {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(249, 212, 6, 0.3);
          border-radius: 4px;
        }
        @keyframes particle-float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          20% {
            opacity: 0.5;
          }
          80% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0;
          }
        }
        .animate-particle-float {
          animation: particle-float 10s linear infinite;
        }
      `}</style>
    </div>
  );
}
