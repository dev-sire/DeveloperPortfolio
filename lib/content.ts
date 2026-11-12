// All editable portfolio content lives here.

export const EMAIL = 'shahidamaan2019@gmail.com'
export const SITE_URL = 'https://devsire.me'
export const SITE_NAME = 'DevSire'
export const SOCIALS = [
  'https://github.com/dev-sire',
  'https://www.linkedin.com/in/aman-shahid-32708a2b7/',
  'https://www.instagram.com/devsirecodes/',
]

export type Project = {
  slug: string
  title: string
  kind: string
  category: string
  year: string
  description: string
  tools: string[]
  source?: string
  tone: string
  featured: boolean
  // Screenshot shown in the project panel and on the projects page.
  // Drop the file in /public/projects (1600x1000 works best) and set this path.
  // Leave it out and a neutral "screenshot coming soon" frame is shown instead.
  image?: string
}

export const allProjects: Project[] = [
  {
    slug: 'dfir-companion',
    title: 'Chronos',
    kind: 'Security',
    category: 'Cybersecurity & Digital Forensics',
    year: '2026',
    description: 'Automated digital forensics and incident response platform for streamlined investigations.',
    tools: ['Python', 'Velociraptor', 'Docker'],
    source: 'https://github.com/hasamba/DFIR-Companion',
    tone: 'project-red',
    featured: true,
    image: '/projects/dfir-companion.png',
  },
  {
    slug: 'ascendia',
    title: 'Ascendia',
    kind: 'Web app',
    category: 'Full-Stack Web App',
    year: '2026',
    description: 'AI-enhanced learning management system designed for modern education.',
    tools: ['Next.js', 'Prisma', 'Tailwind'],
    source: 'https://github.com/dev-sire/Ascendia',
    tone: 'project-sand',
    featured: true,
    image: '/projects/ascendia.png',
  },
  {
    slug: 'sirereverse',
    title: 'SireReverse',
    kind: 'Security',
    category: 'Reverse Engineering',
    year: '2026',
    description: 'Reverse engineering tool built to take compiled software apart and make sense of what is inside.',
    tools: [],
    source: 'https://github.com/dev-sire/SireReverse',
    tone: 'project-violet',
    featured: false,
    image: '/projects/sirereverse.png',
  },
  {
    slug: 'nodestream',
    title: 'NodeStream',
    kind: 'Web app',
    category: 'Full-Stack Web App',
    year: '2026',
    description: 'AI-powered video streaming platform built for high-throughput media distribution.',
    tools: ['Node.js', 'React', 'TypeScript'],
    source: 'https://github.com/dev-sire/NodeStream',
    tone: 'project-blue',
    featured: true,
    image: '/projects/nodestream.png',
  },
  {
    slug: 'pingpanda',
    title: 'PingPanda',
    kind: 'DevOps',
    category: 'DevOps & Security',
    year: '2026',
    description: 'Real-time event monitoring and alert system for serverless infrastructure.',
    tools: ['Next.js', 'MySQL', 'Prisma'],
    source: 'https://github.com/dev-sire',
    tone: 'project-violet',
    featured: true,
    image: '/projects/pingpanda.png',
  },
  {
    slug: 'mindforge',
    title: 'MindForge',
    kind: 'Web app',
    category: 'Full-Stack Web App',
    year: '2026',
    description: 'A Notion-style workspace for writing, organizing, and connecting notes and documents.',
    tools: [],
    source: 'https://github.com/dev-sire/MindForge',
    tone: 'project-sand',
    featured: false,
    image: '/projects/mindforge.png',
  },
  {
    slug: 'spyrasoc',
    title: 'SpyraSOC',
    kind: 'Security',
    category: 'Security Operations Platform',
    year: '2026',
    description: 'Security operations platform built at the startup where I am CTO and lead developer. Private codebase.',
    tools: [],
    tone: 'project-blue',
    featured: false,
    image: '/projects/spyrasoc.png',
  },
  {
    slug: 'visage',
    title: 'Visage',
    kind: 'Web app',
    category: 'Full-Stack Social App',
    year: '2026',
    description: 'A social media app for sharing moments and connecting with people.',
    tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    source: 'https://github.com/dev-sire/Visage',
    tone: 'project-red',
    featured: false,
    image: '/projects/visage.png',
  },
]

