'use client'

import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Search } from 'lucide-react'
import { ProjectShot } from '@/components/project-shot'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { EMAIL, allProjects, type Project } from '@/lib/content'
import { useSmoothScroll } from '@/lib/use-smooth-scroll'

gsap.registerPlugin(ScrollTrigger)

const kinds = ['All', ...Array.from(new Set(allProjects.map((project) => project.kind)))]

function Card({ project, number }: { project: Project; number: number }) {
  const body = (
    <>
      <div className="card-shot">
        <ProjectShot project={project} />
        <span className="card-tag">{project.kind}</span>
      </div>
      <div className="card-meta">
        <span className="card-num">{String(number).padStart(2, '0')}</span>
        <div>
          <h3>{project.title}</h3>
          <p>{project.category} / {project.year}</p>
        </div>
        {project.source && <ArrowUpRight className="card-arrow" size={18} aria-hidden="true" />}
      </div>
      <p className="card-desc">{project.description}</p>
    </>
  )
  return project.source
    ? <a className="card" href={project.source} target="_blank" rel="noreferrer">{body}</a>
    : <div className="card">{body}</div>
}

export function ProjectsPage() {
  const shellRef = useRef<HTMLElement>(null)
  const [motion, setMotion] = useState(true)
  const [kind, setKind] = useState('All')
  const [query, setQuery] = useState('')

  useSmoothScroll(motion)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allProjects.filter((project) =>
      (kind === 'All' || project.kind === kind) &&
      (!q || `${project.title} ${project.category} ${project.kind} ${project.tools.join(' ')}`.toLowerCase().includes(q)),
    )
  }, [kind, query])

  // Page entrance, once.
  useLayoutEffect(() => {
    const root = shellRef.current
    if (!root || !motion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.site-header', { y: -24, opacity: 0, duration: 0.8, clearProps: 'transform,opacity' })
        .from('.archive-title .mask > span', { yPercent: 110, duration: 1.1, stagger: 0.1, ease: 'power4.out' }, '-=0.5')
        .from('.archive-head > *:not(.archive-title), .archive-bar', { y: 20, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.7')
      gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })
      gsap.from('.cta-band h2 .mask > span', { yPercent: 110, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.cta-band', start: 'top 85%' } })
    }, root)
    return () => ctx.revert()
  }, [motion])

  // Cards rise in as they enter the screen, and again whenever the filter or search changes.
  useLayoutEffect(() => {
    const root = shellRef.current
    if (!root || !motion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.set('.card', { opacity: 0, y: 34 })
      ScrollTrigger.batch('.card', {
        start: 'top 92%', once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger: 0.09, ease: 'power3.out', overwrite: true }),
      })
    }, root)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [motion, kind, query])

  return (
    <main ref={shellRef} className={motion ? 'site-shell motion-on' : 'site-shell'} id="top">
      <div className="grain" aria-hidden="true" />
      <div className="progress" aria-hidden="true" />
      <SiteHeader page="projects" motion={motion} onToggleMotion={() => setMotion(!motion)} />

      <section className="section-wrap archive">
        <div className="archive-head">
          <div>
            <p className="section-index">Archive / {allProjects.length} projects</p>
            <h1 className="display-2 archive-title"><span className="mask"><span>Everything</span></span><span className="mask"><span>I&apos;ve <span className="accent">built.</span></span></span></h1>
          </div>
          <Link className="text-link" href="/#work">Featured work <span>↖</span></Link>
        </div>

        <div className="archive-bar">
          <div className="tabs" role="group" aria-label="Filter by project type">
            {kinds.map((item) => (
              <button key={item} type="button" className={kind === item ? 'tab active' : 'tab'} aria-pressed={kind === item} onClick={() => setKind(item)}>{item}</button>
            ))}
          </div>
          <label className="search">
            <Search size={15} aria-hidden="true" />
            <span className="sr-only">Search projects</span>
            <input type="search" placeholder="Title, type or tool" value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
        </div>

        {visible.length > 0 ? (
          <div className="archive-grid">
            {visible.map((project, index) => <Card key={project.slug} project={project} number={index + 1} />)}
          </div>
        ) : (
          <div className="archive-empty">
            <p>No projects match &ldquo;{query}&rdquo;{kind !== 'All' ? ` in ${kind}` : ''}.</p>
            <button type="button" className="text-link" onClick={() => { setQuery(''); setKind('All') }}>Show all projects</button>
          </div>
        )}
      </section>

      <section className="cta-band">
        <h2 className="display-2"><span className="mask"><span>Have a challenge</span></span><span className="mask"><span>worth solving?</span></span></h2>
        <a href={`mailto:${EMAIL}`} className="email-link">{EMAIL} <ArrowUpRight size={24} /></a>
      </section>
      <SiteFooter />
    </main>
  )
}
