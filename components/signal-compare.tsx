'use client'

import { useCallback, useEffect, useRef, type KeyboardEvent, type PointerEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { attemptBars, rawLogs } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

export function SignalCompare({ animate }: { animate: boolean }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const sweepRef = useRef<gsap.core.Timeline | null>(null)
  const posRef = useRef(50)
  const dragging = useRef(false)

  const setPos = useCallback((value: number) => {
    const next = Math.min(96, Math.max(4, value))
    posRef.current = next
    boxRef.current?.style.setProperty('--pos', `${next}%`)
    handleRef.current?.setAttribute('aria-valuenow', String(Math.round(next)))
  }, [])

  // One intro sweep when the slider first scrolls into view, so people see it is interactive.
  useEffect(() => {
    if (!animate || !boxRef.current) return
    const state = { v: 50 }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, onUpdate: () => setPos(state.v) })
      tl.to(state, { v: 82, duration: 1, ease: 'power2.inOut' })
        .to(state, { v: 22, duration: 1.5, ease: 'power2.inOut' })
        .to(state, { v: 50, duration: 1, ease: 'power2.inOut' })
      sweepRef.current = tl
      ScrollTrigger.create({ trigger: boxRef.current, start: 'top 65%', once: true, onEnter: () => tl.play() })
    }, boxRef)
    return () => {
      ctx.revert()
      sweepRef.current = null
    }
  }, [animate, setPos])

  const fromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = boxRef.current?.getBoundingClientRect()
    if (rect) setPos(((event.clientX - rect.left) / rect.width) * 100)
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    sweepRef.current?.kill()
    dragging.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    fromPointer(event)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    sweepRef.current?.kill()
    if (event.key === 'ArrowLeft') setPos(posRef.current - 4)
    else if (event.key === 'ArrowRight') setPos(posRef.current + 4)
    else if (event.key === 'Home') setPos(4)
    else if (event.key === 'End') setPos(96)
    else return
    event.preventDefault()
  }

  return (
    <div>
      <div
        ref={boxRef}
        className="compare"
        role="group"
        aria-label="Comparison: raw log telemetry on the left, a triaged incident on the right"
        onPointerDown={onPointerDown}
        onPointerMove={(event) => dragging.current && fromPointer(event)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <div className="compare-layer compare-raw" aria-hidden="true">
          <span className="compare-tag tag-left">Raw telemetry</span>
          <div className="log-scroll">
            <div className="log-track">
              {[...rawLogs, ...rawLogs].map((line, index) => (
                <div key={index} className={line.hot ? 'log-line hot' : 'log-line'}>{line.text}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="compare-layer compare-clean">
          <span className="compare-tag tag-right">Triaged incident</span>
          <div className="incident">
            <div className="incident-main">
              <div className="incident-id"><span>INC-0412</span><b>High severity</b></div>
              <h4>SSH brute-force attack on srv-02</h4>
              <p>Repeated failed logins from one external address, grouped into a single incident.</p>
              <dl className="incident-stats">
                <div><dt>Raw events</dt><dd>12,480</dd></div>
                <div><dt>Alerts</dt><dd>3</dd></div>
                <div><dt>Incident</dt><dd>1</dd></div>
              </dl>
            </div>
            <div className="incident-side">
              <div className="incident-chart" aria-hidden="true">
                <div className="bars">{attemptBars.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
                <span>Failed logins per minute</span>
              </div>
              <ol className="incident-timeline">
                <li><time>03:12</time>First failed login from 185.220.101.4</li>
                <li><time>03:14</time>Threshold exceeded, alert raised</li>
                <li><time>03:15</time>Address blocked at the firewall</li>
              </ol>
              <div className="incident-status">Contained: source IP blocked</div>
            </div>
          </div>
        </div>

        <div
          ref={handleRef}
          className="compare-handle"
          role="slider"
          tabIndex={0}
          aria-label="Reveal triaged incident"
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
          onKeyDown={onKeyDown}
        >
          <span className="knob" aria-hidden="true">‹ ›</span>
        </div>
      </div>
      <div className="compare-caption"><span>Drag to see the process</span><span>Illustrative data</span></div>
    </div>
  )
}
