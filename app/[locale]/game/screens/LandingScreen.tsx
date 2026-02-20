/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { useGame } from '../GameContext';
import { useTranslations } from 'next-intl';

export default function LandingScreen() {
  const { setCurrentScreen } = useGame();
  const t = useTranslations('game');

  return (
    <div className="bg-landing-bg font-display selection:bg-landing-primary selection:text-landing-bg relative h-screen w-full overflow-hidden text-white">
      {/* Cinematic Background Wrapper */}
      <div className="bg-landing-bg to-landing-bg absolute inset-0 z-0 bg-gradient-to-b from-[#1a1c2e] opacity-90 mix-blend-multiply"></div>

      {/* Particle background simulation */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
              radial-gradient(circle at 15% 50%, rgba(249, 212, 6, 0.08) 0%, transparent 20%),
              radial-gradient(circle at 85% 30%, rgba(249, 212, 6, 0.05) 0%, transparent 25%),
              radial-gradient(circle at 50% 80%, rgba(249, 212, 6, 0.06) 0%, transparent 30%)
          `,
        }}
      ></div>

      {/* Dust Particles (Decorative) */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="animate-float bg-landing-primary absolute rounded-full opacity-30"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            animationDuration: `${Math.random() * 10 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      ))}

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col justify-between p-6">
        {/* Header: Utilities */}
        <header className="flex items-center justify-between py-4 opacity-80 transition-opacity hover:opacity-100">
          <button className="text-landing-primary/80 hover:border-landing-primary hover:text-landing-primary border-b border-transparent pb-0.5 text-sm font-bold uppercase tracking-widest transition-colors">
            VN / EN
          </button>
          <button className="text-landing-primary/80 hover:text-landing-primary flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/5">
            <span className="material-symbols-outlined text-2xl">volume_up</span>
          </button>
        </header>

        {/* Main Content: Title & Imagery */}
        <main className="flex flex-grow flex-col items-center justify-center space-y-12 text-center">
          {/* Decorative Icon */}
          <div className="animate-float border-landing-primary/20 bg-landing-primary/5 mb-4 flex h-16 w-16 items-center justify-center rounded-full border backdrop-blur-sm">
            <span className="material-symbols-outlined text-landing-primary text-3xl">
              hourglass_empty
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="bg-gradient-to-b from-[#fffbe6] to-[#d4d4d4] bg-clip-text text-5xl font-black leading-none tracking-tight text-transparent drop-shadow-lg md:text-6xl">
              Hà Nội
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 px-8">
              <div className="via-landing-primary/50 h-[1px] w-12 bg-gradient-to-r from-transparent to-transparent"></div>
              <div className="bg-landing-primary h-1.5 w-1.5 rotate-45"></div>
              <div className="via-landing-primary/50 h-[1px] w-12 bg-gradient-to-r from-transparent to-transparent"></div>
            </div>

            <h2 className="text-lg font-medium uppercase leading-relaxed tracking-widest text-gray-300/90 md:text-xl">
              Những Mảnh Ghép
              <br />
              <span className="text-landing-primary/80">Thời Gian</span>
            </h2>
          </div>
        </main>

        {/* Footer: CTA & Info */}
        <footer className="flex flex-col items-center space-y-8 pb-8">
          {/* Primary CTA Button */}
          <button
            onClick={() => setCurrentScreen('map')}
            className="animate-pulse-glow bg-landing-primary text-background-dark shadow-landing-primary/20 group relative h-14 w-full max-w-[320px] overflow-hidden rounded-lg shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 flex translate-x-[-150%] items-center justify-center bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[150%]"></div>
            <div className="relative flex items-center justify-center gap-3 text-lg font-bold uppercase tracking-wide">
              <span>Bắt đầu hành trình</span>
              <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </div>
          </button>

          {/* Bottom Credits */}
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500/60">
            © 2026 Hanoi Memories Studio
          </div>
        </footer>
      </div>
    </div>
  );
}
