# Vikranth Jagdish — Portfolio

The source for [www.vikranth.space](https://www.vikranth.space) — a personal
site built around a "now playing" / music-player metaphor: projects, labs,
experience, photos and writing are browsed like tracks in a record crate.

## Stack

- **Next.js (App Router)** + **React** + **TypeScript**
- **Tailwind CSS** with a custom oklch theme, Space Mono type, yellow accent
- **Framer Motion** + **GSAP** for motion
- A dithering shader background, Spotify "now playing", GitHub stats, and a
  custom carousel UI (`MusicPortfolio`)

## Structure

```
my-app/
├── app/
│   ├── page.tsx              # landing
│   ├── projects/ labs/ …     # category pages (carousel-driven)
│   ├── labs/vtop-mcp/         # standalone product page for the vtop-mcp npm pkg
│   ├── blogs/<slug>/          # one folder per post (page.tsx + layout.tsx meta)
│   ├── api/                   # blogs, github-stats, spotify now-playing/top-tracks
│   ├── sitemap.ts robots.ts   # SEO — generated /sitemap.xml and /robots.txt
│   └── globals.css            # theme tokens
├── components/                # UI (music-portfolio, blogs-list, shaders, …)
└── lib/                       # data.ts (content), spotify/github helpers
```

Content (projects, labs, links) lives in `lib/data.ts`. Blog posts are
self-contained pages registered in `app/api/blogs/route.ts`.

## Develop

```bash
cd my-app
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
```

Add a project/lab by editing `lib/data.ts`. Add a blog by creating
`app/blogs/<slug>/page.tsx` + `layout.tsx` and registering it in
`app/api/blogs/route.ts`.

## Notable

- **`/labs/vtop-mcp`** — a full landing page for
  [`@vikranth2005/vtop-mcp`](https://www.npmjs.com/package/@vikranth2005/vtop-mcp),
  an MCP server I built and published. One-click "Add to Cursor / VS Code"
  deeplinks, copy-paste configs, and its own SEO metadata + JSON-LD.
- **`/blogs`** — long-form writing, including a plain-English account of
  everything that went into shipping that npm package.

Deployed on Vercel.
