'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award as AwardIcon, ArrowUpRight, MoveUpRight } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { EMAIL } from '@/lib/content'
import { ORGANIZATION, awards, initiativeStats, initiatives, marqueeTopics, type Stat } from '@/lib/initiatives'
import { useSmoothScroll } from '@/lib/use-smooth-scroll'
import './initiatives.css'

gsap.registerPlugin(ScrollTrigger)

const format = (stat: Stat, n = stat.value) => `${stat.prefix ?? ''}${Math.round(n).toLocaleString('en-US')}${stat.suffix ?? ''}`

// Renders the final number on the server; the page animates it from zero when it scrolls into view.
function Num({ stat }: { stat: Stat }) {
  const final = format(stat)
  return <span data-count data-target={stat.value} data-prefix={stat.prefix ?? ''} data-suffix={stat.suffix ?? ''} data-final={final}>{final}</span>
}

// Logos sit on light plates so the dark-lettered artwork stays readable on the dark page.
function Partners() {
  return (
    <div className="partners">
      <span className="partners-label">In partnership with</span>
      <div className="partners-row">
        <span className="logo-plate">
          <img src="/initiatives/nanotechx.png" alt="NanoTechX logo" width={240} height={321} />
          <b>{ORGANIZATION}</b>
        </span>
        <span className="partners-x" aria-hidden="true">×</span>
        <span className="logo-plate">
          <img className="wide" src="/initiatives/cisco-networking-academy.png" alt="Cisco Networking Academy logo" width={720} height={166} />
        </span>
      </div>
    </div>
  )
}

