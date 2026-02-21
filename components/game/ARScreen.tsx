import React, { useState } from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';
import MindARViewer from './MindARViewer';

const LOCATION_TARGET_MAP: Record<string, number> = {
  'o-quan-chuong': 0,
  'hang-buom': 1,
  'hang-dong': 2,
  'hang-trong': 3,
  'lan-ong': 4,
  'dong-xuan': 5,
  'hang-ma': 6,
  'ho-guom': 7,
};

export default function ARScreen() {
  const { setCurrentScreen, currentLocationId, unlockedMemories } = useGame();
  const [isFound, setIsFound] = useState(false);

  const targetIndex = currentLocationId ? (LOCATION_TARGET_MAP[currentLocationId] ?? 0) : 0;

  const handleTargetFound = () => {
    setIsFound(true);
    // Transition to quiz immediately after finding the object
    setTimeout(() => {
      setCurrentScreen('quiz');
    }, 1500);
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-background-dark font-sans text-white">
      {/* AR View Layer */}
      <div className="absolute inset-0 z-0">
        <MindARViewer onTargetFound={handleTargetFound} targetIndex={targetIndex} />
      </div>

      {/* UI Layer */}
      <div className="pointer-events-none relative z-10 flex h-full w-full flex-col justify-between px-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-[calc(env(safe-area-inset-top)+1rem)]">
        {/* Header: Progress & Close */}
        <div className="flex items-start justify-between py-2">
          {/* Progress Badge */}
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-primary/20 bg-background-dark/80 px-4 py-2 shadow-lg backdrop-blur-sm">
            <span className="material-symbols-outlined text-sm text-primary">history_edu</span>
            <span className="text-sm font-bold tracking-widest text-primary">
              {unlockedMemories.length} / 8
            </span>
          </div>
          {/* Close Button */}
          <button
            onClick={() => setCurrentScreen('arrival')}
            className="group pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-background-dark/80 shadow-lg backdrop-blur-sm transition-colors hover:bg-background-dark"
          >
            <span className="material-symbols-outlined text-primary transition-transform group-hover:scale-110">
              close
            </span>
          </button>
        </div>

        {/* Center: AR Scanner Reticle */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {/* Reticle Container */}
          <div className="relative h-64 w-64 opacity-90 md:h-80 md:w-80">
            {/* Cornerstone Brackets */}
            <div className="shadow-glow absolute left-0 top-0 h-12 w-12 rounded-tl-lg border-l-[3px] border-t-[3px] border-primary"></div>
            <div className="shadow-glow absolute right-0 top-0 h-12 w-12 rounded-tr-lg border-r-[3px] border-t-[3px] border-primary"></div>
            <div className="shadow-glow absolute bottom-0 left-0 h-12 w-12 rounded-bl-lg border-b-[3px] border-l-[3px] border-primary"></div>
            <div className="shadow-glow absolute bottom-0 right-0 h-12 w-12 rounded-br-lg border-b-[3px] border-r-[3px] border-primary"></div>

            {/* Animated Scan Line */}
            <div className="animate-scan-move absolute left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-primary via-primary to-transparent shadow-[0_0_10px_#f9d406]"></div>

            {/* Center Focus Point */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="shadow-glow h-1 w-1 rounded-full bg-primary"></div>
            </div>

            {/* Decorative Accents */}
            <div className="absolute left-2 top-2 h-2 w-2 rounded-tl-sm border-l border-t border-white/50"></div>
            <div className="absolute right-2 top-2 h-2 w-2 rounded-tr-sm border-r border-t border-white/50"></div>
            <div className="absolute bottom-2 left-2 h-2 w-2 rounded-bl-sm border-b border-l border-white/50"></div>
            <div className="absolute bottom-2 right-2 h-2 w-2 rounded-br-sm border-b border-r border-white/50"></div>
          </div>
        </div>

        {/* Footer: Instructions */}
        <div className="flex w-full justify-center">
          <div className="animate-fade-in-up w-full max-w-sm rounded-xl border-t border-primary/30 bg-background-dark/80 p-4 shadow-xl backdrop-blur-md">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <span className="material-symbols-outlined animate-pulse text-primary">
                  videocam
                </span>
              </div>
              <p className="font-display text-sm font-light leading-relaxed tracking-wide text-white">
                {isFound ? (
                  <span className="font-bold text-primary">Đã tìm thấy mảnh ghép!</span>
                ) : (
                  <>
                    Di chuyển camera để quét các{' '}
                    <span className="font-medium text-primary">mảnh ghép ký ức</span>
                  </>
                )}
              </p>
              {/* Progress Dots */}
              <div className="mt-1 flex gap-1">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <div className="h-1 w-1 rounded-full bg-white/20"></div>
                <div className="h-1 w-1 rounded-full bg-white/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scanMove {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        .animate-scan-move {
          animation: scanMove 3s infinite ease-in-out;
        }
        .shadow-glow {
          box-shadow:
            0 0 15px rgba(249, 212, 6, 0.5),
            inset 0 0 15px rgba(249, 212, 6, 0.2);
        }
      `}</style>
    </div>
  );
}
