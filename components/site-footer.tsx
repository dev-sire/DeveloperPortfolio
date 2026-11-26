'use client'

import Link from 'next/link'
import RandomLetterSwap from './ui/random-letter-swap'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} DevSire</span>
      <nav className="footer-links" aria-label="Footer">
        <Link href="/projects">
          <RandomLetterSwap label="Projects" trigger="parent" />
        </Link>
        <Link href="/initiatives">
          <RandomLetterSwap label="Initiatives" trigger="parent" />
        </Link>
      </nav>
      <a href="#top">Back to top ↑</a>
    </footer>
  )
}
