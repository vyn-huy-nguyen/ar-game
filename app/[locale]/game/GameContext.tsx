'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type GameScreen =
  | 'landing'
  | 'map'
  | 'moving'
  | 'arrival'
  | 'scanning'
  | 'quiz'
  | 'fact'
  | 'collected'
  | 'completion'
  | 'library';

export interface LocationData {
  id: string;
  name: string;
  x: number; // Percentage on map
  y: number; // Percentage on map
  isUnlocked: boolean;
}

interface GameContextType {
  currentScreen: GameScreen;
  setCurrentScreen: (screen: GameScreen) => void;
  currentLocationId: string | null;
  setCurrentLocationId: (id: string | null) => void;
  unlockedMemories: string[];
  unlockMemory: (id: string) => void;
  movingMode: 'overview' | 'navigation';
  setMovingMode: (mode: 'overview' | 'navigation') => void;
  userLocation: { lat: number; lng: number } | null;
  locationError: string | null;
  retryLocation: () => void;
  setMockLocation: (lat: number, lng: number) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const STORAGE_KEY = 'hanoi_game_progress';

export function GameProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('landing');
  const [currentLocationId, setCurrentLocationId] = useState<string | null>(null);
  const [unlockedMemories, setUnlockedMemories] = useState<string[]>([]);
  const [movingMode, setMovingMode] = useState<'overview' | 'navigation'>('overview');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Load from LocalStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { currentScreen, currentLocationId, unlockedMemories, movingMode } =
          JSON.parse(saved);
        setCurrentScreen(currentScreen || 'landing');
        setCurrentLocationId(currentLocationId || null);
        setUnlockedMemories(unlockedMemories || []);
        setMovingMode(movingMode || 'overview');
      } catch (e) {
        console.error('Failed to load game progress', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage on change
  React.useEffect(() => {
    if (isLoaded) {
      const data = { currentScreen, currentLocationId, unlockedMemories, movingMode };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [currentScreen, currentLocationId, unlockedMemories, movingMode, isLoaded]);

  // Centralized Location Tracking
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('geolocation' in navigator)) {
      setLocationError('Geolocation not supported');
      return;
    }

    const isSecure =
      window.location.protocol === 'https:' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationError(null);
      },
      (error) => {
        let msg = 'Lỗi theo dõi vị trí';
        if (error.code === 1) {
          msg = !isSecure ? 'HTTPS required' : 'Permission denied';
        } else if (error.code === 2) msg = 'Location unavailable';
        else if (error.code === 3) msg = 'Timeout expired';
        setLocationError(msg);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 30000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [retryCount]);

  const retryLocation = () => {
    setLocationError(null);
    setRetryCount((prev) => prev + 1);
  };

  const setMockLocation = (lat: number, lng: number) => {
    setUserLocation({ lat, lng });
    setLocationError(null);
  };

  const unlockMemory = (id: string) => {
    if (!unlockedMemories.includes(id)) {
      const newMemories = [...unlockedMemories, id];
      setUnlockedMemories(newMemories);
    }
  };

  const resetGame = () => {
    setCurrentScreen('landing');
    setCurrentLocationId(null);
    setUnlockedMemories([]);
    setMovingMode('overview');
    localStorage.removeItem(STORAGE_KEY);
  };

  if (!isLoaded) return null; // Prevent hydration mismatch

  return (
    <GameContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        currentLocationId,
        setCurrentLocationId,
        unlockedMemories,
        unlockMemory,
        movingMode,
        setMovingMode,
        userLocation,
        locationError,
        retryLocation,
        setMockLocation,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
