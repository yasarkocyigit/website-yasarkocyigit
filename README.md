# Yasar Kocyigit | Personal Blog

A minimal, typographic blog for Yasar Kocyigit built with Next.js 14, Tailwind CSS, and Contentlayer. It serves opinionated writing on data engineering, Databricks, and Azure with a focus on governed metrics and operational clarity.

## Features
- App Router with static generation for all pages and MDX posts
- Light/dark modes powered by `next-themes` with a squared toggle
- Contentlayer-driven MDX pipeline with automatic table of contents and reading time
- UTC ticker, bracketed indices, dashed separators, and responsive two-column layouts
- RSS feed, sitemap, robots, and dynamic Open Graph image endpoint
- CLI helper `pnpm new:post "Title"` to scaffold new MDX posts with incremented indices

## Getting Started
1. Install dependencies
   ```bash
   pnpm install
   ```
2. Start the development server
   ```bash
   pnpm dev
   ```
3. Visit [http://localhost:3000](http://localhost:3000) to see the site. Changes in `app/`, `components/`, `styles/`, or `content/posts/` hot reload automatically.

## Project Structure
- `app/` - App Router routes, layouts, metadata routes, and API handlers
- `components/` - Presentational and interactive UI (Ticker, PostRow, MDX renderers, TOC)
- `content/posts/` - Published MDX posts with typed frontmatter
- `lib/` - Helpers for post queries, formatting, and utilities
- `public/` - Icons and default Open Graph image
- `scripts/` - Automation scripts (`new-post.mjs`)
- `styles/` - Global styling and Tailwind utilities

## Portrait Hero
Use the reusable `PortraitHero` component when you need a full-bleed photo block with a vignette.

```tsx
import PortraitHero from "@/components/PortraitHero";

export default function Example() {
  return (
    <PortraitHero
      src="/profilephoto.jpg"
      alt="Portrait of Yasar Kocyigit"
      focalX="50%"
      focalY="32%"
      intensity="medium"
    />
  );
}
```

Props:
- `src`, `alt` - required image source/alt text.
- `focalX`, `focalY` - adjust object position (CSS values, default `50%` and `35%`).
- `intensity` - vignette strength (`soft` | `medium` | `hard`).
- `showNoise` - enable subtle film grain overlay.

## Content Workflow
- Add new posts with `pnpm new:post "Your Title"`. The script generates the next index automatically.
- MDX frontmatter fields:
  ```yaml
  title: string
  date: YYYY-MM-DD
  index: number
  summary: string
  tags: string[]
  draft: boolean
  ```
- Posts are sorted by `index` (descending) and then `date`.

## Build & Deploy
- Production build: `pnpm build`
- Preview locally: `pnpm start`
- The project is static-export friendly and works well on Vercel, Netlify, or Azure Static Web Apps.

## Environment
- Node.js 18+
- pnpm 8+

## Verification Checklist
1. `pnpm i && pnpm dev` works at http://localhost:3000
2. Light/dark toggle persists the chosen theme
3. Home list shows `[index]`, dashed separators, UTC ticker
4. `/blog/[slug]` renders MDX with TOC and copy buttons
5. `/rss.xml` and `/sitemap.xml` respond
6. `pnpm new:post "My Post"` creates a valid MDX with next index
