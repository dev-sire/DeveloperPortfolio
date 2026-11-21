'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { RandomLetterSwap } from '@/components/ui/random-letter-swap'
import { EMAIL } from '@/lib/content'
import './site-header.css'

// Anchors that scroll the home page.
const sections = [
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'work' },
  { label: 'Tools', id: 'tools' },
  { label: 'Process', id: 'process' },
  { label: 'Contact', id: 'contact' },
]

// Separate pages. Styled as pills so they read differently from the section anchors.
const pages = [
  { label: 'Projects', id: 'projects', href: '/projects', hint: 'Open the projects page' },
  { label: 'Initiatives', id: 'initiatives', href: '/initiatives', hint: 'Open the initiatives and awards page', live: true },
] as const

type Props = {
  motion: boolean
  onToggleMotion: () => void
  // 'home' tracks which section is on screen; the other pages highlight their own link.
  page: 'home' | 'projects' | 'initiatives'
}

export function SiteHeader({ motion, onToggleMotion, page }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState(page === 'home' ? '' : page)

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
        <span className="nav-label">{page === 'home' ? 'On this page' : 'Home page sections'}</span>
        <div className="nav-group">
          {sections.map((item) => page === 'home'
            ? <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'is-active' : ''} onClick={close}><RandomLetterSwap label={item.label} trigger="parent" disabled={!motion} /></a>
            : <Link key={item.id} href={`/#${item.id}`} onClick={close}><RandomLetterSwap label={item.label} trigger="parent" disabled={!motion} /></Link>)}
        </div>
        <span className="nav-sep" aria-hidden="true" />
        <span className="nav-label">Pages</span>
        <div className="nav-group nav-pages">
          {pages.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              title={item.hint}
              className={active === item.id ? 'page-link is-active' : 'page-link'}
              aria-current={page === item.id ? 'page' : undefined}
              onClick={close}
            >
              <RandomLetterSwap label={item.label} trigger="parent" disabled={!motion} />
              {'live' in item && item.live && <i className="nav-live" aria-hidden="true" />}
              <ArrowRight size={12} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </nav>
      <div className="header-actions">
        <button className="motion-toggle" type="button" onClick={onToggleMotion} aria-pressed={motion}><span className={motion ? 'toggle-dot active' : 'toggle-dot'} /> Motion</button>
        <a className="header-contact" href={`mailto:${EMAIL}`}>Let&apos;s talk <ArrowUpRight size={15} /></a>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </header>
  )
}
