/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { useGame } from '../GameContext';

export default function ArrivalScreen() {
  const { setCurrentScreen, currentLocationId } = useGame();

  return (
    <div className="bg-background-light font-display selection:bg-primary dark:bg-background-dark relative h-screen w-full overflow-hidden text-white selection:text-black">
      {/* Decorative Border Frame */}
      <div className="border-primary/30 pointer-events-none fixed inset-4 z-20 rounded-[2rem] border shadow-[0_0_15px_rgba(249,212,6,0.1)]"></div>

      {/* Background Effects */}
      <div className="bg-background-dark absolute inset-0 z-0">
        {/* Radial Glow Center */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,212,6,0.15)_0%,rgba(15,20,32,0)_70%)]"></div>

        {/* Floating Particles (Simulated) */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-primary absolute rounded-full opacity-60 blur-[1px]"
            style={{
              width: Math.random() > 0.5 ? '4px' : '6px',
              height: Math.random() > 0.5 ? '4px' : '6px',
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animation: `float ${Math.random() * 5 + 5}s ease-in-out infinite ${Math.random() * 2}s`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 pb-12 pt-8">
        {/* Header: Navigation Icons */}
        <div className="flex w-full items-start justify-between px-2 pt-2">
          {/* Map Button */}
          <button
            onClick={() => setCurrentScreen('map')}
            className="border-primary/20 bg-navy-mid text-primary hover:bg-primary hover:text-navy-mid hover:shadow-primary/20 group flex size-12 items-center justify-center rounded-full border shadow-lg transition-all duration-300 active:scale-95"
          >
            <span className="material-symbols-outlined !text-[24px]">map</span>
          </button>
          {/* Journal Button */}
          <button
            onClick={() => setCurrentScreen('collected')}
            className="border-primary/20 bg-navy-mid text-primary hover:bg-primary hover:text-navy-mid hover:shadow-primary/20 group flex size-12 items-center justify-center rounded-full border shadow-lg transition-all duration-300 active:scale-95"
          >
            <span className="material-symbols-outlined !text-[24px]">book_2</span>
          </button>
        </div>

        {/* Center Stage: Title & Visual */}
        <div className="-mt-10 flex flex-1 flex-col items-center justify-center space-y-8 text-center">
          {/* Decorative Element above text */}
          <div className="via-primary h-16 w-px bg-gradient-to-b from-transparent to-transparent opacity-50"></div>

          <div className="relative px-4">
            {/* Text Glow Effect Layer */}
            <div className="bg-primary/10 absolute inset-0 scale-150 rounded-full blur-xl"></div>
            <h1 className="text-primary relative text-3xl font-bold leading-tight tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] md:text-5xl">
              Bạn đã đến
              <br />
              <span className="text-white">vùng ký ức</span>
            </h1>
            <p className="text-primary/60 mt-4 font-sans text-sm uppercase tracking-widest">
              Hà Nội • {currentLocationId ? 'Phố cổ' : '1946'}
            </p>
          </div>

          {/* Decorative Element below text */}
          <div className="via-primary h-16 w-px bg-gradient-to-b from-transparent to-transparent opacity-50"></div>
        </div>

        {/* Footer: Primary Action */}
        <div className="flex w-full flex-col items-center justify-end space-y-6 pb-8">
          {/* Scan Button */}
          <button
            onClick={() => setCurrentScreen('scanning')}
            className="group relative w-full max-w-xs"
          >
            <div className="animate-pulse-glow bg-primary absolute inset-0 rounded-full opacity-40 blur transition-opacity duration-500 group-hover:opacity-60"></div>
            <div className="bg-primary text-navy-mid relative flex h-14 w-full items-center justify-center overflow-hidden rounded-full text-lg font-bold tracking-wide shadow-xl transition-transform duration-200 hover:-translate-y-0.5 active:scale-95">
              <span className="material-symbols-outlined mr-2 animate-pulse">radar</span>
              Quét manh mối
              {/* Shiny reflection effect */}
              <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            </div>
          </button>

          {/* Hint Text */}
          <p className="text-primary/40 font-sans text-xs tracking-wide">
            Chạm để khám phá không gian xung quanh
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
