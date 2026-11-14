'use client'

import { useEffect, useState } from 'react'
import { MoveUpRight } from 'lucide-react'
import './hero.css'

// Hero stats. The rank is a snapshot of the top-github-users list (followers, Pakistan); update it when it changes.
const STATS = [
  { value: '50', suffix: '+', label: 'Open-source projects contributed to' },
  { value: '6', suffix: '', label: 'Years as a developer' },
  { value: '#18', suffix: '', label: 'GitHub followers rank, Pakistan', href: 'https://github.com/gayanvoice/top-github-users/blob/main/markdown/followers/pakistan.md' },
]

const SCRIPT = [
  { cmd: 'whoami', out: 'aman shahid' },
  { cmd: 'cat role.txt', out: 'security engineer / full-stack dev' },
  { cmd: 'nmap -p 443 devsire.me', out: '443/tcp open  https' },
  { cmd: 'sudo make secure', out: '[ ok ] systems resilient' },
  { cmd: './collab --status', out: 'open to collaborations' },
]

type TermLine = { t: 'cmd' | 'out'; text: string }

const STATIC_LINES: TermLine[] = [
  { t: 'cmd', text: SCRIPT[0].cmd }, { t: 'out', text: SCRIPT[0].out },
  { t: 'cmd', text: SCRIPT[1].cmd }, { t: 'out', text: SCRIPT[1].out },
]

const clockFormat = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' })

// Live Karachi time. Renders a placeholder until mounted so server and client markup match.
function Clock() {
  const [time, setTime] = useState('--:--:--')
  useEffect(() => {
    const tick = () => setTime(clockFormat.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <time>{time}</time>
}

function Terminal({ animate }: { animate: boolean }) {
  const [lines, setLines] = useState<TermLine[]>(STATIC_LINES)

  useEffect(() => {
    if (!animate) {
      setLines(STATIC_LINES)
      return
    }
    let dead = false
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
    setLines([])
    ;(async () => {
      await sleep(2000)
      for (let i = 0; !dead; i++) {
        const step = SCRIPT[i % SCRIPT.length]
        setLines((prev) => [...prev.slice(-4), { t: 'cmd', text: '' }])
        for (let c = 1; c <= step.cmd.length && !dead; c++) {
          await sleep(55)
          setLines((prev) => [...prev.slice(0, -1), { t: 'cmd', text: step.cmd.slice(0, c) }])
        }
        await sleep(380)
        if (dead) return
        setLines((prev) => [...prev, { t: 'out', text: step.out }])
        await sleep(1800)
      }
    })()
    return () => { dead = true }
  }, [animate])

  return (
    <div className="hero-term" aria-hidden="true">
      <div className="term-bar"><i /><i /><i /><span>devsire@khi:~</span></div>
      <div className="term-body">
        {lines.map((line, i) => (
          <div key={i} className={`term-line ${line.t}`}>
            {line.text}
            {i === lines.length - 1 && <span className="caret" />}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Hero({ motion }: { motion: boolean }) {
  const [animate, setAnimate] = useState(false)

  // Terminal typing runs only when the site toggle is on and the OS does not ask for reduced motion.
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setAnimate(motion && !query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [motion])

  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-kicker">
          <span className="red-dot" /> Karachi, Pakistan <span className="slash">/</span> <Clock /> PKT <span className="slash">/</span> Open to collaborations
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Cybersecurity engineer &amp; full-stack developer</p>
            <h1>
              <span className="mask"><span>BUILDING</span></span>
              <span className="mask"><span className="accent">RESILIENT</span></span>
              <span className="mask"><span>SYSTEMS<span className="red-dot large" /></span></span>
            </h1>
            <p className="hero-intro">I architect secure networks, automate digital forensics, and build high-performance web applications for a safer, more connected world.</p>
            <div className="hero-links">
              <a className="button-primary" href="#work">View selected work <MoveUpRight size={16} /></a>
              <a className="text-link" href="#about">More about me <span>↘</span></a>
            </div>
          </div>

          <div className="hero-stage">
            <div className="hero-art">
              <div className="hero-shape shape-two" />
              <img className="hero-photo" src="/aman-2.png" alt="Aman Shahid, cybersecurity engineer and full-stack developer based in Karachi" width={720} height={744} fetchPriority="high" />
              <div className="hero-art-label">SECURITY<br />/ SYSTEMS<br />/ IMPACT</div>
              <div className="hud" aria-hidden="true">
                <i className="bk tl" /><i className="bk tr" /><i className="bk bl" /><i className="bk br" />
                <span className="hud-id">Subject 01 / Aman Shahid</span>
                <span className="hud-geo">24.8607° N  67.0011° E</span>
                <i className="scan" />
              </div>
            </div>
            <Terminal animate={animate} />
          </div>
        </div>

        <ul className="hero-stats">
          {STATS.map((stat) => {
            const content = (
              <>
                <strong>{stat.value}<span>{stat.suffix}</span></strong>
                <small>{stat.label}{stat.href && <em> ↗</em>}</small>
              </>
            )
            return (
              <li key={stat.label}>
                {stat.href ? <a href={stat.href} target="_blank" rel="noreferrer">{content}</a> : <div>{content}</div>}
              </li>
            )
          })}
        </ul>

        <div className="hero-bottom"><span>Scroll to explore</span><span className="scroll-line" /><span>Portfolio 2026</span></div>
      </div>
    </section>
  )
}