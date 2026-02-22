import React, { useEffect, useRef } from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';
import { useTranslations } from 'next-intl';

// Hardcoded locations based on the HTML
export const LOCATIONS = [
  {
    id: 'ho-guom',
    name: 'Hồ Hoàn Kiếm',
    top: '50%',
    left: '50%',
    icon: 'temple_buddhist',
    type: 'center',
    color: '#D4AF37',
    order: 0,
  },
  {
    id: 'o-quan-chuong',
    name: 'Ô Quan Chưởng',
    top: '15%',
    left: '50%',
    icon: 'fort',
    color: '#D4AF37',
    order: 1,
  },
  {
    id: 'hang-ngang',
    name: 'Hàng Ngang',
    top: '25%',
    left: '80%',
    icon: 'menu_book',
    color: '#D69E2E',
    order: 2,
  },
  {
    id: 'hang-buom',
    name: 'Hàng Buồm',
    top: '50%',
    left: '90%',
    icon: 'sailing',
    color: '#3182CE',
    order: 3,
  },
  {
    id: 'hang-dong',
    name: 'Hàng Đồng',
    top: '75%',
    left: '80%',
    icon: 'notifications',
    color: '#CD7F32',
    order: 4,
  },
  {
    id: 'hang-bac',
    name: 'Hàng Bạc',
    top: '85%',
    left: '50%',
    icon: 'diamond',
    color: '#805AD5',
    order: 5,
  },
  {
    id: 'dong-xuan',
    name: 'Đồng Xuân',
    top: '75%',
    left: '20%',
    icon: 'storefront',
    color: '#DE2F2F',
    order: 6,
  },
  {
    id: 'hang-trong',
    name: 'Hàng Trống',
    top: '50%',
    left: '10%',
    icon: 'image',
    color: '#E53E3E',
    order: 7,
  },
  {
    id: 'lan-ong',
    name: 'Lãn Ông',
    top: '25%',
    left: '20%',
    icon: 'local_florist',
    color: '#38A169',
    order: 8,
  },
];

