'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import VideoPlayer from '@/components/ui/video-player'
import { allProjects } from '@/lib/content'
import { projectVideos, type ProjectVideo } from '@/lib/videos'
import './project-videos.css'

// Small cover for the playlist: the poster if there is one, otherwise a frame from the video itself.
function Thumb({ video }: { video: ProjectVideo }) {
  const [failed, setFailed] = useState(false)
  if (video.poster) return <img src={video.poster} alt="" loading="lazy" />
  if (failed) return <div className="vid-thumb-empty">{video.title}</div>
  return <video src={`${video.src}#t=0.1`} preload="metadata" muted playsInline tabIndex={-1} aria-hidden="true" onError={() => setFailed(true)} />
}

export function ProjectVideos() {
  const [index, setIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(false)
  const [missing, setMissing] = useState<string[]>([])

  if (projectVideos.length === 0) return null

  const video = projectVideos[index]
  const project = allProjects.find((item) => item.slug === video.project)
  const unavailable = missing.includes(video.src)

  // Picking another film from the playlist starts it straight away.
  const select = (next: number) => {
    if (next === index) return
    setIndex(next)
    setAutoplay(true)
  }

  return (
    <section className="section-wrap videos" id="films" aria-labelledby="films-title">
      <div className="videos-head">
        <div>
          <p className="section-index">Motion / {projectVideos.length} {projectVideos.length === 1 ? 'film' : 'films'}</p>
          <h2 id="films-title" className="display-3">Projects in <span className="accent">motion.</span></h2>
        </div>
        <p className="videos-note">Short motion pieces that walk through what each project does best.</p>
      </div>

      <div className="vid-layout">
        <div>
          <div className="vid-stage">
            {unavailable ? (
              <div className="shot-fallback" role="img" aria-label={`${video.title} film (coming soon)`}>
                <span>{video.title}</span>
                <small>Film coming soon</small>
              </div>
            ) : (
              <VideoPlayer
                key={video.src}
                src={`${video.src}#t=0.1`}
                poster={video.poster}
                autoPlay={autoplay}
                className="h-full"
                onError={() => setMissing((list) => [...list, video.src])}
              />
            )}
          </div>
          <div className="vid-info">
            <div>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
            {project?.source && (
              <a className="text-link" href={project.source} target="_blank" rel="noreferrer">View source <ArrowUpRight size={14} aria-hidden="true" /></a>
            )}
          </div>
        </div>

        <ul className="vid-list" aria-label="Project films">
          {projectVideos.map((item, i) => (
            <li key={item.slug}>
              <button type="button" className={i === index ? 'vid-item active' : 'vid-item'} aria-current={i === index} onClick={() => select(i)}>
                <span className="vid-thumb"><Thumb video={item} /></span>
                <span className="vid-meta">
                  <small>{String(i + 1).padStart(2, '0')}{item.duration ? ` / ${item.duration}` : ''}</small>
                  <strong>{item.title}</strong>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