export function InitiativesPage() {
  const shellRef = useRef<HTMLElement>(null)
  const [motion, setMotion] = useState(true)
  const live = initiatives.find((item) => item.status === 'live')

  useSmoothScroll(motion)

  useLayoutEffect(() => {
    const root = shellRef.current
    if (!root || !motion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const counters = Array.from(root.querySelectorAll<HTMLElement>('[data-count]'))

    const ctx = gsap.context(() => {
      // Entrance.
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.site-header', { y: -24, opacity: 0, duration: 0.8, clearProps: 'transform,opacity' })
        .from('.ini-hero .section-index', { y: 16, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.ini-title .mask > span', { yPercent: 110, duration: 1.1, stagger: 0.12, ease: 'power4.out' }, '-=0.3')
        .from('.ini-aside > *', { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.7')
      gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })

      // Headline numbers.
      gsap.from('.ini-stats li', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.ini-stats', start: 'top 92%', once: true } })

      // Journey: the red line fills as you scroll through the chapters.
      gsap.fromTo('.ini-track', { '--p': 0 }, { '--p': 1, ease: 'none', scrollTrigger: { trigger: '.ini-track', start: 'top 72%', end: 'bottom 65%', scrub: 0.6 } })
      gsap.utils.toArray<HTMLElement>('.ini-chapter').forEach((chapter) => {
        gsap.timeline({ scrollTrigger: { trigger: chapter, start: 'top 85%', once: true }, defaults: { ease: 'power3.out' } })
          .from(chapter.querySelector('.ini-node'), { scale: 0, duration: 0.5, ease: 'back.out(3)' })
          .from(chapter.querySelector('.ini-when'), { x: -12, opacity: 0, duration: 0.6 }, '-=0.3')
          .from(chapter.querySelector('.ini-card'), { y: 50, opacity: 0, duration: 0.9 }, '-=0.5')
          .from(chapter.querySelector('.ini-name .mask > span'), { yPercent: 110, duration: 0.9, ease: 'power4.out' }, '-=0.6')
          .from(chapter.querySelectorAll('.ini-status, .ini-desc, .ini-metrics > div, .ini-cta'), { y: 18, opacity: 0, duration: 0.6, stagger: 0.06 }, '-=0.6')
      })

      // Count-up for every number, once, when it comes into view.
      counters.forEach((el) => {
        const target = Number(el.dataset.target)
        const stat = { prefix: el.dataset.prefix, suffix: el.dataset.suffix, value: target } as Stat
        const state = { n: 0 }
        el.textContent = format(stat, 0)
        gsap.to(state, {
          n: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          onUpdate: () => { el.textContent = format(stat, state.n) },
        })
      })

      // Recognition, marquee, closing band.
      gsap.from('.award-seal', { scale: 0.85, opacity: 0, rotate: -12, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.award-stage', start: 'top 80%', once: true } })
      gsap.from('.award-body > *', { y: 24, opacity: 0, duration: 0.8, stagger: 0.09, ease: 'power3.out', scrollTrigger: { trigger: '.award-stage', start: 'top 78%', once: true } })
      gsap.to('.marquee-track', { xPercent: -50, ease: 'none', duration: 32, repeat: -1 })
      gsap.from('.cta-band h2 .mask > span', { yPercent: 110, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.cta-band', start: 'top 85%' } })
    }, root)

    return () => {
      ctx.revert()
      counters.forEach((el) => { el.textContent = el.dataset.final ?? '' })
    }
  }, [motion])

  return (
    <main ref={shellRef} className={motion ? 'site-shell motion-on' : 'site-shell'} id="top">
      <div className="grain" aria-hidden="true" />
      <div className="progress" aria-hidden="true" />
      <SiteHeader page="initiatives" motion={motion} onToggleMotion={() => setMotion(!motion)} />

      <section className="section-wrap ini-hero">
        <div className="ini-head">
          <div>
            <p className="section-index">Initiatives / {initiatives.length} programs{live ? ' · 1 live' : ''}</p>
            <h1 className="display-3 ini-title"><span className="mask"><span>Building people,</span></span><span className="mask"><span className="accent">not just systems.</span></span></h1>
          </div>
          <div className="ini-aside">
            <p>Alongside {ORGANIZATION}, I help run free learning programs on Cisco Networking Academy, taking courses, certificates and badges to thousands of students.</p>
            <Partners />
            {live && (
              <a className="ini-live" href={live.url} target="_blank" rel="noreferrer">
                <i className="live-dot" aria-hidden="true" /> {live.title} registrations are open <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <ul className="ini-stats" aria-label="Impact in numbers">
          {initiativeStats.map((stat) => (
            <li key={stat.label}>
              <strong><Num stat={stat} /></strong>
              <small>{stat.label}</small>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-wrap ini-journey" aria-labelledby="journey-title">
        <p className="section-index">Journey / {initiatives.length} chapters</p>
        <h2 id="journey-title" className="display-3">One mission, <span className="accent">three chapters.</span></h2>

        <div className="ini-track">
          <div className="ini-rail" aria-hidden="true" />
          <ol className="ini-chapters">
            {initiatives.map((item, index) => (
              <li key={item.slug} className={item.status === 'live' ? 'ini-chapter is-live' : 'ini-chapter'}>
                <span className="ini-node" aria-hidden="true" />
                <span className="ini-when">{item.period}</span>
                <article className="ini-card">
                  <span className="ini-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span className="ini-status">{item.status === 'live' && <i className="live-dot" aria-hidden="true" />}{item.statusLabel}</span>
                  <h3 className="ini-name"><span className="mask"><span>{item.title}</span></span></h3>
                  <p className="ini-desc">{item.description}</p>
                  <dl className="ini-metrics">
                    {item.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt>{metric.label}</dt>
                        <dd><Num stat={metric} /></dd>
                      </div>
                    ))}
                  </dl>
                  <a className="button-primary ini-cta" href={item.url} target="_blank" rel="noreferrer">{item.cta} <MoveUpRight size={16} aria-hidden="true" /></a>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-half" key={copy}>{marqueeTopics.map((word) => <span className="marquee-item" key={word}>{word}<span className="red-dot large" /></span>)}</div>
          ))}
        </div>
      </div>

      <section className="section-wrap ini-awards" aria-labelledby="recognition-title">
        <p className="section-index">Recognition / {awards.length} {awards.length === 1 ? 'award' : 'awards'}</p>
        <h2 id="recognition-title" className="display-3">Recognised by <span className="accent">Cisco.</span></h2>
        {awards.map((award) => (
          <div className="award-stage" key={award.title}>
            <span className="award-ghost" aria-hidden="true">1 YEAR</span>
            <div className="award-seal" aria-hidden="true">
              <svg className="seal-ring" viewBox="0 0 200 200">
                <defs><path id="seal-path" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs>
                <text><textPath href="#seal-path">Cisco Networking Academy • Instructor Award • </textPath></text>
              </svg>
              <span className="seal-core"><AwardIcon size={38} /></span>
            </div>
            <div className="award-body">
              <span className="award-issuer">
                <span className="logo-plate small"><img src="/initiatives/cisco.png" alt="" width={200} height={106} /></span>
                {award.issuer}
              </span>
              <h3>{award.title}</h3>
              <p>{award.description}</p>
              <ul className="award-tags" aria-label="Award details">
                <li>Instructor</li>
                <li>Cisco Netacad</li>
                <li>Years of service</li>
              </ul>
            </div>
          </div>
        ))}
      </section>

      <section className="cta-band">
        <h2 className="display-2"><span className="mask"><span>Want to run the next</span></span><span className="mask"><span>one together?</span></span></h2>
        <a href={`mailto:${EMAIL}`} className="email-link">{EMAIL} <ArrowUpRight size={24} /></a>
      </section>
      <SiteFooter />
    </main>
  )
}
