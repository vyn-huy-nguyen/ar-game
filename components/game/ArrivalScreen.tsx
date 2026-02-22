import React, { useState, useMemo } from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#0f1420]/50" />,
});

const LOCATION_COORDS: Record<string, { lat: number; lng: number }> = {
  'ho-guom': { lat: 21.0285, lng: 105.8542 },
  'o-quan-chuong': { lat: 21.0366, lng: 105.8528 },
  'hang-buom': { lat: 21.0355, lng: 105.8525 },
  'hang-dong': { lat: 21.0345, lng: 105.852 },
  'hang-trong': { lat: 21.0305, lng: 105.8505 },
  'lan-ong': { lat: 21.035, lng: 105.849 },
  'dong-xuan': { lat: 21.0375, lng: 105.8495 },
  'hang-ma': { lat: 21.0365, lng: 105.8485 },
  'hang-ngang': { lat: 21.034, lng: 105.851 },
};

export default function ArrivalScreen() {
  const { setCurrentScreen, currentLocationId } = useGame();
  const [view, setView] = useState<'splash' | 'info'>('splash');
  const t = useTranslations('game');

  const locId = currentLocationId || 'default';

  const coords = useMemo(() => {
    return LOCATION_COORDS[locId] || LOCATION_COORDS['ho-guom'];
  }, [locId]);

  const info = useMemo(() => {
    try {
      return t.raw(`locations.${locId}`);
    } catch {
      return t.raw('locations.o-quan-chuong'); // Fallback
    }
  }, [t, locId]);

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-navy-deep font-display text-white transition-colors duration-700 selection:bg-primary selection:text-black">
      {/* Decorative Border Frame (Splash only) */}
      {view === 'splash' && (
        <div className="pointer-events-none fixed inset-4 z-20 rounded-[2rem] border border-primary/30 shadow-[0_0_15px_rgba(249,212,6,0.1)]"></div>
      )}

      {/* Background Effects */}
      <div className="absolute inset-0 z-0 bg-[#0f1420]">
        {/* Background Map Context - Screen 4 Map Requirement */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-20 contrast-125 grayscale">
          <LeafletMap
            targetLat={coords.lat}
            targetLng={coords.lng}
            targetName={t(`locations.${locId}.name`)}
            interactive={false}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(249,212,6,0.15)_0%,rgba(15,20,32,0)_70%)]"></div>
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('https://www.transparenttextures.com/patterns/dust.png')",
          }}
        ></div>

        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-particle-rise rounded-full bg-primary opacity-30 blur-[1px]"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              bottom: '5%',
              left: `${Math.random() * 90 + 5}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Header: Navigation Icons */}
      <div className="relative z-40 flex w-full shrink-0 items-start justify-between px-6 pb-4 pt-[calc(env(safe-area-inset-top)+1.5rem)]">
        <button
          onClick={() => (view === 'info' ? setView('splash') : setCurrentScreen('moving'))}
          className="group flex size-10 items-center justify-center rounded-full border border-primary/20 bg-navy-light/60 text-primary shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-navy-deep active:scale-95"
        >
          <span className="material-symbols-outlined !text-[20px] transition-transform group-hover:-translate-x-0.5">
            arrow_back
          </span>
        </button>

        <div className="flex gap-4">
          <button
            onClick={() => setView('info')}
            className={`flex size-10 items-center justify-center rounded-full border shadow-lg backdrop-blur-sm transition-all duration-300 active:scale-95
              ${view === 'info' ? 'border-primary bg-primary text-navy-deep' : 'border-primary/20 bg-navy-light/60 text-primary hover:bg-primary hover:text-navy-deep'}`}
            title={t('arrival.info_title')}
          >
            <span className="material-symbols-outlined !text-[20px]">menu_book</span>
          </button>

          <button
            onClick={() => setCurrentScreen('library')}
            className="group flex size-10 items-center justify-center rounded-full border border-primary/20 bg-navy-light/60 text-primary shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-navy-deep active:scale-95"
            title={t('arrival.library_hint')}
          >
            <span className="material-symbols-outlined !text-[20px]">inventory_2</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
        {view === 'splash' ? (
          /* SPLASH VIEW (SCREEN 5) */
          <div className="animate-fade-in flex flex-1 flex-col items-center justify-center p-6 text-center">
            <div className="animate-fade-in space-y-8">
              <div className="mx-auto h-12 w-px bg-gradient-to-b from-transparent via-primary to-transparent opacity-50"></div>

              <div className="relative px-4">
                <div className="absolute inset-0 scale-150 rounded-full bg-primary/10 blur-2xl"></div>
                <h1 className="relative text-3xl font-bold leading-tight tracking-wide text-primary drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] md:text-5xl">
                  {t('arrival.title')}
                  <br />
                  <span className="text-white">{t('arrival.subtitle')}</span>
                </h1>
                <p className="mt-4 font-sans text-sm font-bold uppercase tracking-widest text-primary/60">
                  Hà Nội • {t(`locations.${locId}.name`)}
                </p>
              </div>

              <div className="mx-auto h-12 w-px bg-gradient-to-b from-transparent via-primary to-transparent opacity-50"></div>
            </div>

            {/* Footer: Scan Button (Splash only) */}
            <div className="mt-8 flex w-full flex-col items-center justify-end space-y-6">
              <button
                onClick={() => setCurrentScreen('scanning')}
                className="group relative w-full max-w-xs"
              >
                <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary opacity-40 blur transition-opacity duration-500 group-hover:opacity-60"></div>
                <div className="relative flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-primary font-black tracking-widest text-navy-deep shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
                  <span className="material-symbols-outlined mr-2 animate-pulse">radar</span>
                  {t('arrival.scan_button')}
                  <div className="group-hover:animate-shimmer-fast absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </div>
              </button>
              <p className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">
                {t('arrival.scan_hint')}
              </p>
            </div>
          </div>
        ) : (
          /* INFO VIEW (SCREEN 5.1 REDESIGN) */
          <div className="animate-fade-in-up mx-auto flex min-h-0 w-full max-w-6xl flex-1 items-center justify-center overflow-hidden p-3 md:aspect-[16/9] md:p-8">
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] border border-primary/20 bg-navy-mid shadow-2xl md:flex-row md:rounded-[3.5rem]">
              {/* Left Side: Photo */}
              <div className="group relative h-40 w-full shrink-0 overflow-hidden md:h-full md:w-1/2">
                <div className="absolute inset-0 z-10 bg-navy-deep/20"></div>
                <img
                  alt={`${info.title} Historical Photo`}
                  className="sepia-filter h-full w-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                  src={
                    info.photo ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDkYYgAtSHck1GUzYNJCg7rS9rPKGfGzLoUvy1wZ422LNEoo_hSLKt0sbpMYoKdYvpHBJBW1E1lZvWLDNcPDnK9_2I0xz002BO-nP2e6RnXbn3Z-OHDqFw5bLSQ8WLVA1xln8A4zkPAuWLq4dE4US_lIvWr55USKSExWFZd2H3YacVa7U1I50S1I0N2L-mMFxBO70uhmXbEQHdjqd0xxr5JnzpsJjb-fh4JOkDOwgBFqaggPgQYGyqZeNqaGNPXpgSKRX4xTbD9R8ne'
                  }
                />
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-navy-mid via-navy-mid/40 to-transparent md:bg-gradient-to-r"></div>
                <div className="absolute bottom-2 left-5 z-30 opacity-80">
                  <div className="text-primary-dim font-serif text-[9px] italic">{info.year}</div>
                </div>
              </div>

              {/* Right Side: Text Details */}
              <div className="scrollbar-hide relative z-30 flex min-h-0 w-full flex-1 flex-col overflow-y-auto overflow-x-hidden p-6 md:h-full md:w-1/2 md:p-12">
                <div className="mb-3 h-1 w-10 bg-gradient-to-r from-primary to-transparent opacity-80"></div>
                <h2 className="mb-0.5 font-display text-2xl font-bold tracking-tight text-primary drop-shadow-sm md:text-5xl">
                  {info.title}
                </h2>
                <p className="mb-4 font-sans text-[9px] uppercase tracking-[0.2em] text-primary/60">
                  {info.subtitle}
                </p>

                <div className="min-h-0 flex-1 space-y-5">
                  <div>
                    <h3 className="mb-1 flex items-center gap-2 text-[11px] font-bold text-white/90">
                      <span className="h-1 w-1 rounded-full bg-primary"></span>
                      {t('arrival.history_label')}
                    </h3>
                    <p className="border-l border-primary/10 py-0.5 pl-3 text-justify font-sans text-[11px] leading-relaxed text-white/70">
                      {info.history}
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-1 flex items-center gap-2 text-[11px] font-bold text-white/90">
                      <span className="h-1 w-1 rounded-full bg-primary"></span>
                      {t('arrival.culture_label')}
                    </h3>
                    <p className="border-l border-primary/10 py-0.5 pl-3 text-justify font-sans text-[11px] leading-relaxed text-white/70">
                      {info.culture}
                    </p>
                  </div>

                  <div className="relative mt-1 rounded-xl border border-white/5 bg-white/5 p-4">
                    <span className="material-symbols-outlined absolute left-1.5 top-1.5 text-lg text-primary/10">
                      format_quote
                    </span>
                    <p className="whitespace-pre-line px-4 text-center font-serif text-[10px] italic leading-relaxed text-primary/60">
                      &quot;{info.quote}&quot;
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex shrink-0 items-center justify-between border-t border-white/5 pb-4 pt-5 md:pb-0">
                  <div className="xs:flex flex hidden items-center gap-2 text-[10px] text-white/30">
                    <span className="material-symbols-outlined text-sm">visibility</span>
                    <span>{t('arrival.discovered')}</span>
                  </div>
                  <button
                    onClick={() => setView('splash')}
                    className="xs:w-auto from-primary-dim flex w-full transform items-center justify-center gap-2 rounded-full bg-gradient-to-r to-primary px-8 py-3 text-[10px] font-black uppercase tracking-[0.15em] text-navy-deep shadow-xl transition-all hover:scale-105 hover:shadow-primary/20"
                  >
                    {t('arrival.continue_btn')}
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer-fast {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer-fast {
          animation: shimmer-fast 1s infinite linear;
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
            transform: translateY(-300px) scale(1.5);
            opacity: 0;
          }
        }
        .animate-particle-rise {
          animation: particle-rise 4s linear infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s infinite ease-in-out;
        }
        .sepia-filter {
          filter: sepia(0.8) contrast(1.1) brightness(0.9);
        }
      `}</style>
    </div>
  );
}
