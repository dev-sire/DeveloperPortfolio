import type { Metadata } from 'next'
import { ProjectsPage } from '@/components/projects-page'

export const metadata: Metadata = {
  title: 'Projects — DevSire',
  description: 'Every project by Aman Shahid: security tools, full-stack web apps, and DevOps work.',
}

export default function Page() {
  return <ProjectsPage />
}
