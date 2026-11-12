import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="site-shell" style={{ minHeight: '100svh', display: 'grid', placeItems: 'center' }}>
      <div className="section-wrap">
        <p className="section-index">404 / Not found</p>
        <h1 className="display-3" style={{ margin: '28px 0 34px' }}>This page<br /><span className="accent">doesn&apos;t exist.</span></h1>
        <Link className="button-primary" href="/">Back to home</Link>
      </div>
    </main>
  )
}
