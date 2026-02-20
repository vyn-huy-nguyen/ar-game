'use client';

import React, { useState, useMemo } from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

// Dynamically import LeafletMap with no SSR to avoid window is not defined errors
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="bg-background-dark flex h-full w-full items-center justify-center text-white/40">
      <div className="flex flex-col items-center gap-4">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"></div>
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

type NavMode = 'overview' | 'navigation';

export default function MovingScreen() {
  const { setCurrentScreen, currentLocationId } = useGame();
  const [mode, setMode] = useState<NavMode>('overview');
  const t = useTranslations('game');

  const location = useMemo(
    () => (currentLocationId ? LOCATION_COORDS[currentLocationId] : null),
    [currentLocationId]
  );

  if (!location) {
    return (
      <div className="bg-background-dark flex h-[100dvh] items-center justify-center text-white">
        <p>No location selected</p>
      </div>
    );
  }

  return (
    <div className="bg-background-dark font-display relative flex h-[100dvh] w-full flex-col overflow-hidden text-white">
      {/* Top Header */}
      <div className="from-background-dark/90 absolute left-0 top-0 z-20 flex w-full items-center justify-between bg-gradient-to-b to-transparent px-4 pb-4 pt-[calc(env(safe-area-inset-top)+1rem)]">
        <button
          onClick={() => (mode === 'navigation' ? setMode('overview') : setCurrentScreen('map'))}
          className="bg-navy-light/50 hover:bg-navy-light/80 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white backdrop-blur-md transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <div className="bg-navy-light/50 flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 backdrop-blur-md">
          <span className="text-primary text-xs font-bold uppercase leading-none tracking-widest">
            {location.name}
          </span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Main Map Content Area */}
      <div className="bg-background-dark relative h-full w-full flex-grow overflow-hidden border-b border-white/5">
        {mode === 'navigation' ? (
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
                <div className="bg-primary absolute inset-0 animate-pulse rounded-full opacity-40 blur-lg"></div>
                <div className="border-primary shadow-glow-strong bg-background-dark relative rounded-full border-2 p-3">
                  <span className="material-symbols-outlined text-primary text-4xl">
                    temple_buddhist
                  </span>
                </div>
              </div>
              <div className="border-primary/30 text-primary mt-3 whitespace-nowrap rounded border bg-black/60 px-4 py-2 text-sm font-bold shadow-lg backdrop-blur-sm">
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
          className={`transition-all duration-500 ${mode === 'overview' ? 'translate-y-0 opacity-100' : 'pointer-events-none fixed translate-y-20 opacity-0'}`}
        >
          <div className="bg-navy-light/40 mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/10 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl">
            <div className="via-primary h-1 w-full bg-gradient-to-r from-transparent to-transparent opacity-50"></div>
            <div className="flex flex-col gap-4 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-primary/90 mb-1 flex items-center gap-1 text-xs font-bold uppercase tracking-widest">
                    <span className="material-symbols-outlined text-sm">history_edu</span>
                    {t('current_mission')}
                  </h2>
                  <p className="font-display text-base font-medium leading-relaxed text-white">
                    {t.rich('mission_desc', {
                      location: location.name,
                      span: (chunks) => (
                        <span className="text-primary border-primary/30 border-b pb-0.5">
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
                  onClick={() => setMode('navigation')}
                  className="bg-primary hover:bg-primary/90 text-navy-dark shadow-glow flex flex-1 items-center justify-center gap-3 rounded-xl py-4 text-sm font-black uppercase tracking-widest transition-all active:scale-95"
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
          className={`transition-all duration-500 ${mode === 'navigation' ? 'translate-y-0 opacity-100' : 'pointer-events-none fixed translate-y-20 opacity-0'}`}
        >
          <button
            onClick={() => setCurrentScreen('arrival')}
            className="animate-pulse-glow bg-primary text-navy-dark shadow-glow-strong mx-auto block h-16 w-full max-w-[320px] rounded-2xl border border-white/20 font-black uppercase tracking-[0.2em] transition-all active:scale-95"
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
