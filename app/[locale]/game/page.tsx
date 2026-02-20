'use client';

import React from 'react';
import { GameProvider, useGame } from './GameContext';
import LandingScreen from '@/components/game/LandingScreen';
import MapScreen from '@/components/game/MapScreen';
import MovingScreen from '@/components/game/MovingScreen';
import ArrivalScreen from '@/components/game/ArrivalScreen';
import ARScreen from '@/components/game/ARScreen';
import QuizScreen from '@/components/game/QuizScreen';
import FactScreen from '@/components/game/FactScreen';
import CollectionScreen from '@/components/game/CollectionScreen';
import LibraryScreen from '@/components/game/LibraryScreen';
import CompletionScreen from '@/components/game/CompletionScreen';

function GameContent() {
  const { currentScreen } = useGame();

  switch (currentScreen) {
    case 'landing':
      return <LandingScreen />;
    case 'map':
      return <MapScreen />;
    case 'moving':
      return <MovingScreen />;
    case 'arrival':
      return <ArrivalScreen />;
    case 'scanning':
      return <ARScreen />;
    case 'quiz':
      return <QuizScreen />;
    case 'fact':
      return <FactScreen />;
    case 'collected':
      return <CollectionScreen />;
    case 'completion':
      return <CompletionScreen />;
    case 'library':
      return <LibraryScreen />;
    default:
      return <LandingScreen />;
  }
}

export default function GamePage() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
