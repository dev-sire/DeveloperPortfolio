import type { Metadata } from 'next'
import { InitiativesPage } from '@/components/initiatives-page'
import { JsonLd } from '@/components/json-ld'
import { SITE_URL } from '@/lib/content'
import { awards, initiatives } from '@/lib/initiatives'

const TITLE = 'Initiatives & Awards'
const DESCRIPTION = 'Free tech-education initiatives Aman Shahid leads with NanoTechX on Cisco Networking Academy: Tech Tayari, the Netacad Learn-a-thon, and a Cisco instructor award.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/initiatives' },
  openGraph: {
    type: 'website',
    url: '/initiatives',
    siteName: 'DevSire',
    title: `${TITLE} | Aman Shahid`,
    description: DESCRIPTION,
    images: [{ url: '/og-image.png', width: 1733, height: 907, alt: 'Aman Shahid initiatives and awards' }],
  },
  twitter: { card: 'summary_large_image', title: `${TITLE} | Aman Shahid`, description: DESCRIPTION, images: ['/og-image.png'] },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/initiatives`,
  url: `${SITE_URL}/initiatives`,
  name: 'Initiatives and awards by Aman Shahid',
  description: DESCRIPTION,
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#person` },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: initiatives.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: { '@type': 'Thing', name: item.title, description: item.description, url: item.url },
    })),
  },
  mentions: awards.map((award) => ({ '@type': 'Thing', name: `${award.issuer}: ${award.title}` })),
}

export default function Page() {
  return (
    <>
      <JsonLd data={structuredData} />
      <InitiativesPage />
    </>
  )
}
