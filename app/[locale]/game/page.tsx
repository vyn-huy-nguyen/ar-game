'use client';

import React from 'react';
import { GameProvider, useGame } from './GameContext';
import LandingScreen from './screens/LandingScreen';
import MapScreen from './screens/MapScreen';
import ArrivalScreen from './screens/ArrivalScreen';
import ARScreen from './screens/ARScreen';
import CollectionScreen from './screens/CollectionScreen';
import CompletionScreen from './screens/CompletionScreen';

function GameContent() {
  const { currentScreen } = useGame();

  switch (currentScreen) {
    case 'landing':
      return <LandingScreen />;
    case 'map':
      return <MapScreen />;
    case 'moving':
    case 'arrival':
      return <ArrivalScreen />;
    case 'scanning':
    case 'interacting':
      return <ARScreen />;
    case 'collected':
      return <CollectionScreen />;
    case 'completion':
      return <CompletionScreen />;
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