export const featuredProjects = allProjects.filter((project) => project.featured)

export const toolGroups = [
  {
    label: 'Offensive & reversing',
    items: ['Ghidra', 'Burp Suite', 'Metasploit', 'Apktool', 'Nmap'],
  },
  {
    label: 'Defense & forensics',
    items: ['Wazuh', 'Splunk', 'Security Onion'],
  },
  {
    label: 'Networking & systems',
    items: ['Cisco IOS-XE', 'BGP / OSPF', 'Linux', 'Bash'],
  },
  {
    label: 'Build',
    items: ['Next.js', 'React', 'TypeScript', 'Bun', 'Tailwind CSS', 'PostgreSQL', 'MySQL', 'Python', 'Docker'],
  },
];

export const marqueeWords = [
  'Splunk',
  'Wazuh',
  'Security Onion',
  'Ghidra',
  'Burp Suite',
  'Cisco IOS-XE',
  'Next.js',
  'Docker',
];

export const certifications = [
  { name: 'CCNP Instructor Trainings', issuer: 'Cisco' },
  { name: 'CCNA Instructor Trainings', issuer: 'Cisco' },
  { name: 'CyberOps Associate', issuer: 'Cisco' },
  { name: 'Security Analyst Professional Certificate', issuer: 'IBM' },
  { name: 'Certified Ethical Hacker (CEH)', issuer: 'EC-Council' },
]

export const focusAreas = ['Penetration testing', 'SIEM & SOC', 'Digital forensics', 'Network security', 'Full-stack development']

export const processSteps = [
  { title: 'Scope', text: 'Agree on targets, rules of engagement, and what a good outcome looks like.' },
  { title: 'Recon', text: 'Map the attack surface: hosts, services, exposed assets, and entry points.' },
  { title: 'Exploit', text: 'Validate real weaknesses safely, with proof instead of theory.' },
  { title: 'Analyze', text: 'Trace what happened and what it could reach, using logs and a SIEM.' },
  { title: 'Report', text: 'Deliver findings ranked by risk, with fixes your team can act on.' },
]

// Illustrative log lines for the "noise" side of the comparison slider.
const ips = ['185.220.101.4', '45.155.205.233', '193.32.162.71', '103.145.12.9', '91.240.118.50', '222.186.30.14']
const users = ['root', 'admin', 'ubuntu', 'test', 'oracle', 'postgres', 'git', 'pi']

export const rawLogs: { text: string; hot: boolean }[] = Array.from({ length: 36 }, (_, i) => {
  const seconds = i * 17
  const time = `03:${String(12 + Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
  const ip = ips[i % ips.length]
  const user = users[(i * 3) % users.length]
  const pid = 2200 + i * 3
  const port = 40000 + i * 137
  const head = `Nov 10 ${time} srv-02`
  switch (i % 5) {
    case 0: return { text: `${head} sshd[${pid}]: Failed password for ${user} from ${ip} port ${port} ssh2`, hot: true }
    case 1: return { text: `${head} sshd[${pid}]: Invalid user ${user} from ${ip} port ${port}`, hot: false }
    case 2: return { text: `${head} kernel: [UFW AUDIT] IN=eth0 SRC=${ip} DST=10.0.4.12 PROTO=TCP DPT=22`, hot: false }
    case 3: return { text: `${head} sshd[${pid}]: Connection closed by authenticating user ${user} ${ip} port ${port} [preauth]`, hot: false }
    default: return { text: `${head} CRON[${pid}]: pam_unix(cron:session): session opened for user root`, hot: false }
  }
})

export const attemptBars = [8, 10, 14, 22, 38, 64, 92, 100, 88, 40, 12, 6]