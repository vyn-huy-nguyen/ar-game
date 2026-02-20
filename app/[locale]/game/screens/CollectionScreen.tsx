/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { useGame } from '../GameContext';

export default function CollectionScreen() {
  const { setCurrentScreen, unlockedMemories } = useGame();

  const memories = [
    { id: 'ho-guom', title: 'Hồ Hoàn Kiếm', date: '1946' },
    { id: 'o-quan-chuong', title: 'Ô Quan Chưởng', date: '1900' },
    { id: 'hang-buom', title: 'Phố Hàng Buồm', date: '1930' },
    { id: 'hang-dong', title: 'Phố Hàng Đồng', date: '1950' },
    { id: 'hang-trong', title: 'Phố Hàng Trống', date: '1920' },
    { id: 'lan-ong', title: 'Phố Lãn Ông', date: '1940' },
    { id: 'dong-xuan', title: 'Chợ Đồng Xuân', date: '1910' },
    { id: 'hang-ma', title: 'Phố Hàng Mã', date: '1960' },
  ];

  return (
    <div className="bg-background-light font-display dark:bg-background-dark flex h-screen w-full flex-col text-white">
      {/* Header */}
      <div className="bg-navy-mid relative z-10 flex items-center justify-between p-6 shadow-lg">
        <button
          onClick={() => setCurrentScreen('map')}
          className="text-primary flex items-center gap-2 hover:text-white"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="text-sm font-bold uppercase tracking-wider">Bản đồ</span>
        </button>
        <h1 className="text-primary text-lg font-bold uppercase tracking-widest">
          Ký ức đã thu thập
        </h1>
        <div className="w-8"></div> {/* Spacer */}
      </div>

      {/* Grid Content */}
      <div className="scrollbar-hide flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-2 gap-4 pb-20">
          {memories.map((memory) => {
            const isUnlocked = unlockedMemories.includes(memory.id);
            return (
              <div
                key={memory.id}
                className={`bg-navy-mid relative aspect-[3/4] overflow-hidden rounded-xl border shadow-lg transition-all duration-300 ${isUnlocked ? 'border-primary/60 opacity-100' : 'border-white/10 opacity-50 grayscale'}`}
              >
                {isUnlocked ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                    {/* Placeholder Logic for Memory Image - uses a solid color or pattern if no image */}
                    <div className="bg-primary/10 absolute inset-0 z-0"></div>

                    <div className="absolute bottom-0 left-0 z-10 w-full p-3">
                      <div className="bg-primary mb-1 h-0.5 w-8"></div>
                      <p className="text-primary mb-0.5 font-sans text-xs font-bold">
                        {memory.date}
                      </p>
                      <h3 className="font-display text-sm font-bold leading-tight text-white">
                        {memory.title}
                      </h3>
                    </div>

                    <div className="absolute right-2 top-2 z-10">
                      <span className="material-symbols-outlined text-primary text-sm">
                        check_circle
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-black/40 p-2 text-center">
                    <span className="material-symbols-outlined mb-2 text-3xl text-white/20">
                      lock
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-white/30">
                      Chưa mở khóa
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
