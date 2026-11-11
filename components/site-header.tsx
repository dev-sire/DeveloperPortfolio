'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { EMAIL } from '@/lib/content'

const sections = [
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'work' },
  { label: 'Tools', id: 'tools' },
  { label: 'Process', id: 'process' },
  { label: 'Contact', id: 'contact' },
]

type Props = {
  motion: boolean
  onToggleMotion: () => void
  // 'home' tracks which section is on screen; 'projects' highlights the Projects link.
  page: 'home' | 'projects'
}

export function SiteHeader({ motion, onToggleMotion, page }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState(page === 'projects' ? 'projects' : '')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On the home page, highlight the section crossing the middle of the screen.
  useEffect(() => {
    if (page !== 'home') return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id === 'top' ? '' : entry.target.id)),
      { rootMargin: '-50% 0px -50% 0px' },
    )
    ;['top', ...sections.map((item) => item.id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [page])

  const close = () => setMenuOpen(false)

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      {page === 'home'
        ? <a className="wordmark" href="#top" aria-label="DevSire home"><span>DS</span><i>.</i></a>
        : <Link className="wordmark" href="/" aria-label="DevSire home"><span>DS</span><i>.</i></Link>}
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        {sections.map((item) => page === 'home'
          ? <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'is-active' : ''} onClick={close}>{item.label}</a>
          : <Link key={item.id} href={`/#${item.id}`} onClick={close}>{item.label}</Link>)}
        <Link href="/projects" className={active === 'projects' ? 'is-active' : ''} onClick={close}>Projects</Link>
      </nav>
      <div className="header-actions">
        <button className="motion-toggle" type="button" onClick={onToggleMotion} aria-pressed={motion}><span className={motion ? 'toggle-dot active' : 'toggle-dot'} /> Motion</button>
        <a className="header-contact" href={`mailto:${EMAIL}`}>Let&apos;s talk <ArrowUpRight size={15} /></a>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </header>
  )
}
