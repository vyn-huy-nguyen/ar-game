import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cinzel, Noto_Serif_Display } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});
const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-playfair',
  display: 'swap',
});
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel', display: 'swap' });
const notoSerif = Noto_Serif_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-noto-serif',
  display: 'swap',
});

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Hanoi - Pieces of Time',
  description: 'Explore Hanoi Old Quarter memories via AR interaction',
  other: {
    'cache-control': 'no-cache, no-store, must-revalidate',
    pragma: 'no-cache',
    expires: '0',
  },
};

export const viewport: Metadata['viewport'] = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${playfair.variable} ${cinzel.variable} ${notoSerif.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
