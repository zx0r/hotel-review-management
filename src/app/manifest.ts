import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sujet Marina Hotel Da Nang | Reviews Hub',
    short_name: 'Sujet Reviews',
    description: 'Direct verified guest review portal for Sujet Marina Hotel Da Nang By Haviland.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F3F0EE',
    theme_color: '#141413',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
