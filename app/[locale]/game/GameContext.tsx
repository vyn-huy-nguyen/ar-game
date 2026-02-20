'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type GameScreen =
  | 'landing'
  | 'map'
  | 'moving'
  | 'arrival'
  | 'scanning'
  | 'interacting'
  | 'collected'
  | 'completion';

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
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('landing');
  const [currentLocationId, setCurrentLocationId] = useState<string | null>(null);
  const [unlockedMemories, setUnlockedMemories] = useState<string[]>([]);

  const unlockMemory = (id: string) => {
    if (!unlockedMemories.includes(id)) {
      const newMemories = [...unlockedMemories, id];
      setUnlockedMemories(newMemories);

      // Check for completion logic here if needed, or in the component
      if (newMemories.length === 8) {
        // All memories unlocked
      }
    }
  };

  const resetGame = () => {
    setCurrentScreen('landing');
    setCurrentLocationId(null);
    setUnlockedMemories([]);
  };

  return (
    <GameContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        currentLocationId,
        setCurrentLocationId,
        unlockedMemories,
        unlockMemory,
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
