/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { useGame } from '../GameContext';

export default function CompletionScreen() {
  const { setCurrentScreen } = useGame();

  return (
    <div className="bg-background-light font-display dark:bg-background-dark relative flex h-screen w-full flex-col justify-between overflow-hidden text-white">
      {/* Atmospheric Background Overlay */}
      <div className="bg-dust-pattern pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-overlay"></div>

      {/* Top Gradient */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-32 w-full bg-gradient-to-b from-black/80 to-transparent"></div>

      {/* Header Section */}
      <header className="relative z-20 flex w-full flex-col items-center justify-center pb-4 pt-8">
        <div className="bg-primary/30 mb-6 h-1 w-12 rounded-full"></div>
        <h1
          className="animate-fade-in text-glow text-primary px-6 text-center text-3xl font-bold uppercase leading-tight tracking-wide opacity-0 md:text-4xl"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          Hành trình
          <br />
          hoàn tất
        </h1>
        <p
          className="animate-fade-in mt-2 text-sm font-light tracking-wider text-white/70 opacity-0"
          style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
        >
          Hà Nội – Những Mảnh Ghép Thời Gian
        </p>
      </header>

      {/* Main Content: Cinematic Map */}
      <main className="relative z-10 flex w-full flex-1 items-center justify-center px-0 sm:px-4">
        {/* Cinematic Container 16:9 */}
        <div className="bg-deep-navy/90 border-primary/20 ring-primary/10 relative aspect-video w-full max-w-2xl overflow-hidden border-y shadow-2xl ring-1 sm:rounded-xl sm:border">
          {/* Map Background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity transition-all duration-1000 hover:mix-blend-normal"
            style={{
              backgroundImage:
                'url(https://lh3.googleusercontent.com/aida-public/AB6AXuAEtmxBUBDmMANPRdUF2iFToDPGDZ4V_Db0RRgJ5fe2SWSLw4jjCgfj-tQUf-Op20wRS041nokZ6EaypA4-colRmO4cnSVNg9OB5GvEEis1MXSZVVGm86FQX8oZpXZG-kFt3tfdME6vilpzYfsT4xqICHRzgArl6toVNJkpH9B4OWq4wcAVOZBZsDr26Ochi0XMJMM02lnvAL0pvH7M9Pu6H4bD38S-UYJe32x_8WWh-E04J1a6OOt-OYx5nHqLn0hZlPp-nlDm0tnN)',
            }}
          ></div>

          {/* Map Vector Overlay */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <svg className="h-full w-full drop-shadow-2xl" viewBox="0 0 400 225">
              {/* Lake Outline */}
              <path
                d="M180,110 C160,100 150,130 170,140 C190,150 220,140 230,120 C240,100 210,90 180,110 Z"
                fill="#0f172a"
                opacity="0.5"
                stroke="#f4c025"
                strokeWidth="0.5"
              ></path>
              {/* Walking Route */}
              <path
                className="animate-draw-path map-glow-filter"
                d="M140,80 L260,80 L280,110 L260,160 L140,160 L120,110 Z"
                fill="none"
                stroke="#f4c025"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                style={{ strokeDasharray: 600, strokeDashoffset: 0 }}
              ></path>

              {/* Landmarks */}
              <g className="animate-pulse-glow origin-center">
                <circle className="map-glow-filter" cx="200" cy="120" fill="#f4c025" r="4"></circle>
              </g>
              <g className="animate-pulse-glow origin-center" style={{ animationDelay: '0.5s' }}>
                <circle cx="280" cy="110" fill="#f4c025" r="3"></circle>
              </g>

              {/* More dots simulation */}
              <circle
                cx="120"
                cy="110"
                fill="#f4c025"
                r="3"
                className="animate-pulse-glow"
                style={{ animationDelay: '1s' }}
              ></circle>
              <circle
                cx="260"
                cy="160"
                fill="#f4c025"
                r="3"
                className="animate-pulse-glow"
                style={{ animationDelay: '1.5s' }}
              ></circle>
              <circle
                cx="260"
                cy="80"
                fill="#f4c025"
                r="3"
                className="animate-pulse-glow"
                style={{ animationDelay: '2s' }}
              ></circle>
              <circle
                cx="190"
                cy="70"
                fill="#f4c025"
                r="3"
                className="animate-pulse-glow"
                style={{ animationDelay: '0.2s' }}
              ></circle>
              <circle
                cx="140"
                cy="80"
                fill="#f4c025"
                r="3"
                className="animate-pulse-glow"
                style={{ animationDelay: '0.7s' }}
              ></circle>
              <circle
                cx="140"
                cy="160"
                fill="#f4c025"
                r="3"
                className="animate-pulse-glow"
                style={{ animationDelay: '1.2s' }}
              ></circle>
            </svg>
          </div>

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,20,0.8)_100%)]"></div>
        </div>

        {/* Celebration Particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-primary absolute left-1/4 top-1/4 h-1 w-1 animate-pulse rounded-full opacity-60"></div>
          <div className="bg-primary absolute right-1/4 top-1/3 h-2 w-2 animate-bounce rounded-full opacity-40"></div>
          <div className="bg-primary absolute bottom-1/3 left-1/3 h-1.5 w-1.5 animate-pulse rounded-full opacity-50"></div>
          <div className="bg-primary absolute right-1/3 top-1/2 h-1 w-1 animate-ping rounded-full opacity-30"></div>
        </div>
      </main>

      {/* Bottom Actions */}
      <footer className="from-background-dark via-background-dark relative z-20 w-full bg-gradient-to-t to-transparent px-6 pb-10 pt-6">
        <div
          className="animate-fade-in mx-auto flex max-w-md flex-col items-center gap-4 opacity-0"
          style={{ animationDelay: '2s', animationFillMode: 'forwards' }}
        >
          <p className="mb-2 text-center text-base font-light leading-relaxed text-white">
            Chúc mừng bạn đã hoàn thành chuyến đi lịch sử
            <br />
            vòng quanh Hồ Gươm.
          </p>

          {/* Primary Button */}
          <button
            onClick={() => setCurrentScreen('collected')}
            className="from-primary to-primary group relative w-full overflow-hidden rounded-xl bg-gradient-to-br via-[#d4a015] p-[1px] shadow-[0_0_20px_rgba(244,192,37,0.3)] transition-all hover:shadow-[0_0_30px_rgba(244,192,37,0.5)] active:scale-95"
          >
            <div className="bg-primary relative flex h-14 w-full items-center justify-center gap-2 rounded-xl transition-all group-hover:bg-[#ffcc33]">
              <span className="material-symbols-outlined text-background-dark">history_edu</span>
              <span className="text-background-dark text-lg font-bold uppercase tracking-wide">
                Xem lại ký ức
              </span>
            </div>
            {/* Shine */}
            <div className="group-hover:animate-shimmer absolute -inset-full top-0 z-10 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 mix-blend-overlay"></div>
          </button>

          {/* Secondary Button */}
          <button className="text-primary/80 hover:text-primary flex items-center gap-2 py-2 text-sm font-medium uppercase tracking-wider transition-colors">
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span>Chia sẻ hành trình</span>
          </button>
        </div>
        {/* Decorative line */}
        <div className="bg-primary/20 mx-auto mt-6 h-1 w-24 rounded-full"></div>
      </footer>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            left: 125%;
          }
        }
        .text-glow {
          text-shadow: 0 0 20px rgba(244, 192, 37, 0.4);
        }
        .map-glow-filter {
          filter: drop-shadow(0 0 10px rgba(244, 192, 37, 0.6));
        }
        .animate-shimmer {
          animation: shimmer 1s infinite;
        }
        .animate-draw-path {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: drawPath 2s ease-out forwards;
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
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
