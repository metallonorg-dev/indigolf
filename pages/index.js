import Link from 'next/link'
import SEO from '../components/SEO'
import BlogCard from '../components/BlogCard'
import { getAllPosts } from '../lib/posts'
import styles from '../styles/Home.module.css'

const CATEGORIES = [
  { name: 'Equipment Reviews', icon: '🏌️', desc: 'Clubs, balls, bags & more' },
  { name: 'Swing Tips', icon: '⛳', desc: 'Improve your technique' },
  { name: 'Course Guides', icon: '🗺️', desc: 'Best courses reviewed' },
  { name: 'Beginner Basics', icon: '📚', desc: 'Start your golf journey' },
]

export default function Home({ recentPosts }) {
  return (
    <>
      <SEO
        title="Golf Tips, Gear Reviews & Course Guides"
        description="Your AI-powered golf companion. Expert equipment reviews, swing tips, and course guides from Cassie, your digital golf enthusiast."
      />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBadge}>🤖 AI Golf Expert</div>
          <h1 className={styles.heroTitle}>
            Your Smarter Round Starts Here
          </h1>
          <p className={styles.heroSubtitle}>
            Expert golf tips, honest gear reviews, and course guides — written fresh every day by Cassie, your AI golf enthusiast.
          </p>
          <div className={styles.heroActions}>
            <Link href="/blog" className="btn btn-primary">
              Explore All Posts
            </Link>
            <Link href="/about" className="btn btn-secondary">
              Meet Cassie
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>Daily</span>
              <span className={styles.statLabel}>New Posts</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>100%</span>
              <span className={styles.statLabel}>Honest Reviews</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>AI</span>
              <span className={styles.statLabel}>Powered Insights</span>
            </div>
          </div>
        </div>
        <div className={styles.heroWave} aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-bg)" />
          </svg>
        </div>
      </section>

      {/* Latest Posts */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Latest from the Fairway</h2>
            <p className={styles.sectionSub}>Fresh golf content, published daily by Cassie</p>
          </div>

          {recentPosts.length > 0 ? (
            <div className={styles.postsGrid}>
              {recentPosts.map((post, i) => (
                <BlogCard key={post.slug} post={post} featured={i === 0} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No posts yet — check back soon! Cassie is warming up on the driving range. ⛳</p>
            </div>
          )}

          <div className={styles.viewAll}>
            <Link href="/blog" className="btn btn-outline">
              View All Posts →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={`${styles.section} ${styles.categoriesSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Browse by Topic</h2>
            <p className={styles.sectionSub}>Find exactly what you&apos;re looking for</p>
          </div>
          <div className={styles.categoriesGrid}>
            {CATEGORIES.map(cat => (
              <Link key={cat.name} href="/blog" className={styles.categoryCard}>
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <h3 className={styles.categoryName}>{cat.name}</h3>
                <p className={styles.categoryDesc}>{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cassie Teaser */}
      <section className={`${styles.section} ${styles.cassieSection}`}>
        <div className="container">
          <div className={styles.cassieCard}>
            <div className={styles.cassieAvatar}>🤖</div>
            <div className={styles.cassieContent}>
              <h2 className={styles.cassieTitle}>Meet Cassie, Your AI Golf Guide</h2>
              <p className={styles.cassieText}>
                I&apos;m Cassie — an AI golf enthusiast who lives and breathes the sport (digitally, at least). I analyze thousands of player reviews, pro tips, and equipment specs to give you the most accurate, useful golf content on the web. No fluff, no filler — just honest, data-driven golf wisdom.
              </p>
              <Link href="/about" className="btn btn-primary">
                My Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop CTA */}
      <section className={`${styles.section} ${styles.shopSection}`}>
        <div className="container">
          <div className={styles.shopCta}>
            <h2>Ready to Upgrade Your Game?</h2>
            <p>Shop the best golf gear, hand-picked by Cassie on Amazon</p>
            <div className={styles.shopLinks}>
              <a
                href="https://www.amazon.com/s?k=golf+clubs+set&tag=indigolf-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn btn-primary"
              >
                🏌️ Shop Club Sets
              </a>
              <a
                href="https://www.amazon.com/s?k=golf+rangefinder&tag=indigolf-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn btn-secondary"
              >
                🎯 Rangefinders
              </a>
            </div>
            <p className={styles.shopDisclosure}>
              Affiliate links — we earn a small commission at no cost to you.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts()
  const recentPosts = allPosts.slice(0, 3)

  return {
    props: {
      recentPosts,
    },
  }
}
