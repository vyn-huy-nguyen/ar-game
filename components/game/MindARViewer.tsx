'use client';

import React, { useEffect, useRef, useState } from 'react';

interface MindARViewerProps {
  onTargetFound: () => void;
  onTargetLost?: () => void;
  targetIndex?: number;
}

interface AFrameScene extends HTMLElement {
  systems: {
    [key: string]: {
      stop: () => void;
    };
  };
}

const MindARViewer: React.FC<MindARViewerProps> = ({
  onTargetFound,
  onTargetLost,
  targetIndex = 0,
}) => {
  const sceneRef = useRef<AFrameScene>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Dynamically load A-Frame and Mind-AR scripts
    const loadScripts = async () => {
      if (typeof window !== 'undefined') {
        const aframeScript = document.createElement('script');
        aframeScript.src = 'https://aframe.io/releases/1.5.0/aframe.min.js';
        aframeScript.async = true;

        const mindarScript = document.createElement('script');
        mindarScript.src =
          'https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js';
        mindarScript.async = true;

        document.head.appendChild(aframeScript);

        aframeScript.onload = () => {
          document.head.appendChild(mindarScript);
          mindarScript.onload = () => {
            setIsReady(true);
          };
        };
      }
    };

    loadScripts();

    const sceneEl = sceneRef.current;
    return () => {
      // Cleanup: Mind-AR and A-Frame can be tricky to clean up completely in SPA
      // At minimum, we should stop the camera if possible
      if (sceneEl && sceneEl.systems && sceneEl.systems['mindar-image-system']) {
        sceneEl.systems['mindar-image-system'].stop();
      }
    };
  }, []);

  useEffect(() => {
    // We need to re-bind listeners if targetIndex changes or isReady changes
    if (isReady && sceneRef.current) {
      const targetEntity = document.querySelector('#target-entity');

      const foundHandler = () => {
        console.log(`MindAR: Target ${targetIndex} Found`);
        onTargetFound();
      };

      const lostHandler = () => {
        console.log(`MindAR: Target ${targetIndex} Lost`);
        if (onTargetLost) onTargetLost();
      };

      if (targetEntity) {
        targetEntity.addEventListener('targetFound', foundHandler);
        targetEntity.addEventListener('targetLost', lostHandler);
      }

      return () => {
        if (targetEntity) {
          targetEntity.removeEventListener('targetFound', foundHandler);
          targetEntity.removeEventListener('targetLost', lostHandler);
        }
      };
    }
  }, [isReady, onTargetFound, onTargetLost, targetIndex]);

  if (!isReady) {
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Đang khởi tạo AR...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <a-scene
        ref={sceneRef}
        mindar-image={`imageTargetSrc: /targets.mind; autoStart: true; uiScanning: no; uiLoading: no; filterMinCF:0.0001; filterBeta: 0.001;`}
        color-space="sRGB"
        embedded
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        className="h-full w-full"
      >
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity id="target-entity" mindar-image-target={`targetIndex: ${targetIndex}`}></a-entity>
      </a-scene>

      <style jsx global>{`
        .a-canvas {
          width: 100% !important;
          height: 100% !important;
          top: 0 !important;
          left: 0 !important;
          position: absolute !important;
        }
      `}</style>
    </div>
  );
};

export default MindARViewer;
