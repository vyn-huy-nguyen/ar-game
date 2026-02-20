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
    <div className="bg-background-dark font-display selection:bg-primary selection:text-background-dark relative h-[100dvh] w-full overflow-hidden text-white">
      {/* Cinematic Background Wrapper */}
      <div className="bg-background-dark to-background-dark absolute inset-0 z-0 bg-gradient-to-b from-[#1a1c2e] opacity-95 mix-blend-multiply"></div>

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
          className="animate-float bg-primary absolute rounded-full opacity-30"
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
        <header className="flex items-center justify-between py-2 opacity-80 transition-opacity hover:opacity-100">
          <button
            onClick={toggleLanguage}
            className="text-primary/80 hover:border-primary hover:text-primary border-b border-transparent pb-0.5 text-sm font-bold uppercase tracking-widest transition-colors"
          >
            {locale === 'vi' ? 'Tiếng Việt / English' : 'English / Tiếng Việt'}
          </button>
          <button className="text-primary/80 hover:text-primary flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/5">
            <span className="material-symbols-outlined text-2xl">volume_up</span>
          </button>
        </header>

        {/* Main Content: Title & Imagery */}
        <main className="flex flex-grow flex-col items-center justify-center space-y-12 text-center">
          {/* Decorative Icon */}
          <div className="animate-float border-primary/20 bg-primary/5 mb-4 flex h-20 w-20 items-center justify-center rounded-full border backdrop-blur-sm">
            <span className="material-symbols-outlined text-primary text-4xl">temple_buddhist</span>
          </div>

          <div className="space-y-8">
            <h1 className="bg-gradient-to-b from-[#fffbe6] to-[#d4d4d4] bg-clip-text text-4xl font-black uppercase leading-normal tracking-widest text-transparent drop-shadow-lg md:text-5xl">
              {t('title')}
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 px-8 opacity-80">
              <div className="via-primary/60 h-[1px] w-16 bg-gradient-to-r from-transparent to-transparent"></div>
              <div className="bg-background-dark border-primary h-2 w-2 rotate-45 border shadow-[0_0_10px_rgba(249,212,6,0.5)]"></div>
              <div className="via-primary/60 h-[1px] w-16 bg-gradient-to-r from-transparent to-transparent"></div>
            </div>

            <h2 className="text-primary text-5xl font-black uppercase leading-normal tracking-tight drop-shadow-[0_2px_10px_rgba(249,212,6,0.3)] md:text-6xl">
              {t('subtitle')}
            </h2>

            <p className="font-display mt-6 border-t border-white/5 pt-8 text-sm uppercase tracking-[0.3em] text-gray-400">
              {t('legend')}
            </p>
          </div>
        </main>

        {/* Footer: CTA & Info */}
        <footer className="flex flex-col items-center space-y-6">
          {/* Primary CTA Button */}
          <button
            onClick={handleStart}
            className="animate-pulse-glow bg-primary text-background-dark shadow-primary/20 border-primary/50 group relative h-14 w-full max-w-[320px] overflow-hidden rounded-lg border shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 flex translate-x-[-150%] items-center justify-center bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[150%]"></div>
            <div className="relative flex items-center justify-center gap-3 text-lg font-bold uppercase tracking-wide">
              <span>{t('start')}</span>
              <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </div>
          </button>

          {/* Bottom Credits */}
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500/60">
            {t('credits')}
          </div>
        </footer>
      </div>
    </div>
  );
}
