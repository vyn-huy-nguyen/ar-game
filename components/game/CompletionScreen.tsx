/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';
import { useTranslations } from 'next-intl';

export default function CompletionScreen() {
  const { setCurrentScreen } = useGame();
  const t = useTranslations('game');

  return (
    <div className="bg-background-dark font-display relative flex h-[100dvh] w-full flex-col justify-between overflow-hidden text-white">
      {/* Cinematic Background Wrapper */}
      <div className="bg-background-dark to-background-dark absolute inset-0 z-0 bg-gradient-to-b from-[#1a1c2e] opacity-95 mix-blend-multiply"></div>

      {/* Particle System Layer */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="animate-particle-rise bg-primary absolute rounded-full blur-[1px]"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 4 + 3}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.4,
            }}
          ></div>
        ))}
      </div>

      {/* Header Section */}
      <header className="relative z-20 flex w-full flex-col items-center justify-center pb-4 pt-[calc(env(safe-area-inset-top)+1.5rem)]">
        <div className="bg-primary/50 animate-pulse-glow mb-6 h-1 w-16 rounded-full"></div>
        <h1
          className="animate-fade-in text-glow text-primary font-cinzel px-6 text-center text-4xl font-black uppercase leading-tight tracking-[0.2em] opacity-0"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          {t('completion.title').split(' ')[0]}
          <br />
          {t('completion.title').split(' ').slice(1).join(' ')}
        </h1>
        <p
          className="animate-fade-in font-display mt-4 text-xs font-medium uppercase tracking-[0.4em] text-white/50 opacity-0"
          style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
        >
          {t('completion.legend')}
        </p>
      </header>

      {/* Main Content: Cinematic Map */}
      <main className="relative z-10 flex w-full flex-1 items-center justify-center px-0 sm:px-4">
        {/* Cinematic Container 16:9 */}
        <div className="glass-panel group relative aspect-video w-full max-w-2xl overflow-hidden border-white/10 shadow-2xl transition-all duration-700 sm:rounded-2xl sm:border">
          {/* Map Background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity grayscale transition-all duration-1000 group-hover:opacity-50 group-hover:mix-blend-normal group-hover:grayscale-0"
            style={{
              backgroundImage:
                'url(https://lh3.googleusercontent.com/aida-public/AB6AXuAEtmxBUBDmMANPRdUF2iFToDPGDZ4V_Db0RRgJ5fe2SWSLw4jjCgfj-tQUf-Op20wRS041nokZ6EaypA4-colRmO4cnSVNg9OB5GvEEis1MXSZVVGm86FQX8oZpXZG-kFt3tfdME6vilpzYfsT4xqICHRzgArl6toVNJkpH9B4OWq4wcAVOZBZsDr26Ochi0XMJMM02lnvAL0pvH7M9Pu6H4bD38S-UYJe32x_8WWh-E04J1a6OOt-OYx5nHqLn0hZlPp-nlDm0tnN)',
            }}
          ></div>

          {/* Map Vector Overlay */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <svg className="h-full w-full drop-shadow-2xl" viewBox="0 0 400 225">
              {/* Walking Route */}
              <path
                className="animate-draw-path map-glow-filter"
                d="M140,80 L260,80 L280,110 L260,160 L140,160 L120,110 Z"
                fill="none"
                stroke="#f9d406"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                style={{ strokeDasharray: 600, strokeDashoffset: 600 }}
              ></path>

              {/* Landmarks */}
              {[
                { cx: 200, cy: 120, delay: '0s' },
                { cx: 280, cy: 110, delay: '0.5s' },
                { cx: 120, cy: 110, delay: '1s' },
                { cx: 260, cy: 160, delay: '1.5s' },
                { cx: 260, cy: 80, delay: '2s' },
                { cx: 190, cy: 70, delay: '2.2s' },
                { cx: 140, cy: 80, delay: '2.7s' },
                { cx: 140, cy: 160, delay: '3.1s' },
              ].map((site, idx) => (
                <circle
                  key={idx}
                  cx={site.cx}
                  cy={site.cy}
                  fill="#f9d406"
                  r="3.5"
                  className="map-glow-filter animate-pulse-glow"
                  style={{ animationDelay: site.delay }}
                />
              ))}
            </svg>
          </div>

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(35,32,15,0.9)_100%)]"></div>

          {/* Accent corners for cinematic feel */}
          <div className="border-primary/40 absolute left-4 top-4 h-4 w-4 rounded-tl-sm border-l border-t"></div>
          <div className="border-primary/40 absolute bottom-4 right-4 h-4 w-4 rounded-br-sm border-b border-r"></div>
        </div>
      </main>

      {/* Bottom Actions */}
      <footer className="from-background-dark via-background-dark relative z-20 w-full bg-gradient-to-t to-transparent px-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-6">
        <div
          className="animate-fade-in mx-auto flex max-w-md flex-col items-center gap-6 opacity-0"
          style={{ animationDelay: '2s', animationFillMode: 'forwards' }}
        >
          <div className="space-y-2 text-center">
            <p className="text-lg font-light leading-relaxed text-white/90">
              {t('completion.subtitle')}
            </p>
            <p className="text-primary text-sm font-bold uppercase tracking-[0.2em]">
              {t('completion.legend')}
            </p>
          </div>

          {/* Primary Button */}
          <button
            onClick={() => setCurrentScreen('library')}
            className="animate-pulse-glow bg-primary text-background-dark shadow-primary/20 border-primary/50 group relative h-16 w-full max-w-xs overflow-hidden rounded-xl border shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 flex translate-x-[-150%] items-center justify-center bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[150%]"></div>
            <div className="relative flex items-center justify-center gap-3 text-lg font-bold uppercase tracking-wide">
              <span className="material-symbols-outlined text-2xl">history_edu</span>
              <span>{t('completion.review_memories')}</span>
            </div>
          </button>

          {/* Secondary Button */}
          <button className="text-primary/60 hover:text-primary flex items-center gap-2 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:tracking-[0.25em]">
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span>{t('completion.share')}</span>
          </button>
        </div>

        {/* Decorative Divider */}
        <div className="via-primary/30 mx-auto mt-10 h-[1px] w-48 rounded-full bg-gradient-to-r from-transparent to-transparent"></div>
      </footer>

      <style jsx>{`
        .glass-panel {
          background: rgba(35, 32, 15, 0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .text-glow {
          text-shadow: 0 0 15px rgba(249, 212, 6, 0.3);
        }
        .map-glow-filter {
          filter: drop-shadow(0 0 8px rgba(249, 212, 6, 0.6));
        }
        .animate-draw-path {
          animation: drawPath 3s ease-in-out forwards;
        }
        @keyframes drawPath {
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite ease-in-out;
        }
        @keyframes particle-rise {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100vh) scale(1.2);
            opacity: 0;
          }
        }
        .animate-particle-rise {
          animation: particle-rise linear infinite;
        }
      `}</style>
    </div>
  );
}
