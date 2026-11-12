import type { Project } from '@/lib/content'

// Screenshot for a project, or a neutral frame until one is added to /public/projects.
export function ProjectShot({ project }: { project: Project }) {
  if (project.image) {
    return <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
  }
  return (
    <div className="shot-fallback" role="img" aria-label={`${project.title} (screenshot coming soon)`}>
      <span>{project.title}</span>
      <small>Screenshot coming soon</small>
    </div>
  )
}
