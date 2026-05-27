const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { marked } = require('marked')

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

/**
 * Get all posts sorted by date descending.
 */
function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    return []
  }

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))

  const posts = files.map(filename => {
    const slug = filename.replace(/\.md$/, '')
    const filePath = path.join(POSTS_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(raw)

    return {
      slug: data.slug || slug,
      title: data.title || slug,
      date: data.date ? String(data.date) : '',
      excerpt: data.excerpt || '',
      category: data.category || 'General',
      tags: data.tags || [],
      author: data.author || 'Aria',
      readTime: data.readTime || data.read_time || '',
      featured: data.featured || false,
    }
  })

  return posts.sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date) - new Date(a.date)
  })
}

/**
 * Get a single post with its HTML content.
 */
function getPostBySlug(slug) {
  if (!fs.existsSync(POSTS_DIR)) {
    return null
  }

  // Try exact slug match first, then filename match
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))

  let targetFile = null

  for (const filename of files) {
    const filePath = path.join(POSTS_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(raw)

    if (data.slug === slug || filename.replace(/\.md$/, '') === slug) {
      targetFile = { filename, raw, data }
      break
    }
  }

  if (!targetFile) return null

  const { data, content } = matter(targetFile.raw)

  // Configure marked for safe rendering
  marked.setOptions({
    gfm: true,
    breaks: false,
  })

  const htmlContent = marked(content)

  return {
    slug: data.slug || targetFile.filename.replace(/\.md$/, ''),
    title: data.title || slug,
    date: data.date ? String(data.date) : '',
    excerpt: data.excerpt || '',
    category: data.category || 'General',
    tags: data.tags || [],
    author: data.author || 'Aria',
    readTime: data.readTime || data.read_time || '',
    featured: data.featured || false,
    content: htmlContent,
    rawContent: content,
  }
}

/**
 * Get all slugs for getStaticPaths.
 */
function getAllPostSlugs() {
  if (!fs.existsSync(POSTS_DIR)) {
    return []
  }

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))

  return files.map(filename => {
    const filePath = path.join(POSTS_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(raw)
    return data.slug || filename.replace(/\.md$/, '')
  })
}

module.exports = { getAllPosts, getPostBySlug, getAllPostSlugs }
