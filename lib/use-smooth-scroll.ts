'use client'

import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
// Also smooth-scrolls in-page "#anchor" links. Does nothing when disabled or when
// the visitor prefers reduced motion.
export function useSmoothScroll(enabled: boolean) {
  useLayoutEffect(() => {
    if (!enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const onAnchorClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!link) return
      const id = link.getAttribute('href')!.slice(1)
      const target = id === '' || id === 'top' ? 0 : document.getElementById(id)
      if (target === null) return
      event.preventDefault()
      lenis.scrollTo(target, { duration: 1.4 })
    }
    document.addEventListener('click', onAnchorClick)

    // Arriving from another page with a #section in the URL (e.g. /projects -> /#tools):
    // jump there once layout has settled, and again after fonts load shift things.
    const hash = window.location.hash.slice(1)
    const timers: number[] = []
    if (hash) {
      const jump = () => {
        const el = document.getElementById(hash)
        if (el) lenis.scrollTo(el, { immediate: true, force: true })
      }
      timers.push(window.setTimeout(jump, 120))
      document.fonts?.ready.then(() => timers.push(window.setTimeout(jump, 60)))
    }

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      document.removeEventListener('click', onAnchorClick)
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
    }
  }, [enabled])
}
