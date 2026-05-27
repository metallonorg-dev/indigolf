import { useState } from 'react'
import SEO from '../../components/SEO'
import BlogCard from '../../components/BlogCard'
import { getAllPosts } from '../../lib/posts'
import styles from '../../styles/Blog.module.css'

const ALL_LABEL = 'All Posts'

export default function BlogIndex({ posts, categories }) {
  const [activeCategory, setActiveCategory] = useState(ALL_LABEL)
  const [search, setSearch] = useState('')

  const filtered = posts.filter(post => {
    const matchCat = activeCategory === ALL_LABEL || post.category === activeCategory
    const matchSearch = search === '' ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <>
      <SEO
        title="Golf Blog — Tips, Reviews & Guides"
        description="Browse all of Aria's golf posts — gear reviews, swing tips, travel stories, course guides and more. Updated daily with fresh content."
        url="/blog"
      />

      {/* Header */}
      <section className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <h1 className={styles.title}>Golf Blog</h1>
          <p className={styles.subtitle}>
            Golf as a lifestyle — gear, technique, travel & courses. Curated by Aria.
          </p>

          {/* Search */}
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="search"
              placeholder="Search posts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.search}
              aria-label="Search blog posts"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className={styles.main}>
        <div className="container">
          {/* Category Filter */}
          <div className={styles.filters} role="group" aria-label="Filter by category">
            {[ALL_LABEL, ...categories].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className={styles.count}>
            {filtered.length === 0
              ? 'No posts found'
              : `${filtered.length} post${filtered.length !== 1 ? 's' : ''}`}
            {activeCategory !== ALL_LABEL && ` in "${activeCategory}"`}
            {search && ` matching "${search}"`}
          </p>

          {/* Posts Grid */}
          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>⛳</span>
              <p>No posts found. Try adjusting your search or filter.</p>
              <button
                onClick={() => { setActiveCategory(ALL_LABEL); setSearch('') }}
                className="btn btn-outline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts()
  const categories = [...new Set(posts.map(p => p.category).filter(Boolean))]

  return {
    props: {
      posts,
      categories,
    },
  }
}
