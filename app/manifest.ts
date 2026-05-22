import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BuildSaudi',
    short_name: 'BuildSaudi',
    description: 'Startup jobs and companies building the future of Saudi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F0E6',
    theme_color: '#06634D',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
