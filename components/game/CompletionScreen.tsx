'use client';

import React from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';

export default function CompletionScreen() {
  const { setCurrentScreen } = useGame();

  return (
    <div className="text-paper relative flex h-[100dvh] w-full flex-col items-center overflow-hidden bg-navy-deep font-serif">
      {/* Background Decorative SVG */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <svg
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 400 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#aa8c2c', stopOpacity: 1 }}></stop>
              <stop offset="100%" style={{ stopColor: '#fceda3', stopOpacity: 1 }}></stop>
            </linearGradient>
          </defs>
          <path d="M150 550 L250 550 L240 500 L160 500 Z" fill="url(#goldGradient)"></path>
          <path
            d="M170 500 L230 500 L225 470 L175 470 Z"
            fill="url(#goldGradient)"
            opacity="0.8"
          ></path>
          <circle cx="50" cy="100" fill="url(#goldGradient)" opacity="0.05" r="80"></circle>
          <circle cx="350" cy="150" fill="url(#goldGradient)" opacity="0.05" r="60"></circle>
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0 z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="sparkle absolute h-1 w-1 rounded-full bg-white opacity-0"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <main className="relative z-10 flex h-full w-full max-w-md flex-col items-center justify-center px-6 py-8">
        <div className="mb-8 animate-[fade-in-down_1s_ease-out] space-y-3 text-center">
          <div className="border-gold-DEFAULT/30 bg-gold-DEFAULT/10 mb-2 inline-flex items-center justify-center rounded-full border p-2">
            <span className="material-symbols-outlined text-gold-DEFAULT mr-1 text-sm">stars</span>
            <span className="text-gold-light text-[10px] font-bold uppercase tracking-widest sm:text-xs">
              Hoàn thành xuất sắc
            </span>
            <span className="material-symbols-outlined text-gold-DEFAULT ml-1 text-sm">stars</span>
          </div>
          <h1 className="from-gold-light via-gold-DEFAULT to-gold-dark bg-gradient-to-b bg-clip-text font-display text-3xl font-bold text-transparent drop-shadow-sm md:text-4xl">
            Chúc mừng!
          </h1>
          <p className="text-paper/80 mx-auto max-w-[280px] text-sm font-light leading-relaxed md:text-base">
            Bạn đã phục hồi toàn bộ ký ức về một Hà Nội vàng son.
          </p>
        </div>

        <div className="perspective-1000 group relative my-4">
          <div className="bg-gold-DEFAULT/20 absolute left-1/2 top-1/2 h-64 w-80 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full blur-[60px]"></div>
          <div className="transform-style-3d relative h-64 w-44 animate-float transition-transform duration-500 sm:h-80 sm:w-56">
            <div className="translate-z-[-10px] bg-paper absolute bottom-1 right-2 top-1 w-full translate-x-2 rounded-r-md border-r border-gray-300 shadow-lg"></div>
            <div className="book-cover border-gold-DEFAULT/30 absolute inset-0 z-20 flex flex-col items-center justify-between overflow-hidden rounded-l-sm rounded-r-md border p-4 shadow-[10px_10px_30px_rgba(0,0,0,0.5)]">
              <div className="border-gold-DEFAULT absolute left-2 top-2 h-8 w-8 border-l-2 border-t-2 opacity-50"></div>
              <div className="border-gold-DEFAULT absolute right-2 top-2 h-8 w-8 border-r-2 border-t-2 opacity-50"></div>
              <div className="border-gold-DEFAULT absolute bottom-2 left-2 h-8 w-8 border-b-2 border-l-2 opacity-50"></div>
              <div className="border-gold-DEFAULT absolute bottom-2 right-2 h-8 w-8 border-b-2 border-r-2 opacity-50"></div>
              <div className="z-10 mt-8 text-center">
                <div className="border-gold-DEFAULT/50 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border">
                  <span className="material-symbols-outlined text-gold-light text-2xl">
                    auto_stories
                  </span>
                </div>
                <h2 className="text-gold-light mb-1 font-display text-2xl tracking-wide">KÝ ỨC</h2>
                <h3 className="text-gold-DEFAULT font-display text-xl uppercase tracking-widest">
                  HÀ NỘI
                </h3>
              </div>
              <div className="z-10 mb-4 text-center">
                <p className="text-gold-DEFAULT/70 text-[10px] uppercase tracking-widest">
                  Bộ sưu tập đặc biệt
                </p>
                <div className="bg-gold-DEFAULT/50 mx-auto my-2 h-[1px] w-8"></div>
                <p className="text-gold-DEFAULT/50 font-serif text-[10px] italic">1900 - 2024</p>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
            </div>
            <div className="book-spine absolute bottom-0 left-0 top-0 z-10 w-4 -translate-x-full rounded-l-sm shadow-inner"></div>
          </div>
        </div>

        <div className="mt-10 flex w-full animate-[fade-in-up_1s_ease-out_0.5s_both] flex-col items-center gap-4">
          <button className="from-gold-light via-gold-DEFAULT to-gold-dark group relative w-full max-w-[320px] transform overflow-hidden rounded-lg bg-gradient-to-b p-[1px] shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] active:translate-y-0">
            <div className="flex items-center justify-center gap-3 rounded-[7px] bg-navy-deep px-6 py-4 transition-colors duration-300 hover:bg-navy-light">
              <span className="material-symbols-outlined text-gold-light group-hover:animate-bounce">
                download
              </span>
              <span className="text-gold-light font-display text-sm font-semibold tracking-wide md:text-base">
                Nhận quyển sách Ký ức (PDF)
              </span>
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[7px]">
                <div className="animate-shine absolute left-0 top-0 h-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            </div>
          </button>
          <div className="mt-4 flex gap-6">
            <button
              onClick={() => setCurrentScreen('library')}
              className="text-gold-DEFAULT/60 hover:text-gold-light flex items-center gap-1 text-xs uppercase tracking-widest transition-colors"
            >
              <span className="material-symbols-outlined text-sm">share</span> Chia sẻ
            </button>
            <button
              onClick={() => setCurrentScreen('landing')}
              className="text-gold-DEFAULT/60 hover:text-gold-light flex items-center gap-1 text-xs uppercase tracking-widest transition-colors"
            >
              <span className="material-symbols-outlined text-sm">home</span> Về trang chủ
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        .book-spine {
          background: linear-gradient(
            90deg,
            #5e4b1f 0%,
            #8a7032 20%,
            #5e4b1f 40%,
            #8a7032 60%,
            #5e4b1f 100%
          );
        }
        .book-cover {
          background: linear-gradient(135deg, #1a2a44 0%, #0d1b2e 100%);
          box-shadow:
            inset 0 0 20px rgba(0, 0, 0, 0.5),
            inset 2px 0 5px rgba(255, 255, 255, 0.1);
        }
        .text-paper {
          color: #f5f0e6;
        }
        .text-gold-light {
          color: #fceda3;
        }
        .text-gold-DEFAULT {
          color: #d4af37;
        }
        .bg-navy-deep {
          background-color: #0a192f;
        }
        .bg-navy-light {
          background-color: #112240;
        }
        .gold-dark {
          color: #aa8c2c;
        }
        @keyframes sparkle-anim {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }
        .sparkle {
          animation: sparkle-anim 2s infinite;
        }
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          20% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shine {
          animation: shine 8s linear infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
