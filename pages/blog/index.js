import { useState } from 'react'
import SEO from '../../components/SEO'
import BlogCard from '../../components/BlogCard'
import { getAllPosts } from '../../lib/posts'
import styles from '../../styles/Blog.module.css'

const ALL_LABEL = 'Alle Beiträge'

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
        title="Golf Blog – Tipps, Tests & Platz-Guides"
        description="Alle Beiträge von Aria – Ausrüstungs-Tests, Swing-Tipps, Reiseberichte, Platz-Guides und mehr. Täglich aktualisiert."
        url="/blog"
      />

      {/* Header */}
      <section className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <h1 className={styles.title}>Golf Blog</h1>
          <p className={styles.subtitle}>
            Golf als Lebensgefühl – Ausrüstung, Technik, Reisen & Plätze. Kuratiert von Aria.
          </p>

          {/* Search */}
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="search"
              placeholder="Beiträge suchen..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.search}
              aria-label="Beiträge suchen"
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
              ? 'Keine Beiträge gefunden'
              : `${filtered.length} Beitrag${filtered.length !== 1 ? 'e' : ''}`}
            {activeCategory !== ALL_LABEL && ` in „${activeCategory}"`}
            {search && ` zu „${search}"`}
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
              <p>Keine Beiträge gefunden. Suche oder Filter anpassen.</p>
              <button
                onClick={() => { setActiveCategory(ALL_LABEL); setSearch('') }}
                className="btn btn-outline"
              >
                Filter zurücksetzen
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
