'use client';

import React, { useMemo } from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

// Dynamically import LeafletMap with no SSR to avoid window is not defined errors
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-background-dark text-white/40">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        <p className="font-display text-xs uppercase tracking-widest">Đang tải bản đồ...</p>
      </div>
    </div>
  ),
});

const LOCATION_COORDS: Record<string, { lat: number; lng: number; name: string }> = {
  'o-quan-chuong': { lat: 21.0366, lng: 105.8528, name: 'Ô Quan Chưởng' },
  'hang-buom': { lat: 21.0355, lng: 105.8525, name: 'Phố Hàng Buồm' },
  'hang-dong': { lat: 21.0345, lng: 105.852, name: 'Phố Hàng Đồng' },
  'hang-trong': { lat: 21.0305, lng: 105.8505, name: 'Phố Hàng Trống' },
  'lan-ong': { lat: 21.035, lng: 105.849, name: 'Phố Lãn Ông' },
  'dong-xuan': { lat: 21.0375, lng: 105.8495, name: 'Chợ Đồng Xuân' },
  'hang-ma': { lat: 21.0365, lng: 105.8485, name: 'Phố Hàng Mã' },
  'hang-ngang': { lat: 21.034, lng: 105.851, name: 'Phố Hàng Ngang' },
};

export default function MovingScreen() {
  const { setCurrentScreen, currentLocationId, movingMode, setMovingMode } = useGame();
  const t = useTranslations('game');

  const location = useMemo(
    () => (currentLocationId ? LOCATION_COORDS[currentLocationId] : null),
    [currentLocationId]
  );

  if (!location) {
    return (
      <div className="flex h-[100dvh] items-center justify-center bg-background-dark text-white">
        <p>No location selected</p>
      </div>
    );
  }

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-background-dark font-display text-white">
      {/* Top Header */}
      <div className="absolute left-0 top-0 z-20 flex w-full items-center justify-between bg-gradient-to-b from-background-dark/90 to-transparent px-4 pb-4 pt-[calc(env(safe-area-inset-top)+1rem)]">
        <button
          onClick={() =>
            movingMode === 'navigation' ? setMovingMode('overview') : setCurrentScreen('map')
          }
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-navy-light/50 text-white backdrop-blur-md transition-colors hover:bg-navy-light/80"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-navy-light/50 px-3 py-1 backdrop-blur-md">
          <span className="text-xs font-bold uppercase leading-none tracking-widest text-primary">
            {location.name}
          </span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Main Map Content Area */}
      <div className="relative h-full w-full flex-grow overflow-hidden border-b border-white/5 bg-background-dark">
        {movingMode === 'navigation' ? (
          // REAL-TIME NAVIGATION MODE (Leaflet)
          <div className="animate-in fade-in absolute inset-0 z-0 duration-1000">
            <LeafletMap
              targetLat={location.lat}
              targetLng={location.lng}
              targetName={location.name}
            />
          </div>
        ) : (
          // OVERVIEW MODE (Mission Card)
          <>
            {/* Background Grid & Decorative Streets */}
            <div className="map-grid absolute inset-0 opacity-20">
              <svg
                height="100%"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-30"
              >
                <path
                  d="M-10,300 Q150,280 200,450 T450,550"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="20"
                />
                <path d="M180,0 L220,900" fill="none" stroke="#334155" strokeWidth="15" />
                <path d="M0,500 L500,450" fill="none" stroke="#334155" strokeWidth="12" />
                <path
                  d="M300,100 C350,200 450,250 500,280"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="18"
                />
              </svg>
            </div>

            {/* Destination Marker */}
            <div className="absolute left-[65%] top-[35%] z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-primary opacity-40 blur-lg"></div>
                <div className="shadow-glow-strong relative rounded-full border-2 border-primary bg-background-dark p-3">
                  <span className="material-symbols-outlined text-4xl text-primary">
                    temple_buddhist
                  </span>
                </div>
              </div>
              <div className="mt-3 whitespace-nowrap rounded border border-primary/30 bg-black/60 px-4 py-2 text-sm font-bold text-primary shadow-lg backdrop-blur-sm">
                {location.name}
              </div>
            </div>

            {/* Static User Placeholder */}
            <div className="absolute bottom-[20%] left-[25%] z-10 -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex items-center justify-center">
                <div className="pulse-ring absolute h-16 w-16 rounded-full bg-blue-500 opacity-30"></div>
                <div className="z-10 h-5 w-5 rounded-full border-2 border-white bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Panel */}
      <div className="relative z-30 flex-none overflow-hidden px-4 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-4">
        {/* Mission Control Panel (Overview Mode) */}
        <div
          className={`transition-all duration-500 ${movingMode === 'overview' ? 'translate-y-0 opacity-100' : 'pointer-events-none fixed translate-y-20 opacity-0'}`}
        >
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-navy-light/40 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl">
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
            <div className="flex flex-col gap-4 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="mb-1 flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary/90">
                    <span className="material-symbols-outlined text-sm">history_edu</span>
                    {t('current_mission')}
                  </h2>
                  <p className="font-display text-base font-medium leading-relaxed text-white">
                    {t.rich('mission_desc', {
                      location: location.name,
                      span: (chunks) => (
                        <span className="border-b border-primary/30 pb-0.5 text-primary">
                          {chunks}
                        </span>
                      ),
                    })}
                  </p>
                </div>
                <div className="bg-navy-dark/50 flex min-w-[70px] flex-col items-center justify-center rounded-lg border border-white/5 p-2">
                  <span className="text-xl font-black uppercase italic tracking-tighter text-white">
                    350
                  </span>
                  <span className="text-[10px] font-bold uppercase text-gray-400">
                    {t('meters')}
                  </span>
                </div>
              </div>

              <div className="mt-2 flex gap-3">
                <button
                  onClick={() => setMovingMode('navigation')}
                  className="text-navy-dark shadow-glow flex flex-1 items-center justify-center gap-3 rounded-xl bg-primary py-4 text-sm font-black uppercase tracking-widest transition-all hover:bg-primary/90 active:scale-95"
                >
                  <span>{t('start_walking')}</span>
                  <span className="material-symbols-outlined text-xl">navigation</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Arrival Action Bar (Navigation Mode) */}
        <div
          className={`transition-all duration-500 ${movingMode === 'navigation' ? 'translate-y-0 opacity-100' : 'pointer-events-none fixed translate-y-20 opacity-0'}`}
        >
          <button
            onClick={() => setCurrentScreen('arrival')}
            className="text-navy-dark shadow-glow-strong mx-auto block h-16 w-full max-w-[320px] animate-pulse-glow rounded-2xl border border-white/20 bg-primary font-black uppercase tracking-[0.2em] transition-all active:scale-95"
          >
            Đã đến nơi
          </button>
        </div>
      </div>

      <style jsx global>{`
        .map-grid {
          background-image:
            linear-gradient(rgba(30, 41, 59, 0.4) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(30, 41, 59, 0.4) 1.5px, transparent 1.5px);
          background-size: 40px 40px;
        }

        .pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(0.33);
            opacity: 0.8;
          }
          80%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 15px rgba(249, 212, 6, 0.4);
          }
          50% {
            box-shadow: 0 0 30px rgba(249, 212, 6, 0.7);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        .clip-path-cone {
          clip-path: polygon(50% 100%, 0 0, 100% 0);
        }
      `}</style>
    </div>
  );
}
