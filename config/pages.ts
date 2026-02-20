/**
 * Configuration for book pages
 * Each page has QR code, marker image, and videos in multiple languages
 */

export interface PageConfig {
  pageId: number;
  markerImage: string;
  targetIndex: number; // Index in targets.mind file
  videos?: {
    en: string;
    vi: string;
  };
  model?: string;
  audio?: {
    en: string;
    vi: string;
  };
  title: {
    en: string;
    vi: string;
  };
  customImage?: string;
}

export const pagesConfig: Record<number, PageConfig> = {
  1: {
    pageId: 1,
    markerImage: '/markers/page1-marker.jpg',
    targetIndex: 0,
    videos: {
      en: '/videos/page1-video-vi.mp4',
      vi: '/videos/page1-video-vi.mp4',
    },
    title: {
      en: 'Page 1 - Introduction',
      vi: 'Trang 1 - Giới thiệu',
    },
  },
  2: {
    pageId: 2,
    markerImage: '/markers/page2-marker.jpg',
    targetIndex: 1,
    // Temporarily disabled model for testing
    // model:
    //   'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/softmind/scene.gltf',
    audio: {
      en: '/audio/page2-audio-en.mp3',
      vi: '/audio/page2-audio-vi.mp3',
    },
    videos: {
      en: '/videos/page2-video-avatar.mp4',
      vi: '/videos/page2-video-avatar.mp4',
    },
    title: {
      en: 'Page 2 - Chapter One',
      vi: 'Trang 2 - Chương Một',
    },
  },
  3: {
    pageId: 3,
    markerImage: '/markers/page3-marker.jpg',
    targetIndex: 2,
    videos: {
      en: '/videos/page3-video-vi.mp4',
      vi: '/videos/page3-video-vi.mp4',
    },
    title: {
      en: 'Page 3 - Chapter Two',
      vi: 'Trang 3 - Chương Hai',
    },
  },
  4: {
    pageId: 4,
    markerImage: '/markers/page4-marker.jpg',
    targetIndex: 3,
    videos: {
      en: '/videos/page4-video-vi.mp4',
      vi: '/videos/page4-video-vi.mp4',
    },
    title: {
      en: 'Page 4 - Chapter Three',
      vi: 'Trang 4 - Chương Ba',
    },
  },
  5: {
    pageId: 5,
    markerImage: '/markers/page5-marker.jpg',
    targetIndex: 4,
    videos: {
      en: '/videos/page5-video-vi.mp4',
      vi: '/videos/page5-video-vi.mp4',
    },
    title: {
      en: 'Page 5 - Chapter Four',
      vi: 'Trang 5 - Chương Tư',
    },
  },
  6: {
    pageId: 6,
    markerImage: '/markers/page6-marker.jpg',
    targetIndex: 5,
    videos: {
      en: '/videos/page6-video-vi.mp4',
      vi: '/videos/page6-video-vi.mp4',
    },
    title: {
      en: 'Page 6 - Chapter Five',
      vi: 'Trang 6 - Chương Năm',
    },
  },
  7: {
    pageId: 7,
    markerImage: '/markers/page7-marker.jpg',
    targetIndex: 6,
    videos: {
      en: '/videos/page7-video-vi.mp4',
      vi: '/videos/page7-video-vi.mp4',
    },
    title: {
      en: 'Page 7 - Chapter Six',
      vi: 'Trang 7 - Chương Sáu',
    },
  },
  8: {
    pageId: 8,
    markerImage: '/markers/page8-marker.jpg',
    targetIndex: 7,
    videos: {
      en: '/videos/page8-video-vi.mp4',
      vi: '/videos/page8-video-vi.mp4',
    },
    title: {
      en: 'Page 8 - Chapter Seven',
      vi: 'Trang 8 - Chương Bảy',
    },
  },
  9: {
    pageId: 9,
    markerImage: '/markers/page9-marker.jpg',
    targetIndex: 8,
    videos: {
      en: '/videos/page9-video-vi.mp4',
      vi: '/videos/page9-video-vi.mp4',
    },
    title: {
      en: 'Page 9 - Chapter Eight',
      vi: 'Trang 9 - Chương Tám',
    },
  },
};

/**
 * Get page configuration by page ID
 */
export function getPageConfig(pageId: number): PageConfig | null {
  return pagesConfig[pageId] || null;
}

/**
 * Get all pages configuration
 */
export function getAllPagesConfig(): Record<number, PageConfig> {
  return pagesConfig;
}
