'use client'

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, MoveUpRight } from 'lucide-react'
import { SignalCompare } from '@/components/signal-compare'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { EMAIL, allProjects, certifications, featuredProjects, focusAreas, marqueeWords, processSteps, toolGroups } from '@/lib/content'
import { useSmoothScroll } from '@/lib/use-smooth-scroll'

gsap.registerPlugin(ScrollTrigger)

// One line of a headline, wrapped so it can slide up out of a mask.
function Line({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className="mask"><span className={className}>{children}</span></span>
}

function Words({ text }: { text: string }) {
  return <>{text.split(' ').map((word, i) => <span key={i}><span className="w">{word}</span>{' '}</span>)}</>
}

export function Portfolio() {
  const shellRef = useRef<HTMLElement>(null)
  const [motion, setMotion] = useState(true)

  useSmoothScroll(motion)

  useLayoutEffect(() => {
    const root = shellRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!motion || reduced) return

    // Marquee speed follows scroll velocity and eases back to its idle speed.
    let loop: gsap.core.Tween | null = null
    const decay = () => {
      if (!loop) return
      const current = loop.timeScale()
      const idle = current < 0 ? -1 : 1
      loop.timeScale(current + (idle - current) * 0.06)
    }
    gsap.ticker.add(decay)

    const ctx = gsap.context(() => {
      // Hero: one orchestrated entrance.
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.site-header', { y: -24, opacity: 0, duration: 0.8, clearProps: 'transform,opacity' })
        .from('.hero-kicker, .hero-copy .eyebrow', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.5')
        .from('.hero h1 .mask > span', { yPercent: 115, duration: 1.1, stagger: 0.12, ease: 'power4.out' }, '-=0.4')
        .fromTo('.hero-art', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power4.inOut' }, '<0.1')
        .from('.hero-art .hero-shape', { scale: 1.3, duration: 1.6, ease: 'power3.out' }, '<')
        .from('.hero-intro, .hero-links, .hero-bottom', { y: 22, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.8')

      // Hero parallax on the way out.
      const heroScrub = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('.hero-copy', { y: -60, opacity: 0.2, ease: 'none', scrollTrigger: heroScrub })
      gsap.to('.hero-art', { y: -90, ease: 'none', scrollTrigger: heroScrub })
      gsap.to('.shape-two', { yPercent: -22, ease: 'none', scrollTrigger: heroScrub })

      gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })

      // Headlines slide up out of a mask.
      gsap.utils.toArray<HTMLElement>('[data-lines]').forEach((el) => {
        gsap.from(el.querySelectorAll('.mask > span'), {
          yPercent: 110, duration: 1.05, stagger: 0.09, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      // Body copy and rows reveal in batches.
      gsap.set('[data-reveal]', { opacity: 0, y: 26 })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 90%', once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger: 0.09, ease: 'power3.out', overwrite: true }),
      })

      // About: the statement lights up word by word as you scroll.
      gsap.fromTo('.statement-title .w', { opacity: 0.14 }, {
        opacity: 1, stagger: 0.1, ease: 'none',
        scrollTrigger: { trigger: '.statement-title', start: 'top 78%', end: 'bottom 45%', scrub: true },
      })

      // Experience: rules draw in, then the text follows.
      gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((item) => {
        gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 88%' } })
          .from(item.querySelector('.rule'), { scaleX: 0, transformOrigin: 'left', duration: 1, ease: 'power3.inOut' })
          .from(item.querySelectorAll(':scope > :not(.rule)'), { y: 20, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' }, '<0.2')
      })

      // Tools: marquee reacts to scroll velocity.
      loop = gsap.to('.marquee-track', { xPercent: -50, ease: 'none', duration: 32, repeat: -1 })
      ScrollTrigger.create({
        start: 0, end: 'max',
        onUpdate: (self) => loop?.timeScale(self.direction * (1 + Math.min(Math.abs(self.getVelocity()) / 220, 9))),
      })

      // Process: the line fills and each step lights up as it is reached.
      gsap.to('.steps-fill', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.steps', start: 'top 70%', end: 'bottom 65%', scrub: true } })
      gsap.utils.toArray<HTMLElement>('.step').forEach((step) => {
        ScrollTrigger.create({
          trigger: step, start: 'top 68%',
          onEnter: () => step.classList.add('on'),
          onLeaveBack: () => step.classList.remove('on'),
        })
      })
    }, root)

    // Selected work: panels stack, earlier ones recede. Desktop only.
    const mm = gsap.matchMedia(root)
    mm.add('(min-width: 801px)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('.project-panel')
      panels.forEach((panel, i) => {
        const inner = panel.querySelector('.panel-inner')
        const next = panels[i + 1]
        if (next) {
          gsap.to(inner, { scale: 0.92, opacity: 0.25, ease: 'none', scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true } })
        }
        const shot = panel.querySelector('.app-shot img')
        if (shot) {
          gsap.fromTo(shot, { yPercent: -5 }, {
            yPercent: 5, ease: 'none',
            scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: true },
          })
        }
      })
    })

    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      mm.revert()
      ctx.revert()
      gsap.ticker.remove(decay)
    }
  }, [motion])

  return (
    <main ref={shellRef} className={motion ? 'site-shell motion-on' : 'site-shell'}>
      <div className="grain" aria-hidden="true" />
      <div className="progress" aria-hidden="true" />
      <SiteHeader page="home" motion={motion} onToggleMotion={() => setMotion(!motion)} />

      <section className="hero" id="top">
        <div className="hero-inner">
          <div className="hero-kicker"><span className="red-dot" /> Karachi, Pakistan <span className="slash">/</span> Open to collaborations</div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Cybersecurity engineer &amp; full-stack developer</p>
              <h1 aria-label="Building resilient systems">
                <Line>BUILDING</Line>
                <Line className="accent">RESILIENT</Line>
                <Line>SYSTEMS<span className="red-dot large" /></Line>
              </h1>
              <p className="hero-intro">I architect secure networks, automate digital forensics, and build high-performance web applications for a safer, more connected world.</p>
              <div className="hero-links"><a className="button-primary" href="#work">View selected work <MoveUpRight size={16} /></a><a className="text-link" href="#about">More about me <span>↘</span></a></div>
            </div>
            <div className="hero-art" role="img" aria-label="Portrait of Aman Shahid">
              <div className="hero-shape shape-two" />
              <img className="hero-photo" src="/aman.jpeg" alt="" />
              <div className="hero-art-label">SECURITY<br />/ SYSTEMS<br />/ IMPACT</div>
            </div>
          </div>
          <div className="hero-bottom"><span>Scroll to explore</span><span className="scroll-line" /><span>Portfolio 2026</span></div>
        </div>
      </section>

      <div id="about">
        <section className="statement-section"><div className="section-wrap statement-inner">
          <p className="section-index">01 / THE APPROACH</p>
          <h2 className="display-2 statement-title" aria-label="Good security is invisible. Good design is not.">
            <span className="line"><Words text="Good security is" /></span>
            <span className="line accent"><Words text="invisible." /></span>
            <span className="line"><Words text="Good design is not." /></span>
          </h2>
          <p className="statement-copy" data-reveal>I bring together network engineering, digital forensics, and full-stack development to create technology that feels clear, dependable, and built to last.</p>
          <a href={`mailto:${EMAIL}`} className="circle-link" data-reveal>Start a conversation <ArrowUpRight size={21} /></a>
        </div></section>

        <section className="about-section section-wrap" id="experience">
          <div className="about-top">
            <p className="section-index">02 / EXPERIENCE</p>
            <h2 className="display-2" data-lines><Line>From packets</Line><Line>to <span className="accent">pixels.</span></Line></h2>
            <p className="about-copy" data-reveal>Bachelor of Science in Cybersecurity student at DUET and Cisco Networking Academy Program Lead at NanoTechX. I work at the intersection of infrastructure, investigation, and software.</p>
          </div>
          <div className="timeline">
            <div className="timeline-item"><i className="rule" /><span>2025 — Present</span><div><h3>Cisco Networking Academy Instructor &amp; Program Lead</h3><p>NanoTechX · Karachi, Pakistan</p><small>Leading CCNA and CCNP Enterprise tracks, mentoring the next generation of network engineers.</small></div></div>
            <div className="timeline-item"><i className="rule" /><span>Aug — Oct 2024</span><div><h3>Network Engineering Intern</h3><p>BITS · H3C Department</p><small>Enterprise networking, routing and switching protocols, and network operations.</small></div></div>
            <div className="timeline-item"><i className="rule" /><span>2023 — 2027</span><div><h3>Bachelor of Science in Cybersecurity</h3><p>Dawood University of Engineering &amp; Technology</p><small>Enterprise network security, digital forensics, reverse engineering, and software security.</small></div></div>
          </div>
        </section>
      </div>

      <section className="work-section" id="work">
        <div className="section-wrap">
          <div className="section-heading">
            <p className="section-index">03 / SELECTED WORK</p>
            <h2 className="display-2" data-lines><Line>Selected</Line><Line className="accent">work.</Line></h2>
            <p className="section-note" data-reveal>A selection of systems, products, and security-focused work I&apos;ve designed and developed.</p>
          </div>
        </div>
        <div className="work-stack">
          {featuredProjects.map((project, index) => (
            <article className="project-panel" key={project.title}>
              <div className="panel-inner">
                <div className="panel-copy">
                  <div className="panel-top"><span className="panel-count">0{index + 1} / 0{featuredProjects.length}</span><span className="project-year">{project.year}</span></div>
                  <p className="project-category">{project.category}</p>
                  <h3 className="panel-title" data-lines><Line>{project.title}</Line></h3>
                  <p className="project-description">{project.description}</p>
                  {project.tools.length > 0 && <div className="tool-row">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>}
                  {project.source && <a className="button-primary panel-link" href={project.source} target="_blank" rel="noreferrer">View source <MoveUpRight size={16} /></a>}
                </div>
                <div className={`panel-art ${project.tone}`}>
                  <div className="app-frame">
                    <div className="app-bar" aria-hidden="true"><i /><i /><i /></div>
                    <div className="app-shot"><img src={project.image} alt={`${project.title} screenshot`} loading="lazy" /></div>
                  </div>
                  {project.source && <a className="project-open" href={project.source} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} source`}><ArrowUpRight size={22} /></a>}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="section-wrap">
          <div className="work-more">
            <h3 className="work-more-title">There&apos;s more in the archive.</h3>
            <Link className="button-primary" href="/projects">View all {allProjects.length} projects <MoveUpRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="tools-section" id="tools">
        <div className="section-wrap">
          <div className="section-heading">
            <p className="section-index">04 / TOOLS</p>
            <h2 className="display-2" data-lines><Line>The</Line><Line className="accent">toolkit.</Line></h2>
            <p className="section-note" data-reveal>What I reach for when I test, monitor, investigate, and build.</p>
          </div>
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div className="marquee-half" key={copy}>{marqueeWords.map((word) => <span className="marquee-item" key={word}>{word}<span className="red-dot large" /></span>)}</div>
            ))}
          </div>
        </div>
        <div className="section-wrap">
          <div className="tool-groups">
            {toolGroups.map((group) => (
              <div className="tool-group" key={group.label} data-reveal>
                <h3>{group.label}</h3>
                <div className="tool-chips">{group.items.map((item) => <span className="tool-chip" key={item}>{item}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="section-wrap">
          <div className="compare-block">
            <div className="compare-text">
              <p className="section-index">05 / PROCESS</p>
              <h2 className="display-2" data-lines><Line>From noise.</Line><Line className="accent">To signal.</Line></h2>
              <p className="compare-copy" data-reveal>Twelve thousand log lines mean nothing until someone turns them into a decision. Drag to watch raw telemetry become a triaged incident.</p>
              <p className="compare-meta" data-reveal>SIEM · SOC WORKFLOW · INCIDENT RESPONSE</p>
            </div>
            <SignalCompare animate={motion} />
          </div>

          <div className="craft">
            <div className="craft-head">
              <p className="section-index">Behind the craft</p>
              <h2 className="display-2 craft-title" data-lines><Line>Tools find bugs.</Line><Line className="accent">Method finds risk.</Line></h2>
              <p className="about-copy" data-reveal>I&apos;m Aman, a cybersecurity student and instructor in Karachi. I test systems the way an attacker would, monitor them the way a SOC does, and build the software that fixes what I find.</p>
            </div>
            <div className="craft-grid">
              <div className="craft-col" data-reveal>
                <h3 className="col-title">Certifications</h3>
                <div className="certs">{certifications.map((cert) => <div className="cert" key={cert.name}><span>{cert.name}</span><small>{cert.issuer}</small></div>)}</div>
                <h3 className="col-title focus-title">Focus areas</h3>
                <div className="tool-row">{focusAreas.map((area) => <span key={area}>{area}</span>)}</div>
              </div>
              <div className="craft-col" data-reveal>
                <h3 className="col-title">From recon to report</h3>
                <div className="steps">
                  <i className="steps-fill" />
                  {processSteps.map((step, index) => (
                    <div className="step" key={step.title}>
                      <span className="step-num">0{index + 1}</span><span className="step-dot" />
                      <div><h4>{step.title}</h4><p>{step.text}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="quote-card" data-reveal>
                <span className="quote-mark" aria-hidden="true">“</span>
                <blockquote>Think like the attacker. <span className="soft">Build like the defender.</span></blockquote>
                <div className="signature">Aman</div>
                <a className="quote-cta" href="#contact">Let&apos;s build something secure <ArrowUpRight size={16} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact"><div className="section-wrap contact-inner">
        <p className="section-index">06 / CONTACT</p>
        <h2 className="display-2" data-lines><Line>Have a challenge</Line><Line>worth <span className="accent">solving?</span></Line></h2>
        <a href={`mailto:${EMAIL}`} className="email-link" data-reveal>{EMAIL} <ArrowUpRight size={24} /></a>
        <div className="contact-footer">
          <div><span className="muted-label">Based in</span><p>Karachi, Pakistan</p></div>
          <div><span className="muted-label">Find me online</span>
            <div className="socials">
              <a href="https://github.com/dev-sire" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/aman-shahid-32708a2b7/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://www.instagram.com/devsirecodes/" target="_blank" rel="noreferrer">Instagram</a>
              <a href={`mailto:${EMAIL}`}>Email</a>
            </div>
          </div>
        </div>
      </div></section>
      <SiteFooter />
    </main>
  )
}
