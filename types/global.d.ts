export {};

declare global {
  interface Window {
    AFRAME: any;
    MINDAR: any;
  }

  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}
