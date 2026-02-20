/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';

export default function CollectionScreen() {
  const { setCurrentScreen, currentLocationId, unlockedMemories } = useGame();

  const memories = [
    {
      id: 'ho-guom',
      title: 'Hồ Hoàn Kiếm',
      date: 'Vùng ký ức #01',
      desc: 'Tiếng chuông rùa vàng vang vọng giữa làn sương sớm.',
    },
    {
      id: 'o-quan-chuong',
      title: 'Ô Quan Chưởng',
      date: 'Vùng ký ức #02',
      desc: 'Cổng thành cổ kính vẫn hiên ngang trước bao biến thiên của thời đại.',
    },
    {
      id: 'hang-buom',
      title: 'Phố Hàng Buồm',
      date: 'Vùng ký ức #03',
      desc: 'Mảnh ghép thương cảng sầm uất với mùi trầm hương thoang thoảng.',
    },
    {
      id: 'hang-dong',
      title: 'Phố Hàng Đồng',
      date: 'Vùng ký ức #04',
      desc: 'Tiếng búa gõ nhịp nhàng trên đồng thau tạo nên bản giao hưởng của phố nghề.',
    },
    {
      id: 'hang-trong',
      title: 'Phố Hàng Trống',
      date: 'Vùng ký ức #05',
      desc: 'Nơi những nét vẽ dân gian thờ phụng hồn cốt đất Kinh Kỳ.',
    },
    {
      id: 'lan-ong',
      title: 'Phố Lãn Ông',
      date: 'Vùng ký ức #06',
      desc: 'Vị thuốc bắc thơm nồng dẫn lối về những hiệu thuốc cổ truyền.',
    },
    {
      id: 'dong-xuan',
      title: 'Chợ Đồng Xuân',
      date: 'Vùng ký ức #07',
      desc: 'Trái tim giao thương rộn rã bước chân qua bao thập kỷ.',
    },
    {
      id: 'hang-ma',
      title: 'Phố Hàng Mã',
      date: 'Vùng ký ức #08',
      desc: 'Sắc đỏ đèn lồng thắp sáng những giấc mơ tuổi thơ rực rỡ.',
    },
  ];

  const currentMemory = memories.find((m) => m.id === currentLocationId) || memories[0];

  return (
    <div className="bg-navy-900 font-display relative h-[100dvh] w-full overflow-hidden text-white">
      {/* Background Hero with Blur */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full scale-105 bg-cover bg-center opacity-40 blur-sm"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDkYYgAtSHck1GUzYNJCg7rS9rPKGfGzLoUvy1wZ422LNEoo_hSLKt0sbpMYoKdYvpHBJBW1E1lZvWLDNcPDnK9_2I0xz002BO-nP2e6RnXbn3Z-OHDqFw5bLSQ8WLVA1xln8A4zkPAuWLq4dE4US_lIvWr55USKSExWFZd2H3YacVa7U1I50S1I0N2L-mMFxBO70uhmXbEQHdjqd0xxr5JnzpsJjb-fh4JOkDOwgBFqaggPgQYGyqZeNqaGNPXpgSKRX4xTbD9R8ne')`,
          }}
        ></div>
        <div className="bg-navy-900/60 absolute inset-0 mix-blend-multiply"></div>
      </div>

      {/* Particle System */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div className="particle animate-particle-rise bg-primary absolute left-[20%] top-[60%] h-1 w-1 rounded-full opacity-40"></div>
        <div
          className="particle animate-particle-rise bg-primary absolute left-[50%] top-[50%] h-1.5 w-1.5 rounded-full opacity-60"
          style={{ animationDelay: '1.2s' }}
        ></div>
        <div
          className="particle animate-particle-rise bg-primary absolute left-[70%] top-[55%] h-0.5 w-0.5 rounded-full opacity-30"
          style={{ animationDelay: '0.5s' }}
        ></div>
      </div>

      {/* Main UI Container */}
      <div className="relative z-20 mx-auto flex h-full w-full max-w-md flex-col items-center justify-center p-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-[calc(env(safe-area-inset-top)+1rem)]">
        <div className="absolute top-10 w-full text-center">
          <h2 className="text-primary/80 mb-2 font-sans text-xs font-bold uppercase tracking-[0.2em]">
            Phần thưởng ký ức
          </h2>
          <div className="bg-primary/40 mx-auto h-px w-12"></div>
        </div>

        {/* Memory Reward Card */}
        <div className="animate-float relative mb-10 h-80 w-64">
          <div className="bg-primary absolute inset-0 scale-110 rounded-full opacity-30 blur-[40px]"></div>
          <div className="gold-gradient-border card-3d bg-navy-800 shadow-glow-gold relative h-full w-full overflow-hidden rounded-xl transition-all duration-700">
            <div className="border-primary/30 pointer-events-none absolute inset-[2px] z-20 rounded-lg border"></div>
            <div
              className="relative h-full w-full rounded-xl bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDkYYgAtSHck1GUzYNJCg7rS9rPKGfGzLoUvy1wZ422LNEoo_hSLKt0sbpMYoKdYvpHBJBW1E1lZvWLDNcPDnK9_2I0xz002BO-nP2e6RnXbn3Z-OHDqFw5bLSQ8WLVA1xln8A4zkPAuWLq4dE4US_lIvWr55USKSExWFZd2H3YacVa7U1I50S1I0N2L-mMFxBO70uhmXbEQHdjqd0xxr5JnzpsJjb-fh4JOkDOwgBFqaggPgQYGyqZeNqaGNPXpgSKRX4xTbD9R8ne')`,
              }}
            >
              <div className="from-navy-900/90 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"></div>
              <div className="border-primary/40 absolute right-3 top-3 z-30 rounded-full border bg-black/60 p-1.5 backdrop-blur-sm">
                <span className="material-symbols-outlined text-primary text-sm">star</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-30">
                <p className="text-primary/80 mb-1 text-[10px] font-bold uppercase tracking-widest">
                  Hà Nội 19-20th
                </p>
                <h3 className="text-lg font-bold leading-tight text-white">
                  {currentMemory.title}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Reward Panel */}
        <div className="glass-panel animate-fade-in-up relative w-full overflow-hidden rounded-2xl p-6">
          <div className="via-primary absolute left-1/2 top-0 h-[2px] w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent opacity-70"></div>
          <div className="space-y-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-primary/10 border-primary/30 text-primary mb-1 flex h-10 w-10 items-center justify-center rounded-full border">
                <span className="material-symbols-outlined">folder_open</span>
              </div>
              <h3 className="text-lg font-medium text-white">Bạn đã nhận được</h3>
              <p className="font-sans text-sm font-light text-white/60">Tài liệu số hóa địa điểm</p>
            </div>
            <div className="my-2 h-px w-full bg-white/10"></div>
            <button className="from-primary text-navy-900 group relative w-full transform overflow-hidden rounded-lg bg-gradient-to-r to-[#ffe55c] px-6 py-3.5 font-bold shadow-[0_0_20px_rgba(249,212,6,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,212,6,0.5)] active:scale-[0.98]">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">download</span>
                Tải xuống (PDF)
              </span>
              <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            </button>
            <button
              onClick={() => setCurrentScreen('library')}
              className="mt-2 font-sans text-xs font-bold uppercase tracking-widest text-white/40 transition-colors hover:text-white/80"
            >
              Đóng và tiếp tục
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glass-panel {
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .gold-gradient-border {
          background: linear-gradient(
            135deg,
            rgba(249, 212, 6, 0.6),
            rgba(249, 212, 6, 0.1),
            rgba(249, 212, 6, 0.6)
          );
          padding: 1px;
        }
        .card-3d {
          transform-style: preserve-3d;
          transform: perspective(1000px) rotateY(10deg);
        }
        .shadow-glow-gold {
          box-shadow: 0 0 20px rgba(249, 212, 6, 0.5);
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
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2s linear infinite;
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
        .particle {
          background-color: #f9d406;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}
