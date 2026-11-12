import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aman Shahid | DevSire',
    short_name: 'DevSire',
    description: 'Portfolio of Aman Shahid, cybersecurity engineer and full-stack developer.',
    start_url: '/',
    display: 'browser',
    background_color: '#090909',
    theme_color: '#090909',
    icons: [
      { src: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
