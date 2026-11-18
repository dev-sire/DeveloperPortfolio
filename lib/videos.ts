// Project films shown on the projects page. To add one:
// 1. Put the MP4 in /public/videos (H.264, 1080p or less, ideally under ~15 MB).
// 2. Add an entry below. The order here is the playlist order.
export type ProjectVideo = {
  slug: string
  title: string
  // Slug of a project in lib/content.ts. Adds a "View source" link when that project has one.
  project?: string
  description: string
  src: string
  // Optional still. Without it, the first frame of the video is used as the cover.
  poster?: string
  // Shown in the playlist, for example '0:35'.
  duration?: string
}

export const projectVideos: ProjectVideo[] = [
  {
    slug: 'ascendia',
    title: 'Ascendia',
    project: 'ascendia',
    description: 'A motion graphics walkthrough of the main highlights of Ascendia.',
    src: '/videos/ascendia.mp4',
    // poster: '/videos/ascendia.jpg',
    duration: '0:41',
  },
  {
    slug: 'pingpanda',
    title: 'PingPanda',
    project: 'pingpanda',
    description: 'A motion graphics walkthrough of the main highlights of PingPanda.',
    src: '/videos/pingpanda.mp4',
    // poster: '/videos/pingpanda.jpg',
    duration: '0:36',
  },
]