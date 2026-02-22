import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGame } from '@/app/[locale]/game/GameContext';

export interface LeafletMapHandle {
  zoomIn: () => void;
  zoomOut: () => void;
  centerOnUser: () => void;
}

interface LeafletMapProps {
  targetLat: number;
  targetLng: number;
  targetName: string;
  interactive?: boolean;
}

const LeafletMap = forwardRef<LeafletMapHandle, LeafletMapProps>(
  ({ targetLat, targetLng, targetName, interactive = true }, ref) => {
    const { userLocation } = useGame();
    const mapRef = useRef<L.Map | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const userMarkerRef = useRef<L.Marker | null>(null);
    const targetMarkerRef = useRef<L.Marker | null>(null);
    const polylineRef = useRef<L.Polyline | null>(null);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    useImperativeHandle(ref, () => ({
      zoomIn: () => {
        mapRef.current?.zoomIn();
      },
      zoomOut: () => {
        mapRef.current?.zoomOut();
      },
      centerOnUser: () => {
        if (userLocation && mapRef.current) {
          mapRef.current.flyTo([userLocation.lat, userLocation.lng], 17);
        }
      },
    }));

    // Initialization Effect
    useEffect(() => {
      if (!mounted || !containerRef.current || mapRef.current) return;

      const initialCenter: L.LatLngTuple =
        targetLat && targetLng ? [targetLat, targetLng] : [21.0285, 105.8542];

      // Initialize map
      const map = L.map(containerRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: interactive,
        touchZoom: interactive,
        scrollWheelZoom: interactive,
        doubleClickZoom: interactive,
        boxZoom: interactive,
        keyboard: interactive,
      }).setView(initialCenter, 16);

      mapRef.current = map;

      // Add stylized dark tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map);

      // Force size update to handle layout shifts
      setTimeout(() => {
        map.invalidateSize();
      }, 100);

      // Target Marker Icon (Refined for Screen 4)
      if (targetLat && targetLng) {
        const targetIcon = L.divIcon({
          className: 'custom-target-icon',
          html: `<div class="relative flex flex-col items-center">
                  <div class="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#f9d406] bg-[#0f1420] text-[#f9d406] shadow-[0_0_15px_rgba(249,212,6,0.5)]">
                    <span class="material-symbols-outlined" style="font-size: 18px;">temple_buddhist</span>
                  </div>
                  <div class="mt-2 w-max rounded-full border border-primary/30 bg-black/80 px-3 py-1 text-[9px] font-bold text-white shadow-lg backdrop-blur-sm">
                    ${targetName}
                  </div>
                </div>`,
          iconSize: [120, 80],
          iconAnchor: [60, 20],
        });

        targetMarkerRef.current = L.marker([targetLat, targetLng], { icon: targetIcon }).addTo(map);
      }

      // User Marker Icon (Refined for Screen 4)
      const userIcon = L.divIcon({
        className: 'custom-user-icon',
        html: `<div class="relative flex flex-col items-center">
                <div class="mb-2 w-max rounded-full border border-primary/30 bg-black/80 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-primary shadow-lg backdrop-blur-sm">
                  VỊ TRÍ HIỆN TẠI
                </div>
                <div class="relative flex h-5 w-5 items-center justify-center">
                  <div class="absolute inset-0 h-full w-full animate-ping rounded-full bg-blue-500/40"></div>
                  <div class="h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                  <div class="absolute -top-1 h-0 w-0 border-b-[6px] border-l-[4px] border-r-[4px] border-b-blue-400 border-l-transparent border-r-transparent"></div>
                </div>
              </div>`,
        iconSize: [120, 60],
        iconAnchor: [60, 45],
      });

      userMarkerRef.current = L.marker([21.0285, 105.8542], { icon: userIcon }).addTo(map);

      // Polyline (Path)
      polylineRef.current = L.polyline([], {
        color: '#f9d406',
        dashArray: '5, 10',
        weight: 3,
        opacity: 0.8,
      }).addTo(map);

      // Cleanup map on unmount
      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }, [mounted, interactive, targetLat, targetLng, targetName]); // Run once when mounted

    // Update Target Marker if props change
    useEffect(() => {
      if (!mapRef.current || !targetLat || !targetLng) return;

      const latlng: L.LatLngTuple = [targetLat, targetLng];
      if (targetMarkerRef.current) {
        targetMarkerRef.current.setLatLng(latlng);
        targetMarkerRef.current.getPopup()?.setContent(targetName);
      } else {
        // Create it if it doesn't exist (e.g. if props were null at init)
        const targetIcon = L.divIcon({
          className: 'custom-target-icon',
          html: `<div class="relative flex items-center justify-center">
                  <div class="absolute inset-0 rounded-full bg-yellow-400 blur-md opacity-40 animate-pulse"></div>
                  <div class="relative bg-[#131a26] border-2 border-[#f9d406] rounded-full p-2 shadow-[0_0_15px_rgba(249,212,6,0.6)]">
                    <span class="material-symbols-outlined text-[#f9d406] text-xl" style="font-size: 20px;">temple_buddhist</span>
                  </div>
                </div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });
        targetMarkerRef.current = L.marker(latlng, { icon: targetIcon })
          .addTo(mapRef.current)
          .bindPopup(targetName);
      }
    }, [targetLat, targetLng, targetName]);

    // Update User Location and Polyline
    useEffect(() => {
      if (!userLocation || !mapRef.current) return;

      const userLatLng: L.LatLngTuple = [userLocation.lat, userLocation.lng];

      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng(userLatLng);
      }

      if (polylineRef.current && targetLat && targetLng) {
        polylineRef.current.setLatLngs([userLatLng, [targetLat, targetLng]]);
      }

      // Smoothly pan to user if interactive, or fit bounds in overview
      if (interactive) {
        mapRef.current.panTo(userLatLng, { animate: true });
      } else if (targetLat && targetLng) {
        const bounds = L.latLngBounds([userLatLng, [targetLat, targetLng]]);
        mapRef.current.fitBounds(bounds, { padding: [50, 50], animate: true });
      }
    }, [userLocation, targetLat, targetLng, interactive]);

    return (
      <div ref={containerRef} className="h-full w-full bg-[#0f172a]">
        <style jsx global>{`
          .leaflet-container {
            background: #0f172a !important;
          }
          .custom-target-icon,
          .custom-user-icon {
            background: none !important;
            border: none !important;
          }
        `}</style>
      </div>
    );
  }
);

LeafletMap.displayName = 'LeafletMap';

export default LeafletMap;
