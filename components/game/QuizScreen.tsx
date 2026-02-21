'use client';

import React, { useState } from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';

const QUIZ_DATA: Record<
  string,
  {
    question: string;
    options: string[];
    correctIndex: number;
    fact: string;
  }
> = {
  'o-quan-chuong': {
    question: 'Ô Quan Chưởng được xây dựng dưới triều đại nào?',
    options: ['Lý', 'Trần', 'Lê', 'Nguyễn'],
    correctIndex: 2,
    fact: 'Ô Quan Chưởng (hay Đông Hà Môn) được xây dựng vào năm 1749 thời vua Lê Hiển Tông. Đây là cửa ô duy nhất còn sót lại của kinh thành Thăng Long xưa.',
  },
  'hang-dong': {
    question: 'Sản phẩm thủ công truyền thống nổi tiếng nhất của phố Hàng Đồng là gì?',
    options: ['Đồ đồng thờ tự', 'Tranh lụa', 'Mũ cối', 'Gốm sứ'],
    correctIndex: 0,
    fact: 'Phố Hàng Đồng từ lâu đã nổi tiếng với các sản phẩm bằng đồng như đồ thờ, mâm, nồi... được chế tác bởi bàn tay tài hoa của các nghệ nhân làng nghề Ngũ Xã.',
  },
  default: {
    question: 'Ngôi nhà cổ này được xây dựng vào năm nào?',
    options: ['1906', '1946', '1920', '1930'],
    correctIndex: 0,
    fact: 'Kiến trúc Phố Cổ Hà Nội mang vẻ đẹp giao thoa giữa truyền thống Việt Nam và ảnh hưởng của kiến trúc thuộc địa Pháp thế kỷ 20.',
  },
};

export default function QuizScreen() {
  const { setCurrentScreen, currentLocationId } = useGame();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const quiz =
    currentLocationId && QUIZ_DATA[currentLocationId]
      ? QUIZ_DATA[currentLocationId]
      : QUIZ_DATA['default'];

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    if (index === quiz.correctIndex) {
      setTimeout(() => {
        setCurrentScreen('fact');
      }, 800);
    }
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-background-dark font-display text-white">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDkYYgAtSHck1GUzYNJCg7rS9rPKGfGzLoUvy1wZ422LNEoo_hSLKt0sbpMYoKdYvpHBJBW1E1lZvWLDNcPDnK9_2I0xz002BO-nP2e6RnXbn3Z-OHDqFw5bLSQ8WLVA1xln8A4zkPAuWLq4dE4US_lIvWr55USKSExWFZd2H3YacVa7U1I50S1I0N2L-mMFxBO70uhmXbEQHdjqd0xxr5JnzpsJjb-fh4JOkDOwgBFqaggPgQYGyqZeNqaGNPXpgSKRX4xTbD9R8ne')",
          }}
        ></div>
        {/* Particle System */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[20%] top-[60%] h-1 w-1 animate-particle-rise rounded-full bg-primary opacity-40 shadow-[0_0_4px_#f9d406]"></div>
          <div
            className="absolute left-[50%] top-[50%] h-1.5 w-1.5 animate-particle-rise rounded-full bg-primary opacity-60 shadow-[0_0_4px_#f9d406]"
            style={{ animationDelay: '1.2s' }}
          ></div>
          <div
            className="absolute left-[70%] top-[55%] h-0.5 w-0.5 animate-particle-rise rounded-full bg-primary opacity-30 shadow-[0_0_4px_#f9d406]"
            style={{ animationDelay: '0.5s' }}
          ></div>
        </div>
      </div>

      {/* Main UI Container */}
      <div className="relative z-20 flex h-full flex-col px-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-[calc(env(safe-area-inset-top)+1rem)]">
        {/* Header */}
        <div className="z-30 flex w-full items-start justify-between py-2">
          <button
            onClick={() => setCurrentScreen('scanning')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-black/50"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-black/30 px-4 py-1.5 shadow-[0_0_10px_rgba(249,212,6,0.2)] backdrop-blur-md">
            <span className="material-symbols-outlined text-[18px] text-primary">history_edu</span>
            <span className="whitespace-nowrap text-[10px] font-bold uppercase leading-none tracking-widest text-primary/90">
              Câu hỏi lịch sử
            </span>
          </div>
        </div>

        {/* Quiz Body */}
        <div className="flex flex-1 items-center justify-center py-4">
          <div className="glass-panel relative flex w-full max-w-md animate-float flex-col gap-6 overflow-hidden rounded-2xl p-6 sm:p-8">
            <div className="absolute left-1/2 top-0 h-[1px] w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80 shadow-[0_0_15px_#f9d406]"></div>

            <div className="space-y-4 text-center">
              <div className="mb-1 inline-block rounded border border-primary/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary">
                Câu hỏi 1/3
              </div>
              <h2 className="gold-glow-text text-xl font-medium leading-tight text-primary sm:text-2xl md:text-3xl">
                {quiz.question}
              </h2>
              <p className="font-sans text-xs font-light leading-relaxed text-white/70 sm:text-sm">
                Hãy quan sát kiến trúc mặt tiền và chọn đáp án chính xác nhất dựa trên manh mối đã
                tìm thấy.
              </p>
            </div>

            <div className="mt-2 grid w-full grid-cols-1 gap-3">
              {quiz.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`option-btn group flex w-full items-center justify-between rounded-lg px-6 py-3.5
                    ${
                      selectedIndex === idx
                        ? idx === quiz.correctIndex
                          ? 'border-green-500 bg-green-500/20 text-green-400'
                          : 'animate-shake border-red-500 bg-red-500/20 text-red-400'
                        : 'border-primary/40 text-white/80 hover:border-primary hover:bg-primary/15'
                    }
                  `}
                >
                  <span className="font-sans text-sm transition-colors group-hover:text-primary">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span className="font-serif text-base transition-colors group-hover:font-medium group-hover:text-primary sm:text-lg">
                    {option}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[18px] transition-colors
                    ${selectedIndex === idx ? 'text-current opacity-100' : 'text-transparent group-hover:text-primary/50'}
                  `}
                  >
                    {selectedIndex === idx && idx === quiz.correctIndex ? 'check_circle' : 'circle'}
                  </span>
                </button>
              ))}
            </div>

            <div className="absolute bottom-3 left-3 h-4 w-4 rounded-bl-sm border-b border-l border-primary/40"></div>
            <div className="absolute right-3 top-3 h-4 w-4 rounded-tr-sm border-r border-t border-primary/40"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glass-panel {
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(249, 212, 6, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        .gold-glow-text {
          text-shadow: 0 0 12px rgba(249, 212, 6, 0.5);
        }
        .option-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(249, 212, 6, 0.4);
          transition: all 0.3s ease;
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
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
      `}</style>
    </div>
  );
}
