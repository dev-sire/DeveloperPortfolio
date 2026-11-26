# DevSire — Developer Portfolio

**[Live site → devsire.me](https://devsire.me)**

A high-performance, content-driven portfolio for **Aman Shahid** (DevSire) — cybersecurity engineer and full-stack developer based in Karachi, Pakistan.

Built to showcase security tooling, full-stack products, and community initiatives with a cinematic, motion-rich experience that still respects `prefers-reduced-motion` and stays SEO-friendly.

---

## Features

- **Cinematic homepage** — GSAP + ScrollTrigger driven entrances, masked headline reveals, scroll-scrubbed progress bar, and a velocity-aware marquee
- **Smooth scrolling** — Lenis integrated with GSAP’s ticker so ScrollTrigger stays perfectly in sync
- **Motion toggle** — Users can disable animations; the site also honors `prefers-reduced-motion`
- **Projects archive** (`/projects`) — Filterable list of security tools, web apps, and DevOps work with screenshots and source links
- **Initiatives & awards** (`/initiatives`) — Community programs (Tech Tayari, Netacad Learn-a-thon, etc.) with live metrics and status badges
- **Content-first architecture** — Nearly all copy, projects, tools, certifications, and initiatives live in plain TypeScript data files — no CMS required
- **SEO & social ready** — Canonical URLs, Open Graph / Twitter cards, JSON-LD (`Person` + `WebSite`), sitemap, robots.txt, and web app manifest
- **Accessible & responsive** — Keyboard-friendly navigation, focus styles, mobile menu, and a custom red scrollbar that stays out of the way
- **Vercel Analytics** — Lightweight production analytics

---

## Tech Stack

| Layer            | Choice                                      |
|------------------|---------------------------------------------|
| Framework        | [Next.js 16](https://nextjs.org) (App Router) |
| UI               | React 19 + TypeScript                       |
| Styling          | Tailwind CSS 4 + custom CSS                 |
| Animation        | GSAP 3 + ScrollTrigger, Framer Motion, Lenis |
| Icons            | Lucide React                                |
| Analytics        | Vercel Analytics                            |
| Package manager  | pnpm (or Bun / npm)                         |
| Deployment       | Vercel (or any Node host)                   |

---

## Project Structure

```text
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata, Analytics
│   ├── page.tsx            # Homepage + JSON-LD
│   ├── projects/page.tsx   # Projects archive
│   ├── initiatives/page.tsx
│   ├── globals.css         # Design tokens, base styles, scrollbar, sections
│   ├── sitemap.ts
│   ├── robots.ts
│   └── manifest.ts
├── components/
│   ├── portfolio.tsx       # Main homepage composition + GSAP timelines
│   ├── hero.tsx / hero.css
│   ├── site-header.tsx / site-header.css
│   ├── site-footer.tsx
│   ├── projects-page.tsx
│   ├── initiatives-page.tsx
│   ├── signal-compare.tsx  # Interactive “noise vs signal” comparison
│   ├── project-videos.tsx  # Optional project video players
│   └── ui/                 # Button, RandomLetterSwap, VideoPlayer
├── lib/
│   ├── content.ts          # ★ All portfolio content (projects, tools, certs…)
│   ├── initiatives.ts      # ★ Initiatives + awards data
│   ├── videos.ts
│   ├── use-smooth-scroll.ts
│   └── utils.ts
└── public/                 # Images, project screenshots, OG image, favicons
```

★ = edit these files to personalize the site.

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended), npm, or Bun

### Install & run

```bash
# Clone
git clone https://github.com/dev-sire/DeveloperPortfolio.git
cd DeveloperPortfolio

# Install dependencies
pnpm install
# or: npm install / bun install

# Start development server
pnpm dev
# → http://localhost:3000
```

### Build for production

```bash
pnpm build
pnpm start
```

---

## Customization Guide

Almost everything is driven by data files. You rarely need to touch components for content changes.

### 1. Personal info & socials

Edit `lib/content.ts`:

```ts
export const EMAIL = 'you@example.com'
export const SITE_URL = 'https://yourdomain.com'
export const SITE_NAME = 'YourName'
export const SOCIALS = [
  'https://github.com/you',
  'https://www.linkedin.com/in/you/',
  // ...
]
```

Also update the metadata and JSON-LD in `app/layout.tsx` and `app/page.tsx` (title, description, keywords, structured data).

### 2. Projects

In `lib/content.ts`, each project looks like:

```ts
{
  slug: 'my-project',
  title: 'My Project',
  kind: 'Security',                 // used for filtering
  category: 'Cybersecurity & Digital Forensics',
  year: '2026',
  description: 'Short description…',
  tools: ['Python', 'Docker'],
  source: 'https://github.com/you/repo', // optional
  tone: 'project-red',               // visual accent
  featured: true,                    // shows on homepage
  image: '/projects/my-project.png', // drop file in public/projects/
}
```

- Add or remove entries in `allProjects`
- `featuredProjects` is derived automatically
- Screenshots work best at ~1600×1000

### 3. Tools, certifications & process

Still in `lib/content.ts`:

- `toolGroups` — skills grid
- `marqueeWords` — scrolling tech strip
- `certifications`
- `focusAreas`
- `processSteps` — the 5-step methodology section

### 4. Initiatives & awards

Edit `lib/initiatives.ts`:

- `initiativeStats` — big numbers at the top
- `initiatives` — each program (status, metrics, CTA link)
- `awards` — list of recognitions

### 5. Colors & typography

Design tokens live at the top of `app/globals.css`:

```css
:root {
  --ink: #f2efeb;
  --bg: #090909;
  --panel: #11100f;
  --muted: #9e9a95;
  --line: #2d2b2a;
  --red: #e32b3c;
  --display: 'Anton', Impact, sans-serif;
  --body: 'Manrope', Arial, sans-serif;
}
```

Fonts are loaded in `app/layout.tsx` (Google Fonts).

### 6. Images & media

| Asset                    | Location                          |
|--------------------------|-----------------------------------|
| Project screenshots      | `public/projects/*.png`           |
| Open Graph image         | `public/og-image.png` (or as configured) |
| Favicons / Apple icon    | `public/`                         |
| Profile photo (JSON-LD)  | referenced in structured data     |

---

## Key Interactive Pieces

- **Random letter swap** (`components/ui/random-letter-swap.tsx`) — used on nav links for a subtle glitch/hover effect
- **Signal Compare** (`components/signal-compare.tsx`) — before/after style slider that turns noisy logs into a clean signal (illustrates SOC / detection work)
- **Project videos** — optional video players on project pages (see `lib/videos.ts` and related components)
- **Custom scrollbar** — thin red thumb, transparent track, defined in `globals.css`

---

## SEO & Performance Notes

- Metadata is fully typed via Next.js `Metadata` API
- JSON-LD describes a `Person` and `WebSite`
- `app/sitemap.ts` and `app/robots.ts` are generated
- Motion is progressive: heavy GSAP timelines are skipped when the user prefers reduced motion or toggles motion off
- Images should be optimized (Next.js Image is used where applicable; screenshots are static assets)

---

## License

This project is licensed under the **GNU General Public License v3.0**.

You are free to use, modify, and redistribute the code under the terms of the GPL-3.0.  
See the [LICENSE](./LICENSE) file for the full text.

> If you fork this portfolio, please keep attribution somewhere reasonable (footer, README, or about section). A link back to [devsire.me](https://devsire.me) or this repository is appreciated.

---

## Author

**Aman Shahid** (DevSire)  
Cybersecurity Engineer · Full-Stack Developer · Karachi, Pakistan

- Portfolio: [devsire.me](https://devsire.me)
- GitHub: [@dev-sire](https://github.com/dev-sire)
- LinkedIn: [Aman Shahid](https://www.linkedin.com/in/aman-shahid-32708a2b7/)
- Email: [aman.shahid@devsire.me](mailto:aman.shahid@devsire.me)

---

## Contributing

Issues and pull requests are welcome — especially around:

- Accessibility improvements
- Performance / Lighthouse gains
- Cleaner content APIs or additional sections
- Documentation fixes

Please open an issue before large architectural changes so we can discuss direction.

---

<p align="center">
  Built with curiosity, late nights, and a healthy disrespect for boring portfolios.
</p>
