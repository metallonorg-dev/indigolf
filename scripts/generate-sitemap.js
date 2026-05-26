#!/usr/bin/env node
'use strict'

/**
 * IndiGolf — Sitemap Generator
 * Run before `next build` to generate public/sitemap.xml
 *
 * Usage: node scripts/generate-sitemap.js
 */

require('dotenv').config({ path: '.env.local' })
require('dotenv').config()

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ki.indigolf.de'
const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts')
const PUBLIC_DIR = path.join(__dirname, '..', 'public')

function getPostsData() {
  if (!fs.existsSync(POSTS_DIR)) return []

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))

  return files.map(filename => {
    const filePath = path.join(POSTS_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(raw)

    return {
      slug: data.slug || filename.replace(/\.md$/, ''),
      date: data.date ? String(data.date) : '',
      category: data.category || '',
    }
  }).sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date) - new Date(a.date)
  })
}

function formatDate(dateStr) {
  if (!dateStr) return new Date().toISOString().split('T')[0]
  const d = new Date(dateStr)
  return isNaN(d.getTime()) ? new Date().toISOString().split('T')[0] : d.toISOString().split('T')[0]
}

function generateSitemap() {
  const posts = getPostsData()
  const today = new Date().toISOString().split('T')[0]

  const staticPages = [
    { url: '/', changefreq: 'daily', priority: '1.0', lastmod: today },
    { url: '/blog/', changefreq: 'daily', priority: '0.9', lastmod: today },
    { url: '/about/', changefreq: 'monthly', priority: '0.7', lastmod: today },
  ]

  const postPages = posts.map(post => ({
    url: `/blog/${post.slug}/`,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: formatDate(post.date),
  }))

  const allPages = [...staticPages, ...postPages]

  const urlEntries = allPages.map(page => `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true })
  }

  const outputPath = path.join(PUBLIC_DIR, 'sitemap.xml')
  fs.writeFileSync(outputPath, sitemap.trim(), 'utf8')

  console.log(`✅ Sitemap generated: public/sitemap.xml (${allPages.length} URLs)`)
  console.log(`   Static pages: ${staticPages.length}`)
  console.log(`   Blog posts: ${postPages.length}`)
}

generateSitemap()
