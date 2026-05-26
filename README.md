# ⛳ IndiGolf

An AI-powered golf affiliate blog, written daily by **Cassie** — a Claude-based AI golf enthusiast.

## Features

- **Static Next.js site** — deploys via FTP to any hosting provider
- **Daily AI-generated posts** — GitHub Actions cron job calls Claude API every morning
- **SEO optimized** — meta tags, sitemap, JSON-LD structured data, canonical URLs
- **Affiliate links** — Amazon Associates integration throughout
- **CSS Modules** — clean, scoped styles with no external CSS framework
- **Category filtering** — client-side filter on the blog index page
- **Responsive design** — mobile-first layout

## Tech Stack

- **Framework:** Next.js 14 (Pages Router)
- **Styling:** CSS Modules
- **Content:** Markdown files with YAML frontmatter
- **AI:** Anthropic Claude API (`claude-sonnet-4-6`)
- **Deployment:** Static export (`out/`) via GitHub Actions → FTP
- **Markdown parsing:** `gray-matter` + `marked`

## Project Structure

```
indigolf/
├── components/          # React components
│   ├── Header.js
│   ├── Footer.js
│   ├── BlogCard.js
│   └── SEO.js
├── content/
│   └── posts/           # Markdown blog posts (YYYY-MM-DD-slug.md)
├── lib/
│   └── posts.js         # Post reading & parsing utilities
├── pages/
│   ├── _app.js
│   ├── _document.js
│   ├── index.js         # Homepage
│   ├── about.js         # About Cassie
│   └── blog/
│       ├── index.js     # Blog listing
│       └── [slug].js    # Individual post
├── scripts/
│   ├── generate-post.js    # Claude API post generator
│   └── generate-sitemap.js # Sitemap pre-build script
├── styles/              # CSS Modules + global styles
│   ├── globals.css
│   ├── Home.module.css
│   ├── Blog.module.css
│   ├── About.module.css
│   └── Post.module.css
├── public/
│   ├── robots.txt
│   └── sitemap.xml      # Auto-generated at build time
└── .github/
    └── workflows/
        ├── generate-post.yml  # Daily post generation (9 AM UTC)
        └── deploy.yml         # Build + FTP deploy on push to main
```

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/indigolf.git
cd indigolf
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
ANTHROPIC_API_KEY=your_key_here
NEXT_PUBLIC_SITE_URL=https://indigolf.de
AMAZON_ASSOCIATE_TAG=indigolf-20
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Generate a new post manually

```bash
npm run generate-post
```

This calls the Claude API and saves a new markdown file to `content/posts/`.

### 5. Build for production

```bash
npm run build
```

This runs:
1. `node scripts/generate-sitemap.js` — generates `public/sitemap.xml`
2. `next build` — generates static HTML in `out/`

Upload the contents of `out/` to your hosting via FTP.

## GitHub Actions Setup

### Repository Secrets Required

Go to your GitHub repo → Settings → Secrets and variables → Actions, and add:

| Secret | Description |
|--------|-------------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key |
| `FTP_SERVER` | Your hosting FTP server address |
| `FTP_USERNAME` | FTP username |
| `FTP_PASSWORD` | FTP password |
| `SITE_URL` | Your full site URL (https://indigolf.de) |
| `AMAZON_ASSOCIATE_TAG` | Your Amazon Associates tag (optional) |

### Workflows

- **`generate-post.yml`** — Runs daily at 9 AM UTC. Generates a post, commits it to `main`.
- **`deploy.yml`** — Runs on every push to `main` (including automated posts). Builds and FTP-deploys the site.

## Adding Content Manually

Create a markdown file in `content/posts/` with this frontmatter:

```markdown
---
title: "Your Post Title"
date: "2026-05-26"
excerpt: "2-3 sentence summary for cards and SEO"
category: "Equipment Reviews"
tags:
  - "golf"
  - "equipment"
author: "Cassie"
readTime: "7 min read"
featured: false
slug: "your-post-slug"
---

Your post content here in markdown...
```

## Deployment (FTP)

The `out/` directory from `npm run build` is a complete static website. Upload its contents to your web server's `public_html/` directory via FTP.

**For .htaccess compatibility** (Apache), you may want to add a `.htaccess` file to `public/`:

```apache
Options -Indexes
DirectoryIndex index.html

# Handle trailing slash redirects
RewriteEngine On
RewriteRule ^([^.]+[^/])$ /$1/ [R=301,L]
```

## License

MIT
