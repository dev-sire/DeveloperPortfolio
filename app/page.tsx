import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { Portfolio } from '@/components/portfolio'
import { EMAIL, SITE_NAME, SITE_URL, SOCIALS, focusAreas } from '@/lib/content'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: 'Portfolio of Aman Shahid, cybersecurity engineer and full-stack developer.',
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Aman Shahid',
      alternateName: 'DevSire',
      url: SITE_URL,
      image: `${SITE_URL}/aman.jpeg`,
      email: `mailto:${EMAIL}`,
      jobTitle: 'Cybersecurity Engineer & Full-Stack Developer',
      description: 'Cybersecurity engineer and full-stack developer building secure systems, forensics tools, and web applications.',
      address: { '@type': 'PostalAddress', addressLocality: 'Karachi', addressCountry: 'PK' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Dawood University of Engineering & Technology' },
      worksFor: { '@type': 'Organization', name: 'NanoTechX' },
      knowsAbout: focusAreas,
      sameAs: SOCIALS,
    },
  ],
}

export default function Page() {
  return (
    <>
      <JsonLd data={structuredData} />
      <Portfolio />
    </>
  )
}
