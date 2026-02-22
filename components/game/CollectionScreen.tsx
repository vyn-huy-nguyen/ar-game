/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';
import { useTranslations } from 'next-intl';

// Background images per location (used for both background blur and card)
const LOCATION_BG: Record<string, string> = {
  'o-quan-chuong': '/images/img1-1.jpg',
};

const DEFAULT_BG = '/images/img1-1.jpg';

export default function CollectionScreen() {
  const { setCurrentScreen, currentLocationId, unlockedMemories } = useGame();
  const t = useTranslations('game');

  const locId = currentLocationId || 'o-quan-chuong';

  const info = useMemo(() => {
    try {
      return t.raw(`locations.${locId}`);
    } catch {
      return t.raw('locations.o-quan-chuong');
    }
  }, [t, locId]);

  const bgUrl = useMemo(() => {
    return LOCATION_BG[locId] || DEFAULT_BG;
  }, [locId]);

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/pdf/pdf1.pdf';
    link.download = 'ky-uc-ha-noi.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContinue = () => {
    // TODO: Revert — temporarily always go to completion for preview
    setCurrentScreen('completion');
  };

  // const handleContinue = () => {
  //   if (unlockedMemories.length === 8) {
  //     setCurrentScreen('completion');
  //   } else {
  //     setCurrentScreen('map');
  //   }
  // };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#0f172a] font-display text-white">
      {/* Background Hero with Blur */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full scale-105 bg-cover bg-center blur-sm"
          style={{ backgroundImage: `url('${bgUrl}')` }}
        ></div>
        <div className="absolute inset-0 bg-[#0f172a]/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Particle System */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div className="particle absolute left-[20%] top-[60%] h-1 w-1 animate-particle-rise"></div>
        <div
          className="particle absolute left-[50%] top-[50%] h-1.5 w-1.5 animate-particle-rise"
          style={{ animationDelay: '1.2s' }}
        ></div>
        <div
          className="particle absolute left-[70%] top-[55%] h-0.5 w-0.5 animate-particle-rise"
          style={{ animationDelay: '0.5s' }}
        ></div>
        <div
          className="particle absolute left-[35%] top-[65%] h-1 w-1 animate-particle-rise"
          style={{ animationDelay: '2.1s' }}
        ></div>
        <div
          className="particle absolute left-[80%] top-[45%] h-1 w-1 animate-particle-rise"
          style={{ animationDelay: '1.5s' }}
        ></div>
        <div
          className="particle absolute left-[45%] top-[40%] h-2 w-2 animate-particle-rise bg-white blur-[1px]"
          style={{ animationDelay: '0.8s' }}
        ></div>
      </div>

      {/* Main UI Container */}
      <div className="relative z-20 mx-auto flex h-full w-full max-w-md flex-col items-center justify-center p-4 pb-8">
        {/* Header Label */}
        <div className="absolute top-8 w-full text-center">
          <h2 className="font-body mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
            {t('found_fragment')}
          </h2>
          <div className="mx-auto h-px w-8 bg-primary/40"></div>
        </div>

        {/* Memory Reward Card */}
        <div className="relative mb-6 h-60 w-48 animate-float">
          <div className="absolute inset-0 scale-110 rounded-full bg-primary opacity-30 blur-[30px]"></div>
          <div className="gold-gradient-border card-3d relative h-full w-full overflow-hidden rounded-lg shadow-[0_0_15px_rgba(249,212,6,0.5)]">
            <div className="pointer-events-none absolute inset-[2px] z-20 rounded-md border border-primary/30"></div>
            <div
              className="sepia-filter relative h-full w-full rounded-xl bg-cover bg-center"
              style={{ backgroundImage: `url('${bgUrl}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-transparent to-transparent"></div>

              {/* Star badge */}
              <div className="absolute right-2 top-2 z-30 rounded-full border border-primary/40 bg-black/60 p-1 backdrop-blur-sm">
                <span className="material-symbols-outlined text-xs text-primary">star</span>
              </div>

              {/* Location info at bottom */}
              <div className="absolute bottom-3 left-3 right-3 z-30">
                <p className="mb-0.5 text-[8px] font-bold uppercase tracking-widest text-primary/80">
                  {info.year}
                </p>
                <h3 className="text-sm font-bold leading-tight text-white">{info.fullName}</h3>
              </div>
            </div>

            {/* Hover shine effect */}
            <div className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>
          </div>
        </div>

        {/* Reward Panel */}
        <div className="glass-panel animate-fade-in-up relative w-full overflow-hidden rounded-xl p-4">
          <div className="absolute left-1/2 top-0 h-[1.5px] w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70"></div>

          <div className="space-y-3 text-center">
            <div className="flex flex-col items-center gap-1.5">
              {/* Folder icon */}
              <div className="mb-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-[18px]">folder_open</span>
              </div>
              <h3 className="text-base font-medium text-white">{t('fact.add_to_collection')}</h3>
              <p className="font-body text-xs font-light text-white/60">{t('get_book')}</p>
            </div>

            <div className="my-1.5 h-px w-full bg-white/10"></div>

            {/* Download PDF button */}
            <button
              onClick={handleDownloadPDF}
              className="group relative w-full transform overflow-hidden rounded-lg bg-gradient-to-r from-primary to-[#ffe55c] px-4 py-2.5 text-sm font-bold text-[#0f172a] shadow-[0_0_20px_rgba(249,212,6,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,212,6,0.5)] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">download</span>
                {t('download_pdf')}
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer"></div>
            </button>

            {/* Close & Continue */}
            <button
              onClick={handleContinue}
              className="font-body mt-2 text-xs font-bold uppercase tracking-widest text-white/40 transition-colors hover:text-white/80"
            >
              {t('arrival.close_btn')}
            </button>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-4 top-4 h-12 w-12 rounded-tl-xl border-l border-t border-primary/20"></div>
      <div className="pointer-events-none absolute bottom-4 right-4 h-12 w-12 rounded-br-xl border-b border-r border-primary/20"></div>

      <style jsx>{`
        .glass-panel {
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
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
          transform: perspective(1000px) rotateY(5deg);
        }
        .sepia-filter {
          filter: sepia(0.6) contrast(1.1) brightness(0.9);
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
          position: absolute;
          background-color: #f9d406;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
