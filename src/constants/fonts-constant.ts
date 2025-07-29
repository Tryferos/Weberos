import {Inter} from 'next/font/google';
import localFont from 'next/font/local';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: '400',
  preload: true,
});

const wotfardMedium = localFont({
  src: '../app/fonts/wotfard-medium.woff2',
  variable: '--font-heading',
  weight: '500 600',
  display: 'swap',
});

const wotfardSemibold = localFont({
  src: '../app/fonts/wotfard-semibold.woff2',
  variable: '--font-heading-sb',
  weight: '700 800',
  display: 'swap',
});

const cubano = localFont({
  src: '../app/fonts/Cubano.ttf',
  variable: '--font-fantasy',
  weight: '700 800',
  display: 'swap',
});

const FontFamilies = Object.freeze({
  Wotfard: [wotfardMedium.variable, wotfardSemibold.variable].join(' '),
  Cubano: cubano.variable,
  Inter: inter.variable,
});

export default FontFamilies;
