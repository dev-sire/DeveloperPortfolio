import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { ProjectsPage } from '@/components/projects-page'
import { SITE_URL, allProjects } from '@/lib/content'

const TITLE = 'Projects: Security Tools & Full-Stack Apps'
const DESCRIPTION = 'Every project by Aman Shahid: SOC and forensics platforms, reverse engineering tools, and full-stack web apps like NodeStream, Ascendia, MindForge, and Visage.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/projects' },
  openGraph: {
    type: 'website',
    url: '/projects',
    siteName: 'DevSire',
    title: `${TITLE} | Aman Shahid`,
    description: DESCRIPTION,
    images: [{ url: '/og-image.png', width: 1733, height: 907, alt: 'Aman Shahid projects' }],
  },
  twitter: { card: 'summary_large_image', title: `${TITLE} | Aman Shahid`, description: DESCRIPTION, images: ['/og-image.png'] },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/projects`,
  url: `${SITE_URL}/projects`,
  name: 'Projects by Aman Shahid',
  description: DESCRIPTION,
  isPartOf: { '@id': `${SITE_URL}/#website` },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: allProjects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        genre: project.category,
        author: { '@id': `${SITE_URL}/#person` },
        ...(project.source ? { url: project.source } : {}),
      },
    })),
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={structuredData} />
      <ProjectsPage />
    </>
  )
}