export default function MapScreen() {
  const t = useTranslations('game');
  const { setCurrentScreen, setCurrentLocationId, unlockedMemories, resetGame } = useGame();
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const firefliesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial priority selection: Clockwise starting from Ô Quan Chưởng
    const sortedLocations = [...LOCATIONS]
      .filter((loc) => loc.type !== 'center')
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    const nextLocation = sortedLocations.find((loc) => !unlockedMemories.includes(loc.id));
    if (nextLocation) {
      setSelectedId(nextLocation.id);
    }
  }, [unlockedMemories]);

  useEffect(() => {
    // Determine fireflies
    if (firefliesRef.current) {
      const container = firefliesRef.current;
      container.innerHTML = '';
      const fireflyCount = 30;

      for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'absolute rounded-full bg-primary-glow blur-[1px] animate-fly';

        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const animDuration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        const moveX = (Math.random() - 0.5) * 200;
        const moveY = (Math.random() - 0.5) * 200;

        firefly.style.left = `${left}%`;
        firefly.style.top = `${top}%`;
        firefly.style.width = `${size}px`;
        firefly.style.height = `${size}px`;
        firefly.style.animationDuration = `${animDuration}s`;
        firefly.style.animationDelay = `${delay}s`;
        firefly.style.setProperty('--x', `${moveX}px`);
        firefly.style.setProperty('--y', `${moveY}px`);

        container.appendChild(firefly);
      }
    }
  }, []);

  const handleLocationClick = (id: string) => {
    if (id === 'ho-guom') return;

    // Only allow selection if not already completed
    if (!unlockedMemories.includes(id)) {
      setSelectedId(id);
    }
  };

  const handleContinue = () => {
    if (unlockedMemories.length === 8) {
      setCurrentScreen('completion');
      return;
    }
    if (selectedId) {
      setCurrentLocationId(selectedId);
      setCurrentScreen('moving');
    }
  };

  return (
    <div className="font-body relative min-h-screen w-full overflow-hidden bg-background-dark text-white selection:bg-primary selection:text-background-dark">
      {/* Background Gradients */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-navy-mid via-background-dark to-black"></div>

      <div
        ref={firefliesRef}
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      ></div>

      <div className="relative z-10 mx-auto flex h-[100dvh] w-full max-w-md flex-col overflow-hidden">
        {/* Header */}
        <header className="relative flex-none px-6 pb-2 pt-[calc(env(safe-area-inset-top)+1.5rem)] text-center">
          <div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full bg-gradient-to-b from-black/60 to-transparent"></div>
          <div className="relative z-10">
            {/* Reset button */}
            <button
              onClick={resetGame}
              className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/60 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            <p className="mb-1 font-display text-xs uppercase tracking-widest text-primary opacity-80">
              {t('historical_puzzle')}
            </p>
            <h1 className="inline-block border-b border-white/10 bg-gradient-to-r from-primary-glow via-primary to-primary-glow bg-clip-text pb-4 font-display text-2xl font-bold leading-relaxed tracking-widest text-transparent drop-shadow-md md:text-3xl">
              {t('title')} {t('subtitle')}
            </h1>
          </div>
          {/* Progress */}
          <div className="absolute right-4 top-[calc(env(safe-area-inset-top)+1.5rem)] flex items-center space-x-2 rounded-full border border-primary/30 bg-black/40 px-3 py-1 backdrop-blur-sm">
            <span className="material-symbols-outlined text-sm text-primary">stars</span>
            <span className="text-xs font-bold text-primary-glow">{unlockedMemories.length}/8</span>
          </div>
        </header>

        {/* Map Area */}
        <main className="relative flex w-full flex-1 items-center justify-center overflow-hidden px-4">
          <div className="relative aspect-square w-full max-w-[min(400px,80vw)]">
            {/* SVG Path Circle */}
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              viewBox="0 0 400 400"
            >
              <defs>
                <filter height="140%" id="glow" width="140%" x="-20%" y="-20%">
                  <feGaussianBlur result="blur" stdDeviation="3"></feGaussianBlur>
                  <feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
                </filter>
              </defs>
              <ellipse
                cx="200"
                cy="200"
                rx="160"
                ry="140"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeDasharray="10"
                strokeOpacity="0.6"
                className="animate-[dash_30s_linear_infinite]"
                style={{ filter: 'drop-shadow(0 0 4px #F9E79F)' }}
              ></ellipse>
            </svg>

            {/* Nodes */}
            {LOCATIONS.map((loc) => {
              const isUnlocked = unlockedMemories.includes(loc.id);
              const isSelected = selectedId === loc.id;

              // Center Node Special Styling
              if (loc.type === 'center') {
                return (
                  <div
                    key={loc.id}
                    className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-32 w-40 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center"
                  >
                    <div className="absolute inset-0 animate-pulse-slow rounded-full bg-primary/20 blur-3xl"></div>
                    <div className="group relative z-20 flex flex-col items-center">
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-lg border border-primary/50 bg-gradient-to-t from-black/80 to-navy-light/80 shadow-[0_0_30px_rgba(212,175,55,0.3)] backdrop-blur-sm sm:h-20 sm:w-20">
                        <span className="material-symbols-outlined text-3xl text-primary drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] sm:text-4xl">
                          {loc.icon}
                        </span>
                        <div className="absolute -bottom-4 h-8 w-32 rounded-[100%] border-t border-primary/20 bg-blue-500/10 blur-sm"></div>
                      </div>
                      <span className="mt-2 rounded border border-primary/20 bg-black/60 px-2 py-0.5 font-display text-[9px] uppercase tracking-widest text-primary-glow backdrop-blur-md sm:mt-3 sm:text-[10px]">
                        {t(`locations.${loc.id}.name`)}
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={loc.id}
                  onClick={() => handleLocationClick(loc.id)}
                  className={`group absolute -translate-x-1/2 -translate-y-1/2 transform transition-all duration-300
                    ${isUnlocked ? 'pointer-events-none cursor-default' : 'hover:scale-110 active:scale-95'}
                  `}
                  style={{ top: loc.top, left: loc.left }}
                  aria-label={`Visit ${t(`locations.${loc.id}.name`)}`}
                >
                  <div
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all duration-300 sm:h-11 sm:w-11
                      ${isUnlocked
                        ? 'scale-105'
                        : isSelected
                          ? 'scale-110'
                          : 'opacity-70 group-hover:opacity-100'
                      }
                    `}
                    style={{
                      borderColor: isSelected || isUnlocked ? loc.color : `${loc.color}70`,
                      backgroundColor: isSelected
                        ? `${loc.color}25`
                        : isUnlocked
                          ? loc.color
                          : `${loc.color}20`,
                      color:
                        isSelected || isUnlocked
                          ? isUnlocked
                            ? '#0B1120'
                            : loc.color
                          : `${loc.color}BB`,
                      boxShadow: isSelected
                        ? `0 0 25px ${loc.color}60`
                        : isUnlocked
                          ? `0 0 15px ${loc.color}40`
                          : `0 0 10px ${loc.color}20`,
                      borderWidth: isSelected ? '2px' : '1.5px',
                      ['--node-color' as string]: loc.color,
                    }}
                  >
                    {isUnlocked && (
                      <div
                        className="absolute -inset-1 animate-pulse rounded-full blur-[4px]"
                        style={{ backgroundColor: `${loc.color}40` }}
                      ></div>
                    )}
                    {isSelected && (
                      <div
                        className="absolute -inset-2 animate-pulse-slow rounded-full border border-dashed opacity-50"
                        style={{ borderColor: loc.color }}
                      ></div>
                    )}

                    <span
                      className={`material-symbols-outlined relative z-10 text-base sm:text-lg`}
                    >
                      {isUnlocked ? 'check' : loc.icon}
                    </span>
                  </div>

                  <span
                    className={`absolute left-1/2 top-full mt-1.5 w-max -translate-x-1/2 rounded border px-1.5 py-0.5 text-[9px] font-bold backdrop-blur-md transition-all sm:mt-2 sm:px-2 sm:py-1 sm:text-[10px]
                      ${isUnlocked
                        ? 'opacity-100'
                        : isSelected
                          ? '-translate-y-1 transform opacity-100 shadow-md'
                          : 'opacity-75 group-hover:opacity-100'
                      }
                    `}
                    style={{
                      borderColor: isSelected
                        ? loc.color
                        : isUnlocked
                          ? `${loc.color}40`
                          : `${loc.color}35`,
                      backgroundColor: isSelected ? `${loc.color}20` : 'rgba(0,0,0,0.7)',
                      color: isSelected || isUnlocked ? loc.color : `${loc.color}DD`,
                      boxShadow: isSelected ? `0 4px 12px ${loc.color}40` : 'none',
                    }}
                  >
                    {t(`locations.${loc.id}.name`)}
                  </span>
                </button>
              );
            })}
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-20 flex-none bg-gradient-to-t from-black to-transparent px-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-2 md:pb-8">
          <div className="mb-3 text-center">
            <p className="font-display text-[10px] italic text-primary/80 sm:text-xs">
            </p>
          </div>
          <div className="relative h-2.5 w-full overflow-hidden rounded-full border border-white/10 bg-navy-mid shadow-inner sm:h-3">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#8a6e1e] via-primary to-primary-glow shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all duration-1000"
              style={{ width: `${(unlockedMemories.length / 8) * 100}%` }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between text-[9px] font-bold uppercase tracking-wider text-white/40 sm:text-[10px]">
            <span>{t('journey')}</span>
            <span>
              {Math.round((unlockedMemories.length / 8) * 100)}% {t('progress')}
            </span>
          </div>

          <button
            disabled={!selectedId && unlockedMemories.length < 8}
            onClick={handleContinue}
            className={`mt-4 w-full rounded-lg border py-3 font-display font-bold uppercase tracking-[0.15em] transition-all duration-300 sm:mt-6
              ${selectedId || unlockedMemories.length === 8
                ? 'shadow-glow scale-100 cursor-pointer border-primary bg-gradient-to-r from-primary/20 to-primary/30 text-primary hover:bg-primary hover:text-black'
                : 'scale-95 cursor-not-allowed border-white/10 bg-transparent text-white/20 opacity-50'
              }
            `}
          >
            {unlockedMemories.length === 8
              ? t('get_book')
              : selectedId
                ? t('continue')
                : t('select_location')}
          </button>
        </footer>

        {/* Corner Accents */}
        <div className="pointer-events-none absolute left-4 top-[calc(env(safe-area-inset-top)+1rem)] h-8 w-8 rounded-tl-lg border-l border-t border-primary/30 sm:top-4"></div>
        <div className="pointer-events-none absolute right-4 top-[calc(env(safe-area-inset-top)+1rem)] h-8 w-8 rounded-tr-lg border-r border-t border-primary/30 sm:top-4"></div>
        <div className="pointer-events-none absolute bottom-[calc(env(safe-area-inset-bottom)+1rem)] left-4 h-8 w-8 rounded-bl-lg border-b border-l border-primary/30 sm:bottom-4"></div>
        <div className="pointer-events-none absolute bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 h-8 w-8 rounded-br-lg border-b border-r border-primary/30 sm:bottom-4"></div>
      </div>

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 1000;
          }
        }
        @keyframes fly {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--x), var(--y));
            opacity: 0;
          }
        }
        .animate-fly {
          animation: fly 10s infinite;
        }
      `}</style>
    </div>
  );
}
