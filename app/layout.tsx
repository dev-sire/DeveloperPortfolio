import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/content'
import './globals.css'

const TITLE = 'Aman Shahid | Cybersecurity Engineer & Full-Stack Developer'
const DESCRIPTION = 'Aman Shahid is a cybersecurity engineer and full-stack developer in Karachi, building secure systems, SOC and forensics tools, and high-performance web apps.'
const OG_IMAGE = { url: '/og-image.png', width: 1733, height: 907, alt: 'Aman Shahid, cybersecurity engineer and full-stack developer' }

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: '%s | Aman Shahid' },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Aman Shahid', url: SITE_URL }],
  creator: 'Aman Shahid',
  keywords: ['Aman Shahid', 'DevSire', 'cybersecurity engineer', 'full-stack developer', 'penetration testing', 'SIEM', 'digital forensics', 'Karachi', 'Pakistan', 'portfolio'],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [OG_IMAGE.url] },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-light-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@500&family=Manrope:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
