/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LandingScreen() {
  const { setCurrentScreen, resetGame } = useGame();
  const t = useTranslations('game');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleStart = () => {
    resetGame();
    setCurrentScreen('map');
  };

  const toggleLanguage = () => {
    const nextLocale = locale === 'vi' ? 'en' : 'vi';
    // Replace the locale part of the pathname
    const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPathname || `/${nextLocale}/game`);
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-background-dark font-display text-white selection:bg-primary selection:text-background-dark">
      {/* Cinematic Background Wrapper */}
      <div className="absolute inset-0 z-0 bg-background-dark bg-gradient-to-b from-[#1a1c2e] to-background-dark opacity-95 mix-blend-multiply"></div>

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
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float rounded-full bg-primary opacity-30"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + (i % 2) === 0 ? 1 : 2}px`,
            animationDuration: `${Math.random() * 10 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      ))}

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col justify-between px-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-[calc(env(safe-area-inset-top)+1rem)]">
        {/* Header: Utilities */}
        <header className="flex items-center justify-between py-2">
          {/* Enhanced Language Switcher */}
          <div className="relative flex items-center rounded-full border border-primary/20 bg-background-dark/40 p-1 backdrop-blur-md">
            <div
              className={`absolute h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full bg-primary/20 shadow-[0_0_15px_rgba(249,212,6,0.2)] ring-1 ring-primary/40 transition-all duration-300 ease-out ${locale === 'vi' ? 'translate-x-0' : 'translate-x-full'
                }`}
            />
            <button
              onClick={() => locale !== 'vi' && toggleLanguage()}
              className={`relative z-10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${locale === 'vi' ? 'text-primary' : 'text-white/40 hover:text-white/70'
                }`}
            >
              TIẾNG VIỆT
            </button>
            <button
              onClick={() => locale !== 'en' && toggleLanguage()}
              className={`relative z-10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${locale === 'en' ? 'text-primary' : 'text-white/40 hover:text-white/70'
                }`}
            >
              ENGLISH
            </button>
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-full text-primary/80 transition-colors hover:bg-white/5 hover:text-primary">
            <span className="material-symbols-outlined drop-shadow-glow text-2xl">volume_up</span>
          </button>
        </header>

        {/* Main Content: Title & Imagery */}
        <main className="flex flex-grow flex-col items-center justify-center space-y-12 text-center">
          {/* Decorative Icon */}
          <div className="mb-4 flex h-20 w-20 animate-float items-center justify-center rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
            <span className="material-symbols-outlined text-4xl text-primary">temple_buddhist</span>
          </div>

          <div className="space-y-8">
            <h1 className="bg-gradient-to-b from-[#fffbe6] to-[#d4d4d4] bg-clip-text font-display text-4xl font-black uppercase leading-normal tracking-widest text-transparent drop-shadow-lg md:text-5xl">
              {t('title')}
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 px-8 opacity-80">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
              <div className="h-2 w-2 rotate-45 border border-primary bg-background-dark shadow-[0_0_10px_rgba(249,212,6,0.5)]"></div>
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
            </div>

            <h2 className="font-display text-5xl font-black uppercase leading-normal tracking-tight text-primary drop-shadow-[0_2px_10px_rgba(249,212,6,0.3)] md:text-6xl">
              {t('subtitle')}
            </h2>

            <p className="font-body mt-6 border-t border-white/5 pt-8 text-sm uppercase tracking-[0.3em] text-gray-400">
              {t('legend')}
            </p>
          </div>
        </main>

        {/* Footer: CTA & Info */}
        <footer className="flex flex-col items-center space-y-6">
          {/* Primary CTA Button */}
          <button
            onClick={handleStart}
            className="group relative h-14 w-full max-w-[320px] animate-pulse-glow overflow-hidden rounded-lg border border-primary/50 bg-primary text-background-dark shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 flex translate-x-[-150%] items-center justify-center bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[150%]"></div>
            <div className="relative flex items-center justify-center gap-3 text-lg font-bold uppercase tracking-wide">
              <span>{t('start')}</span>
              <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </div>
          </button>
        </footer>
      </div>
    </div>
  );
}
