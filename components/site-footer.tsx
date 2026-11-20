import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} DevSire</span>
      <nav className="footer-links" aria-label="Footer">
        <Link href="/projects">Projects</Link>
        <Link href="/initiatives">Initiatives</Link>
      </nav>
      <a href="#top">Back to top ↑</a>
    </footer>
  )
}
