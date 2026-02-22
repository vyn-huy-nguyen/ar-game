/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useRef } from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { LeafletMapHandle } from './LeafletMap';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#0f1420]/50" />,
});

const LOCATION_COORDS: Record<string, { lat: number; lng: number; name: string }> = {
  'ho-guom': { lat: 21.0285, lng: 105.8542, name: 'Hồ Hoàn Kiếm' },
  'o-quan-chuong': { lat: 21.0366, lng: 105.8528, name: 'Ô Quan Chưởng' },
  'hang-ngang': { lat: 21.034, lng: 105.851, name: 'Phố Hàng Ngang' },
  'hang-buom': { lat: 21.0355, lng: 105.8525, name: 'Phố Hàng Buồm' },
  'hang-dong': { lat: 21.0345, lng: 105.852, name: 'Phố Hàng Đồng' },
  'hang-bac': { lat: 21.0338, lng: 105.8525, name: 'Phố Hàng Bạc' },
  'dong-xuan': { lat: 21.0375, lng: 105.8495, name: 'Chợ Đồng Xuân' },
  'hang-trong': { lat: 21.0305, lng: 105.8505, name: 'Phố Hàng Trống' },
  'lan-ong': { lat: 21.035, lng: 105.849, name: 'Phố Lãn Ông' },
};

