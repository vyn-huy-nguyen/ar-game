import React, { useMemo } from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';
import { useTranslations } from 'next-intl';

export default function CollectionScreen() {
  const { setCurrentScreen, currentLocationId, unlockedMemories } = useGame();
  const t = useTranslations('game');

  const info = useMemo(() => {
    const locId = currentLocationId || 'o-quan-chuong';
    try {
      return t.raw(`locations.${locId}`);
    } catch {
      return t.raw('locations.o-quan-chuong');
    }
  }, [t, currentLocationId]);

  return (
    <div className="bg-navy-900 relative h-[100dvh] w-full overflow-hidden font-display text-white">
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
        <div className="absolute left-[20%] top-[60%] h-1 w-1 animate-particle-rise rounded-full bg-primary opacity-40"></div>
        <div
          className="absolute left-[50%] top-[50%] h-1.5 w-1.5 animate-particle-rise rounded-full bg-primary opacity-60"
          style={{ animationDelay: '1.2s' }}
        ></div>
        <div
          className="absolute left-[70%] top-[55%] h-0.5 w-0.5 animate-particle-rise rounded-full bg-primary opacity-30"
          style={{ animationDelay: '0.5s' }}
        ></div>
      </div>

      {/* Main UI Container */}
      <div className="relative z-20 mx-auto flex h-full w-full max-w-md flex-col items-center justify-center p-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-[calc(env(safe-area-inset-top)+1rem)]">
        <div className="absolute top-10 w-full text-center">
          <h2 className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-primary/80">
            {t('found_fragment')}
          </h2>
          <div className="mx-auto h-px w-12 bg-primary/40"></div>
        </div>

        {/* Memory Reward Card */}
        <div className="relative mb-10 h-64 w-52 animate-float sm:h-80 sm:w-64">
          <div className="absolute inset-0 scale-110 rounded-full bg-primary opacity-30 blur-[40px]"></div>
          <div className="gold-gradient-border card-3d bg-navy-800 shadow-glow-gold relative h-full w-full overflow-hidden rounded-xl transition-all duration-700">
            <div className="pointer-events-none absolute inset-[2px] z-20 rounded-lg border border-primary/30"></div>
            <div
              className="relative h-full w-full rounded-xl bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDkYYgAtSHck1GUzYNJCg7rS9rPKGfGzLoUvy1wZ422LNEoo_hSLKt0sbpMYoKdYvpHBJBW1E1lZvWLDNcPDnK9_2I0xz002BO-nP2e6RnXbn3Z-OHDqFw5bLSQ8WLVA1xln8A4zkPAuWLq4dE4US_lIvWr55USKSExWFZd2H3YacVa7U1I50S1I0N2L-mMFxBO70uhmXbEQHdjqd0xxr5JnzpsJjb-fh4JOkDOwgBFqaggPgQYGyqZeNqaGNPXpgSKRX4xTbD9R8ne')`,
              }}
            >
              <div className="from-navy-900/90 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"></div>
              <div className="absolute right-3 top-3 z-30 rounded-full border border-primary/40 bg-black/60 p-1.5 backdrop-blur-sm">
                <span className="material-symbols-outlined text-sm text-primary">star</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-30">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary/80">
                  {info.year}
                </p>
                <h3 className="text-lg font-bold leading-tight text-white">{info.title}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Reward Panel */}
        <div className="glass-panel animate-fade-in-up relative w-full overflow-hidden rounded-2xl p-6">
          <div className="absolute left-1/2 top-0 h-[2px] w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70"></div>
          <div className="space-y-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                <span className="material-symbols-outlined">folder_open</span>
              </div>
              <h3 className="text-lg font-medium text-white">{t('fact.add_to_collection')}</h3>
              <p className="font-sans text-sm font-light text-white/60">{t('get_book')}</p>
            </div>
            <div className="my-2 h-px w-full bg-white/10"></div>
            <button className="text-navy-900 group relative w-full transform overflow-hidden rounded-lg bg-gradient-to-r from-primary to-[#ffe55c] px-6 py-3.5 font-bold shadow-[0_0_20px_rgba(249,212,6,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,212,6,0.5)] active:scale-[0.98]">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">download</span>
                {t('download_pdf')}
              </span>
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            </button>
            <button
              onClick={() =>
                unlockedMemories.length === 8
                  ? setCurrentScreen('completion')
                  : setCurrentScreen('map')
              }
              className="mt-2 font-sans text-xs font-bold uppercase tracking-widest text-white/40 transition-colors hover:text-white/80"
            >
              {t('arrival.continue_btn')}
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
      `}</style>
    </div>
  );
}
