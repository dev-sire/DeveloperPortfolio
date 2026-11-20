// Initiatives and awards shown on the /initiatives page. Add an entry to either list and it appears on the page.

export type Stat = {
  prefix?: string
  value: number
  suffix?: string
  label: string
}

export type Initiative = {
  slug: string
  title: string
  // 'live' gets the pulsing badge and the red highlight.
  status: 'live' | 'completed'
  statusLabel: string
  period: string
  description: string
  metrics: Stat[]
  url: string
  cta: string
}

export type Award = {
  title: string
  issuer: string
  description: string
}

export const ORGANIZATION = 'NanoTechX'

// Headline numbers at the top of the page.
export const initiativeStats: Stat[] = [
  { value: 2000, suffix: '+', label: 'Students in Tech Tayari 1.0' },
  { prefix: '~', value: 1500, label: 'Certifications & badges issued' },
  { value: 20, suffix: '+', label: 'Free courses offered via Netacad' },
  { value: 6, suffix: 'th', label: "Place in Pakistan, Netacad EMEA Learn-a-thon'26" },
]

// Oldest first: the page reads as a journey that ends on the live one.
export const initiatives: Initiative[] = [
  {
    slug: 'tech-tayari-1',
    title: 'Tech Tayari 1.0',
    status: 'completed',
    statusLabel: 'Completed',
    period: 'Jul 2025 – Feb 2026',
    description: 'A free learning initiative on Cisco Networking Academy, with courses open to every student and a certificate or badge waiting at the finish line.',
    metrics: [
      { value: 2000, suffix: '+', label: 'Students participated' },
      { value: 20, suffix: '+', label: 'Free courses' },
      { prefix: '~', value: 1500, label: 'Certifications & badges' },
    ],
    url: 'https://nanotechx.org/tech-tayari',
    cta: 'View initiative',
  },
  {
    slug: 'netacad-learn-a-thon',
    title: "Netacad EMEA Learn-a-thon'26",
    status: 'completed',
    statusLabel: 'Completed',
    period: '2026',
    description: "Our learners took on Cisco Netacad's EMEA Learn-a-thon and finished 6th in the Pakistan region.",
    metrics: [
      { value: 6, suffix: 'th', label: 'Place, Pakistan region' },
      { value: 1000, suffix: '+', label: 'Students participated' },
    ],
    url: 'https://nanotechx.org/learn-a-thon',
    cta: 'View initiative',
  },
  {
    slug: 'tech-tayari-2',
    title: 'Tech Tayari 2.0',
    status: 'live',
    statusLabel: 'Registrations open',
    period: 'Now enrolling',
    description: 'The next edition of Tech Tayari: free Cisco Networking Academy courses across six different domains, open for registration now.',
    metrics: [
      { value: 15, suffix: '+', label: 'Free courses' },
      { value: 6, label: 'Domains' },
      { value: 1000, suffix: '+', label: 'Students registered' },
    ],
    url: 'https://nanotechx.org/tech-tayari-2',
    cta: 'Register now',
  },
]

export const awards: Award[] = [
  {
    title: 'Instructor, 1 Year of Service',
    issuer: 'Cisco Networking Academy',
    description: 'Awarded by Cisco Netacad in recognition of a year of service as an instructor.',
  },
]

export const marqueeTopics = ['Tech Tayari', 'Netacad', 'NanoTechX', 'Learn-a-thon', 'Free for all']
