'use client';

import React from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';

const MEMORIES = [
  { id: 'ho-guom', title: 'Hồ Hoàn Kiếm', icon: 'temple_buddhist' },
  { id: 'o-quan-chuong', title: 'Ô Quan Chưởng', icon: 'fort' },
  { id: 'hang-buom', title: 'Hàng Buồm', icon: 'sailing' },
  { id: 'hang-dong', title: 'Hàng Đồng', icon: 'notifications' },
  { id: 'hang-trong', title: 'Hàng Trống', icon: 'image' },
  { id: 'lan-ong', title: 'Lãn Ông', icon: 'local_florist' },
  { id: 'dong-xuan', title: 'Đồng Xuân', icon: 'storefront' },
  { id: 'hang-ma', title: 'Hàng Mã', icon: 'local_fire_department' },
];

export default function LibraryScreen() {
  const { setCurrentScreen, unlockedMemories } = useGame();

  return (
    <div className="bg-background-dark font-display flex h-[100dvh] w-full flex-col text-white">
      {/* Header */}
      <div className="bg-background-dark/80 sticky top-0 z-20 flex items-center justify-between px-6 pb-2 pt-[calc(env(safe-area-inset-top)+1rem)] backdrop-blur-md">
        <button
          onClick={() => setCurrentScreen('map')}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="text-primary text-xl font-black uppercase tracking-[0.3em]">
          Thư viện ký ức
        </h1>
        <div className="w-10"></div>
      </div>

      {/* Grid */}
      <div className="scrollbar-hide flex-grow overflow-y-auto px-6 py-4">
        <div className="grid grid-cols-2 gap-4">
          {MEMORIES.map((memory) => {
            const isUnlocked = unlockedMemories.includes(memory.id);
            return (
              <div
                key={memory.id}
                className={`relative flex aspect-square flex-col items-center justify-center gap-3 rounded-3xl border p-4 transition-all duration-500
                   ${
                     isUnlocked
                       ? 'border-primary/40 bg-navy-mid/30 shadow-glow'
                       : 'border-white/5 bg-white/5 opacity-40 grayscale'
                   }
                 `}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full
                    ${isUnlocked ? 'bg-primary text-background-dark' : 'bg-white/10 text-white/20'}
                  `}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {isUnlocked ? memory.icon : 'lock'}
                  </span>
                </div>
                <p
                  className={`text-center text-[10px] font-black uppercase tracking-widest
                    ${isUnlocked ? 'text-white' : 'text-white/20'}
                  `}
                >
                  {isUnlocked ? memory.title : 'Đang khóa'}
                </p>

                {isUnlocked && (
                  <div className="absolute right-3 top-3">
                    <div className="bg-primary shadow-glow h-2 w-2 animate-pulse rounded-full"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Statistics or Status */}
        <div className="bg-navy-deep/20 mb-[calc(env(safe-area-inset-bottom)+5rem)] mt-12 space-y-4 rounded-3xl border border-white/5 p-8 text-center sm:mb-12">
          <h3 className="text-primary text-xs font-bold uppercase tracking-widest">
            Tiến trình khôi phục
          </h3>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="bg-primary shadow-glow absolute left-0 top-0 h-full transition-all duration-1000"
              style={{ width: `${(unlockedMemories.length / 8) * 100}%` }}
            ></div>
          </div>
          <p className="text-4xl font-black text-white">{unlockedMemories.length}/8</p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            Ký ức đã được giải mã
          </p>
        </div>
      </div>

      {/* Footer Button if all unlocked */}
      {unlockedMemories.length === 8 && (
        <div className="mt-8 px-6">
          <button
            onClick={() => setCurrentScreen('completion')}
            className="bg-primary text-background-dark shadow-glow h-14 w-full rounded-2xl font-bold uppercase tracking-widest"
          >
            Xem thành quả cuối cùng
          </button>
        </div>
      )}
    </div>
  );
}
