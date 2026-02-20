'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LeafletMapProps {
  targetLat: number;
  targetLng: number;
  targetName: string;
}

export default function LeafletMap({ targetLat, targetLng, targetName }: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const targetMarkerRef = useRef<L.Marker | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize map
      mapRef.current = L.map('leaflet-map-container', {
        zoomControl: false,
        attributionControl: false,
      }).setView([21.0285, 105.8542], 16);

      // Add stylized dark tiles (CartoDB Dark Matter is a good free dark theme)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(mapRef.current);

      // Target Marker Icon
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

      targetMarkerRef.current = L.marker([targetLat, targetLng], { icon: targetIcon })
        .addTo(mapRef.current)
        .bindPopup(targetName);

      // User Marker Icon
      const userIcon = L.divIcon({
        className: 'custom-user-icon',
        html: `<div class="relative flex items-center justify-center">
                <div class="absolute w-8 h-8 bg-blue-500 rounded-full opacity-30 animate-ping"></div>
                <div class="w-4 h-4 bg-blue-400 border-2 border-white rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
              </div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      userMarkerRef.current = L.marker([21.0285, 105.8542], { icon: userIcon }).addTo(
        mapRef.current
      );

      // Polyline (Path)
      polylineRef.current = L.polyline([], {
        color: '#f9d406',
        dashArray: '5, 10',
        weight: 3,
        opacity: 0.8,
      }).addTo(mapRef.current);
    }

    // Geolocation Tracking
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLatLng: L.LatLngExpression = [latitude, longitude];

          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng(userLatLng);
          }

          if (polylineRef.current) {
            polylineRef.current.setLatLngs([userLatLng, [targetLat, targetLng]]);
          }

          if (mapRef.current) {
            // Smoothly pan to user
            mapRef.current.panTo(userLatLng);
          }
        },
        (error) => {
          console.error('Error tracking position:', error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }
  }, [targetLat, targetLng, targetName]);

  return (
    <div id="leaflet-map-container" className="h-full w-full bg-[#0f172a]">
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
