# Vikranth Jagdish Portfolio

My personal site, live at **[www.vikranth.space](https://www.vikranth.space)**.

It is not a typical portfolio. The whole thing is built around a record-crate
metaphor: projects, labs, experience, photos, videos and writing are flipped
through like tracks, with a dithered shader background and my live Spotify
status playing along.

> The Next.js app lives in [`my-app/`](./my-app). Run it from there.

## Highlights

- **Music-player navigation.** A custom carousel (`MusicPortfolio`) drives
  every section. Keyboard and pointer driven, animated with Framer Motion and
  GSAP.
- **Live data.** Spotify now-playing and top tracks, GitHub contribution
  stats, all pulled at request time.
- **`/labs/vtop-mcp`.** A full product landing page for
  [`@vikranth2005/vtop-mcp`](https://www.npmjs.com/package/@vikranth2005/vtop-mcp),
  an MCP server I built and published to npm. One-click "Add to Cursor / VS
  Code" deeplinks, copy-paste configs for Claude, a 12-tool reference, and its
  own SEO metadata plus JSON-LD.
- **Writing.** Long-form posts under `/blogs`, including a plain-English
  account of everything that went into shipping that npm package.
- **SEO done properly.** Generated `sitemap.xml` and `robots.txt`, per-route
  metadata, Open Graph, Twitter cards, canonical URLs and structured data.

## Tech

| Area | Choice |
|---|---|
| Framework | Next.js (App Router), React, TypeScript |
| Styling | Tailwind CSS, custom oklch theme, Space Mono, yellow accent |
| Motion | Framer Motion, GSAP |
| Visuals | Custom dithering shader background |
| Data | SWR, Spotify Web API, GitHub API |
| Hosting | Vercel |

## Structure

```
my-app/
  app/
    page.tsx                 landing
    projects/ labs/ ...      category pages (carousel-driven)
    labs/vtop-mcp/           standalone npm-package landing page
    blogs/<slug>/            one folder per post (page + metadata)
    api/                     blogs, github-stats, spotify endpoints
    sitemap.ts / robots.ts   SEO, served at /sitemap.xml & /robots.txt
    globals.css              theme tokens
  components/                MusicPortfolio, blogs-list, shaders, ...
  lib/                       data.ts (all content), spotify/github helpers
```

## Run locally

```bash
cd my-app
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content

- **Projects, labs, links, location** are data, not markup. Edit
  `my-app/lib/data.ts`.
- **A new blog post** is a folder: create
  `my-app/app/blogs/<slug>/page.tsx` and `layout.tsx` (for metadata), then add
  an entry to `my-app/app/api/blogs/route.ts` so it appears in the list.
- **Theme** (colours, accent, fonts) lives in `my-app/app/globals.css`.

## Links

- Site: [www.vikranth.space](https://www.vikranth.space)
- Package: [npmjs.com/package/@vikranth2005/vtop-mcp](https://www.npmjs.com/package/@vikranth2005/vtop-mcp)
- LinkedIn: [vikranth-jagdish](https://www.linkedin.com/in/vikranth-jagdish-b37798126/)
- X: [@TurtlePlays343](https://x.com/TurtlePlays343)
