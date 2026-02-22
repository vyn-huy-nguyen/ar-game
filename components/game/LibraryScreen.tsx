'use client';

import React from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';
import { useTranslations } from 'next-intl';

const MEMORIES = [
  { id: 'o-quan-chuong', icon: 'fort' },
  { id: 'hang-ngang', icon: 'menu_book' },
  { id: 'hang-buom', icon: 'sailing' },
  { id: 'hang-dong', icon: 'notifications' },
  { id: 'hang-bac', icon: 'diamond' },
  { id: 'dong-xuan', icon: 'storefront' },
  { id: 'hang-trong', icon: 'image' },
  { id: 'lan-ong', icon: 'local_florist' },
];

export default function LibraryScreen() {
  const { setCurrentScreen, unlockedMemories } = useGame();
  const t = useTranslations('game');

  return (
    <div className="font-body relative h-[100dvh] w-full overflow-hidden bg-[#0b1120] text-white">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#111827] via-[#0b1120] to-[#0b1120]"></div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="animate-particle-float absolute rounded-full bg-primary opacity-0 shadow-[0_0_6px_#f9d406]"
            style={{
              width: `${Math.random() * 3 + 1.5}px`,
              height: `${Math.random() * 3 + 1.5}px`,
              left: `${Math.random() * 100}%`,
              top: `${80 + Math.random() * 20}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-md flex-col">
        {/* Header */}
        <header className="flex shrink-0 items-center px-5 pb-3 pt-[calc(env(safe-area-inset-top)+1.25rem)]">
          <button
            onClick={() => setCurrentScreen('arrival')}
            className="group flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-primary"
          >
            <span className="material-symbols-outlined text-[22px] transition-transform group-hover:-translate-x-0.5">
              arrow_back
            </span>
          </button>
          <h1 className="flex-grow text-center font-display text-[1.4rem] font-extrabold uppercase tracking-[0.12em] text-primary drop-shadow-[0_2px_8px_rgba(249,212,6,0.3)]">
            {t('library_title')}
          </h1>
          <div className="w-10"></div>
        </header>

        {/* Divider */}
        <div className="mx-5 mb-3 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"></div>

        {/* Scrollable Grid */}
        <main className="library-scroll flex-grow overflow-y-auto px-4 pb-[calc(env(safe-area-inset-bottom)+2rem)]">
          <div className="grid grid-cols-2 gap-3.5 pb-4">
            {MEMORIES.map((memory, index) => {
              const isUnlocked = unlockedMemories.includes(memory.id);

              if (isUnlocked) {
                return (
                  <div
                    key={memory.id}
                    className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-primary/25 bg-[#151d2e]/80 p-5 text-center shadow-[0_2px_16px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(249,212,6,0.08)]"
                  >
                    {/* Checkmark badge */}
                    <div className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]">
                      <span className="material-symbols-outlined text-[14px] font-bold text-white">
                        check
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-[#1a2540] shadow-inner">
                      <span className="material-symbols-outlined text-[30px] text-primary drop-shadow-[0_0_6px_rgba(249,212,6,0.4)]">
                        {memory.icon}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="mb-0.5 line-clamp-2 min-h-[2.5rem] font-display text-[0.85rem] font-bold leading-tight text-white">
                      {t(`locations.${memory.id}.fullName`)}
                    </h3>
                    <span className="mb-3 text-[9px] font-bold uppercase tracking-[0.15em] text-white/40">
                      MẢNH GHÉP #{String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Download button */}
                    <button className="bg-primary/8 mt-auto flex w-full items-center justify-center gap-1.5 rounded-lg border border-primary/25 px-3 py-2 text-primary transition-all duration-200 hover:bg-primary hover:text-[#0b1120]">
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      <span className="text-[11px] font-bold tracking-wide">
                        {t('download_pdf')}
                      </span>
                    </button>
                  </div>
                );
              }

              // Locked card
              return (
                <div
                  key={memory.id}
                  className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111827]/70 p-5 text-center shadow-[0_2px_12px_rgba(0,0,0,0.3)] backdrop-blur-sm"
                >
                  {/* Lock icon */}
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.08] bg-[#1a2036]/80">
                    <span className="material-symbols-outlined text-[28px] text-white/20">
                      lock
                    </span>
                  </div>

                  {/* Name - visible even when locked */}
                  <h3 className="mb-0.5 line-clamp-2 min-h-[2.5rem] font-display text-[0.85rem] font-bold leading-tight text-white/60">
                    {t(`locations.${memory.id}.fullName`)}
                  </h3>
                  <span className="mb-3 text-[9px] font-bold uppercase tracking-[0.15em] text-white/25">
                    {t('locked').toUpperCase()}
                  </span>

                  {/* Locked download placeholder */}
                  <div className="mt-auto flex h-9 w-full items-center justify-center rounded-lg border border-dashed border-white/[0.08] bg-white/[0.02]">
                    <span className="material-symbols-outlined text-[14px] text-white/15">
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
        .library-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .library-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .library-scroll::-webkit-scrollbar-thumb {
          background: rgba(249, 212, 6, 0.2);
          border-radius: 4px;
        }
        @keyframes particle-float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          15% {
            opacity: 0.6;
          }
          85% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-120px) translateX(15px);
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
