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
  'hang-buom': { lat: 21.0355, lng: 105.8525, name: 'Phố Hàng Buồm' },
  'hang-dong': { lat: 21.0345, lng: 105.852, name: 'Phố Hàng Đồng' },
  'hang-trong': { lat: 21.0305, lng: 105.8505, name: 'Phố Hàng Trống' },
  'lan-ong': { lat: 21.035, lng: 105.849, name: 'Phố Lãn Ông' },
  'dong-xuan': { lat: 21.0375, lng: 105.8495, name: 'Chợ Đồng Xuân' },
  'hang-ma': { lat: 21.0365, lng: 105.8485, name: 'Phố Hàng Mã' },
  'hang-ngang': { lat: 21.034, lng: 105.851, name: 'Phố Hàng Ngang' },
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
            {currentLocationId ? t(`locations.${currentLocationId}.name`) : 'KHU PHỐ CỔ'}
          </h1>
        </div>

        <div className="w-12"></div>
      </div>

      {/* Floating Map Controls - Moved to top-level for guaranteed visibility */}
      {movingMode === 'navigation' && (
        <div className="pointer-events-auto fixed bottom-64 right-8 z-[9999] flex flex-col items-center gap-4 sm:right-12">
          <div className="flex flex-col space-y-2 rounded-2xl border border-primary/40 bg-[#0f1420]/95 p-1.5 shadow-[0_0_30px_rgba(0,0,0,0.5)] ring-1 ring-white/10 backdrop-blur-xl">
            <button
              onClick={() => mapRef.current?.zoomIn()}
              className="flex h-12 w-12 items-center justify-center rounded-xl text-primary transition-all hover:bg-primary hover:text-[#0f1420] active:scale-95"
              title="Phóng to"
            >
              <span className="material-symbols-outlined text-2xl font-bold">add</span>
            </button>
            <div className="mx-auto h-px w-8 bg-primary/20"></div>
            <button
              onClick={() => mapRef.current?.zoomOut()}
              className="flex h-12 w-12 items-center justify-center rounded-xl text-primary transition-all hover:bg-primary hover:text-[#0f1420] active:scale-95"
              title="Thu nhỏ"
            >
              <span className="material-symbols-outlined text-2xl font-bold">remove</span>
            </button>
          </div>

          <button
            onClick={() => mapRef.current?.centerOnUser()}
            className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/50 bg-primary text-[#0f1420] shadow-[0_0_25px_rgba(249,212,6,0.6)] transition-all hover:scale-110 active:scale-90"
            title="Định vị của tôi"
          >
            <span className="material-symbols-outlined text-3xl font-black">my_location</span>
          </button>
        </div>
      )}

      {/* Main Map Content Area */}
      <div className="relative h-full w-full flex-grow overflow-hidden bg-[#0f1420]">
        {movingMode === 'navigation' ? (
          // REAL-TIME NAVIGATION MODE (Leaflet)
          <div className="animate-fade-in absolute inset-0 z-0 duration-1000">
            {mounted && (
              <LeafletMap
                ref={mapRef}
                targetLat={location.lat}
                targetLng={location.lng}
                targetName={currentLocationId ? t(`locations.${currentLocationId}.name`) : ''}
              />
            )}
          </div>
        ) : (
          // OVERVIEW MODE (Mission Card Background)
          <div className="map-grid absolute inset-0">
            <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
              <div className="absolute left-[20%] top-[-10%] h-[120%] w-3 rotate-3 rounded-full bg-primary/10"></div>
              <div className="absolute left-[35%] top-[-10%] h-[120%] w-2 -rotate-2 rounded-full bg-primary/10"></div>
              <div className="absolute left-[55%] top-[-10%] h-[120%] w-4 rotate-1 rounded-full bg-primary/10"></div>
              <div className="absolute left-[75%] top-[-10%] h-[120%] w-2 rotate-6 rounded-full bg-primary/10"></div>
            </div>

            {/* Destination Marker */}
            <div className="absolute left-[65%] top-[35%] z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/30 opacity-40"></div>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-[#0f1420] text-primary shadow-[0_0_15px_rgba(249,212,6,0.3)]">
                  <span className="material-symbols-outlined text-[20px]">temple_buddhist</span>
                </div>
              </div>
              <div className="mt-3 max-w-[120px] truncate rounded-full border border-primary/30 bg-[#0f1420]/95 px-3 py-1 text-center font-display text-[10px] uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                {currentLocationId ? t(`locations.${currentLocationId}.name`) : ''}
              </div>
            </div>

            {/* User Pointer */}
            <div className="absolute bottom-[30%] left-[30%] z-10 -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/30"></div>
                  <div className="relative h-5 w-5 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
                  <div className="clip-path-cone absolute bottom-1/2 left-1/2 h-[60px] w-[60px] origin-bottom -translate-x-1/2 -rotate-45 transform bg-gradient-to-t from-blue-500/20 to-transparent"></div>
                </div>
                <div className="mt-4 rounded-full border border-primary/40 bg-[#0f1420]/90 px-3 py-1 shadow-lg backdrop-blur-sm">
                  <span className="whitespace-nowrap font-display text-[9px] font-black uppercase tracking-widest text-primary">
                    {t('current_location_label')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Panel */}
      <div className="relative z-50 flex-none px-6 pb-12 pt-4">
        {/* Error Handling & Troubleshooting */}
        {locationError && (
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

              {/* Debug Mock Button (Visible during development/testing) */}
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
        )}

        {movingMode === 'overview' ? (
          <div className="animate-fade-in duration-500">
            <div className="overflow-hidden rounded-2xl border border-primary/20 bg-[#1a2236]/80 p-5 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl">
              <div className="flex flex-col gap-6">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h2 className="mb-2 flex items-center gap-2 font-display text-xs font-black uppercase tracking-wider text-primary">
                      <span className="material-symbols-outlined text-base">history_edu</span>
                      NHIỆM VỤ HIỆN TẠI
                    </h2>
                    <p className="font-display text-sm font-medium leading-relaxed text-white/90">
                      {t.rich('mission_desc', {
                        location: currentLocationId ? t(`locations.${currentLocationId}.name`) : '',
                        span: (chunks) => <span className="font-bold text-primary">{chunks}</span>,
                      })}
                    </p>
                  </div>
                  <div className="flex h-16 w-20 flex-col items-center justify-center rounded-xl border border-white/5 bg-black/40 shadow-inner">
                    <span className="font-display text-xl font-black text-white">
                      {distance !== null ? distance : '--'}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      MÉT
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setMovingMode('navigation')}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-primary py-4 font-display text-sm font-black uppercase tracking-widest text-black shadow-[0_0_20px_rgba(249,212,6,0.3)] transition-all hover:scale-[1.02] active:scale-95"
                >
                  <span className="relative z-10">BẮT ĐẦU ĐI</span>
                  <span className="material-symbols-outlined relative z-10 text-xl font-black">
                    navigation
                  </span>
                  <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Navigation Mode Action (Discover Button)
          <div className="flex w-full flex-col items-center">
            {distance !== null && distance < 30 ? (
              <button
                onClick={() => setCurrentScreen('arrival')}
                className="shadow-glow-strong flex w-full max-w-sm animate-pulse-glow items-center justify-center gap-4 rounded-2xl border border-primary/40 bg-primary py-5 font-display text-base font-black uppercase tracking-[0.15em] text-black transition-all hover:scale-105 active:scale-95"
              >
                <span>KHÁM PHÁ</span>
                <span className="material-symbols-outlined text-2xl font-black">explore</span>
              </button>
            ) : (
              // Navigation ongoing hint
              <div className="flex w-full justify-center">
                <div className="animate-pulse rounded-full border border-primary/20 bg-black/60 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-primary backdrop-blur-md">
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