export default function MovingScreen() {
  const {
    setCurrentScreen,
    currentLocationId,
    movingMode,
    setMovingMode,
    userLocation,
    locationError,
    retryLocation,
    setMockLocation,
  } = useGame();
  const [distance, setDistance] = React.useState<number | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const t = useTranslations('game');
  const mapRef = useRef<LeafletMapHandle>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Haversine distance formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Earth's radius in meters
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
  };

  const location = useMemo(
    () => (currentLocationId ? LOCATION_COORDS[currentLocationId] : null),
    [currentLocationId]
  );

  // Update distance and handle auto-arrival
  React.useEffect(() => {
    if (userLocation && location) {
      const d = calculateDistance(userLocation.lat, userLocation.lng, location.lat, location.lng);
      setDistance(d);

      // Auto-transition to arrival screen when reached (within 20m)
      if (d < 20) {
        setCurrentScreen('arrival');
      }
    }
  }, [userLocation, location, setCurrentScreen]);

  if (!location) {
    return (
      <div className="flex h-[100dvh] items-center justify-center bg-background-dark text-white">
        <p>No location selected</p>
      </div>
    );
  }

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[#0f1420] font-display text-white selection:bg-primary selection:text-black">
      {/* Decorative Frame */}
      <div className="pointer-events-none fixed inset-4 z-40 rounded-[2rem] border border-primary/20 shadow-[inset_0_0_30px_rgba(15,20,32,0.6)]"></div>

      {/* Top Header */}
      <div className="absolute inset-x-0 top-0 z-[60] flex items-start justify-between p-6 pt-[calc(env(safe-area-inset-top)+1.5rem)]">
        <button
          onClick={() =>
            movingMode === 'navigation' ? setMovingMode('overview') : setCurrentScreen('map')
          }
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-primary text-black shadow-[0_0_15px_rgba(249,212,6,0.4)] transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <span className="material-symbols-outlined text-2xl font-bold">
            {movingMode === 'navigation' ? 'arrow_back' : 'close'}
          </span>
        </button>

        <div className="max-w-[65%] translate-y-1 transform rounded-full border border-primary/40 bg-[#0f1420]/95 px-6 py-2 shadow-[0_0_20px_rgba(0,0,0,0.8)] ring-1 ring-primary/10 backdrop-blur-md">
          <h1 className="truncate text-center font-display text-sm font-bold uppercase tracking-widest text-primary sm:text-base">
            {currentLocationId ? t(`locations.${currentLocationId}.name`) : t('old_quarter')}
          </h1>
        </div>

        {movingMode === 'navigation' ? (
          <button
            onClick={() => setCurrentScreen('library')}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-[#0f1420]/80 text-primary shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          >
            <span className="material-symbols-outlined text-2xl">menu_book</span>
            <div className="absolute right-[5px] top-[5px] h-2 w-2 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
          </button>
        ) : (
          <button></button>
        )}
      </div>

      {/* Floating Map Controls - Refined for Screen 4 Layout */}
      {movingMode === 'navigation' && (
        <>
          {/* BOTTOM CENTER: Navigation Bar - Compact design to matched UI3 Screen 4 */}
          <div className="pointer-events-auto fixed bottom-8 left-1/2 z-[60] flex min-w-[210px] -translate-x-1/2 transform items-center justify-between gap-1 rounded-full border border-primary/40 bg-[#0f1420]/95 p-1.5 shadow-[0_0_30px_rgba(0,0,0,0.8)] ring-1 ring-white/10 backdrop-blur-3xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-navy-deep shadow-[0_0_20px_rgba(249,212,6,0.6)]">
              <span className="material-symbols-outlined text-xl font-black">location_on</span>
            </div>
            <button className="flex h-9 w-9 items-center justify-center text-primary/40 transition-all hover:text-primary active:scale-90">
              <span className="material-symbols-outlined text-xl">route</span>
            </button>
            <button className="flex h-9 w-9 items-center justify-center text-primary/40 transition-all hover:text-primary active:scale-90">
              <span className="material-symbols-outlined text-xl">search</span>
            </button>
          </div>

          {/* BOTTOM RIGHT: Zoom Controls - Compact to avoid overlap */}
          <div className="pointer-events-auto fixed bottom-8 right-6 z-[60] flex flex-col gap-2 sm:right-10">
            <button
              onClick={() => mapRef.current?.zoomIn()}
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-[#0f1420]/90 text-primary shadow-xl backdrop-blur-xl transition-all hover:bg-primary hover:text-navy-deep active:scale-90"
            >
              <span className="material-symbols-outlined text-lg font-bold">add</span>
            </button>
            <button
              onClick={() => mapRef.current?.zoomOut()}
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-[#0f1420]/90 text-primary shadow-xl backdrop-blur-xl transition-all hover:bg-primary hover:text-navy-deep active:scale-90"
            >
              <span className="material-symbols-outlined text-lg font-bold">remove</span>
            </button>
          </div>
        </>
      )}

      {/* Main Map Content Area */}
      <div className="relative h-full w-full flex-grow overflow-hidden bg-[#0f1420]">
        {/* UNIVERSAL MAP BACKGROUND */}
        <div className="animate-fade-in absolute inset-0 z-0 duration-1000">
          {mounted && (
            <LeafletMap
              ref={mapRef}
              targetLat={location.lat}
              targetLng={location.lng}
              targetName={currentLocationId ? t(`locations.${currentLocationId}.name`) : ''}
              interactive={movingMode === 'navigation'}
            />
          )}
        </div>

        {/* COMPASS UI (From Screen 3 PNG) */}
        {/* <div className="pointer-events-none absolute right-5 top-20 z-20 h-16 w-16 opacity-80 sm:right-6">
          <div className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-white/10 bg-navy-light/30 backdrop-blur-sm">
            <span className="absolute top-1 font-sans text-[10px] font-bold text-white/50">N</span>
            <span className="absolute bottom-1 font-sans text-[10px] font-bold text-white/50">
              S
            </span>
            <span className="absolute left-1 font-sans text-[10px] font-bold text-white/50">W</span>
            <span className="absolute right-1 font-sans text-[10px] font-bold text-white/50">
              E
            </span>
            <div className="shadow-glow absolute h-8 w-1 origin-center rotate-45 rounded-full bg-gradient-to-t from-white/20 to-primary"></div>
          </div>
        </div> */}

        {/* OVERLAY DECORATIONS FOR OVERVIEW MODE */}
        {movingMode === 'overview' && (
          <div className="pointer-events-none absolute inset-0 z-10 bg-navy-deep/40 backdrop-blur-[2px]">
            <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
              <div className="absolute left-[20%] top-[-10%] h-[120%] w-3 rotate-3 rounded-full bg-primary/10"></div>
              <div className="absolute left-[35%] top-[-10%] h-[120%] w-2 -rotate-2 rounded-full bg-primary/10"></div>
              <div className="absolute left-[55%] top-[-10%] h-[120%] w-4 rotate-1 rounded-full bg-primary/10"></div>
              <div className="absolute left-[75%] top-[-10%] h-[120%] w-2 rotate-6 rounded-full bg-primary/10"></div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Panel - Positioned absolutely to overlay on the map */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-50 flex flex-col items-center px-6">
        {/* Error Handling & Troubleshooting */}
        {/* {locationError && (
          <div className="animate-fade-in mb-6 overflow-hidden rounded-2xl border border-red-500/30 bg-red-950/40 p-1 ring-1 ring-red-500/20 backdrop-blur-xl">
            <div className="flex flex-col p-4">
              <div className="mb-3 flex items-start gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-red-500/20 text-red-500 shadow-inner">
                  <span className="material-symbols-outlined !text-[24px]">location_off</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-sm font-black uppercase tracking-widest text-red-100">
                    {locationError === 'HTTPS required' ? 'YÊU CẦU BẢO MẬT' : 'LỖI VỊ TRÍ'}
                  </h3>
                  <p className="mt-1 font-display text-[11px] font-medium leading-relaxed text-red-200/70">
                    {locationError === 'HTTPS required'
                      ? 'Trên iPhone, bản đồ yêu cầu kết nối HTTPS để hoạt động. Vui lòng sử dụng ngrok hoặc Heroku thay vì địa chỉ IP trực tiếp.'
                      : locationError === 'Permission denied'
                        ? 'Bạn đã từ chối quyền truy cập vị trí. Vui lòng vào Cài đặt > Quyền riêng tư > Dịch vụ định vị để cấp lại quyền.'
                        : 'Không thể xác định vị trí của bạn. Vui lòng kiểm tra GPS.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 border-t border-red-500/20 pt-4">
                <button
                  onClick={() => retryLocation()}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500/30 py-2.5 text-[10px] font-black tracking-widest text-white transition-all hover:bg-red-500/50 active:scale-95"
                >
                  <span className="material-symbols-outlined !text-base">refresh</span>
                  THỬ LẠI
                </button>
                <button
                  onClick={() => window.open('https://support.apple.com/vi-vn/HT207092', '_blank')}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500/20 py-2.5 text-[10px] font-black tracking-widest text-red-200 transition-all hover:bg-white/5 active:scale-95"
                >
                  <span className="material-symbols-outlined !text-base">help</span>
                  HƯỚNG DẪN
                </button>
              </div>

              <button
                onClick={() =>
                  setMockLocation(
                    (location.lat || 21.0285) - 0.0005,
                    (location.lng || 105.8542) - 0.0005
                  )
                }
                className="mt-3 w-full rounded-xl bg-blue-500/20 py-2 text-[9px] font-bold tracking-[0.2em] text-blue-300 hover:bg-blue-500/30 active:scale-95"
              >
                DÙNG VỊ TRÍ GIẢ (DEBUG FLOW)
              </button>
            </div>
          </div>
        )} */}

        {movingMode === 'overview' ? (
          <div className="animate-fade-in pointer-events-auto w-full duration-500">
            <div className="overflow-hidden rounded-3xl border border-primary/20 bg-[#1a2236]/90 p-3 shadow-2xl ring-1 ring-white/10 backdrop-blur-2xl">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h2 className="mb-1 flex items-center gap-2 font-display text-xs font-black uppercase tracking-wider text-primary">
                      <span className="material-symbols-outlined text-base">history_edu</span>
                      {t('current_mission')}
                    </h2>
                    <p className="font-display text-[13px] font-medium leading-relaxed text-white/90">
                      {t.rich('mission_desc', {
                        location: currentLocationId ? t(`locations.${currentLocationId}.name`) : '',
                        span: (chunks) => (
                          <span className="font-bold text-primary underline decoration-primary/50 underline-offset-4">
                            {chunks}
                          </span>
                        ),
                      })}
                    </p>
                  </div>
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-primary/20 bg-black/50 shadow-inner">
                    <span className="font-display text-[18px] font-black leading-none text-white">
                      {distance !== null
                        ? distance >= 1000
                          ? (distance / 1000).toFixed(1)
                          : distance
                        : '--'}
                    </span>
                    <span className="mt-1 text-[9px] font-black uppercase tracking-widest text-primary/50">
                      {distance !== null && distance >= 1000 ? t('unit_km') : t('unit_meters')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMovingMode('navigation')}
                    className="group relative flex flex-1 items-center justify-center gap-3 overflow-hidden rounded-2xl bg-primary py-3 font-display text-sm font-black uppercase tracking-widest text-black shadow-[0_0_20px_rgba(249,212,6,0.3)] transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <span className="relative z-10">{t('start_walking')}</span>
                    <span className="material-symbols-outlined relative z-10 rotate-45 text-xl font-black">
                      navigation
                    </span>
                    <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
                  </button>

                  <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary shadow-lg backdrop-blur-md transition-all hover:bg-white/10 active:scale-90">
                    <span className="material-symbols-outlined !text-[24px]">lightbulb</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Navigation Mode Action (Discover Button) - Moved higher to avoid overlap with Bottom Nav
          <div className="pointer-events-auto mb-20 flex w-full flex-col items-center px-6">
            {distance !== null && distance < 30000 ? (
              <button
                onClick={() => setCurrentScreen('arrival')}
                className="shadow-glow-strong flex w-full max-w-[240px] animate-pulse-glow items-center justify-center gap-3 rounded-2xl border border-primary/40 bg-primary py-3.5 font-display text-sm font-black uppercase tracking-[0.12em] text-black transition-all hover:scale-105 active:scale-95"
              >
                <span>KHÁM PHÁ</span>
                <span className="material-symbols-outlined text-xl font-black">explore</span>
              </button>
            ) : (
              // Navigation ongoing hint
              <div className="flex w-full justify-center">
                <div className="animate-pulse rounded-full border border-primary/20 bg-black/80 px-8 py-4 text-[11px] font-black uppercase tracking-widest text-primary backdrop-blur-md">
                  Tiến gần hơn để khám phá
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        .map-grid {
          background-size: 40px 40px;
          background-image:
            linear-gradient(to right, rgba(249, 212, 6, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(249, 212, 6, 0.05) 1px, transparent 1px);
        }
        .clip-path-cone {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        @keyframes pulseGlow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(249, 212, 6, 0.4);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(249, 212, 6, 0);
          }
        }
        .shadow-glow {
          box-shadow: 0 0 15px rgba(249, 212, 6, 0.3);
        }
        .shadow-glow-strong {
          box-shadow: 0 0 25px rgba(249, 212, 6, 0.5);
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s infinite;
        }
      `}</style>
    </div>
  );
}
