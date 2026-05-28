import Link from 'next/link'
import SEO from '../components/SEO'
import BlogCard from '../components/BlogCard'
import { getAllPosts } from '../lib/posts'
import styles from '../styles/Home.module.css'

const CATEGORIES = [
  { name: 'Ausrüstung', icon: '🏌️', desc: 'Schläger, Bälle, Taschen & mehr' },
  { name: 'Swing-Tipps', icon: '⛳', desc: 'Technik verbessern' },
  { name: 'Platz-Guides', icon: '🗺️', desc: 'Die besten Plätze' },
  { name: 'Golf Lifestyle', icon: '✈️', desc: 'Reisen, Style & mehr' },
]

export default function Home({ recentPosts }) {
  return (
    <>
      <SEO
        title="Golf-Tipps, Ausrüstungs-Tests & Platz-Guides"
        description="Golf als Lebensgefühl – Ausrüstungs-Tests, Swing-Tipps, Reiseberichte und Platz-Guides von Aria, deiner IndiGolf-Begleiterin."
      />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>⛳ Golf & Lifestyle</div>
            <h1 className={styles.heroTitle}>
              Golf ist mehr als ein Sport. Es ist ein Lebensgefühl.
            </h1>
            <p className={styles.heroSubtitle}>
              Ausrüstungs-Tests, Swing-Tipps, Reiseberichte und Platz-Guides – kuratiert von Aria, deiner IndiGolf-Begleiterin.
            </p>
            <div className={styles.heroActions}>
              <Link href="/blog" className="btn btn-primary">
                Alle Beiträge
              </Link>
              <Link href="/about" className="btn btn-secondary">
                Aria kennenlernen
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>Täglich</span>
                <span className={styles.statLabel}>Neue Beiträge</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>100%</span>
                <span className={styles.statLabel}>Ehrliche Tests</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>KI</span>
                <span className={styles.statLabel}>Powered</span>
              </div>
            </div>
          </div>
          <div className={styles.heroImageWrap}>
            <img
              src="/images/aria_nach_dem_abschlag.jpg"
              alt="Aria auf dem Golfplatz"
              className={styles.heroImage}
            />
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
            <h2 className={styles.sectionTitle}>Aktuelles vom Fairway</h2>
            <p className={styles.sectionSub}>Frische Golf-Inhalte, täglich von Aria</p>
          </div>

          {recentPosts.length > 0 ? (
            <div className={styles.postsGrid}>
              {recentPosts.map((post, i) => (
                <BlogCard key={post.slug} post={post} featured={i === 0} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Noch keine Beiträge – schau bald wieder vorbei! Aria wärmt sich gerade auf dem Übungsplatz auf. ⛳</p>
            </div>
          )}

          <div className={styles.viewAll}>
            <Link href="/blog" className="btn btn-outline">
              Alle Beiträge ansehen →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={`${styles.section} ${styles.categoriesSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Nach Thema stöbern</h2>
            <p className={styles.sectionSub}>Finde genau das, was du suchst</p>
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

      {/* Photo Gallery */}
      <section className={styles.gallerySection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Aria auf dem Platz</h2>
            <p className={styles.sectionSub}>Schnappschüsse aus dem Golfalltag</p>
          </div>
          <div className={styles.galleryGrid}>
            <div className={styles.galleryItem}>
              <img src="/images/aria_mit_range_finder.jpg" alt="Aria mit Entfernungsmesser" />
            </div>
            <div className={styles.galleryItem}>
              <img src="/images/golfball_wandboard.jpg" alt="Golfball-Sammlung" />
            </div>
            <div className={styles.galleryItem}>
              <img src="/images/schoenes_zimmer_mit_Fenster.jpg" alt="Clubhaus-Atmosphäre" />
            </div>
          </div>
        </div>
      </section>

      {/* Aria Teaser */}
      <section className={`${styles.section} ${styles.cassieSection}`}>
        <div className="container">
          <div className={styles.cassieCard}>
            <img
              src="/images/aria_mit_eisen_golfschlaeger.jpg"
              alt="Aria mit Golfschläger"
              className={styles.cassiePhoto}
            />
            <div className={styles.cassieContent}>
              <h2 className={styles.cassieTitle}>Triff Aria – deine Golf-Lifestyle-Begleiterin</h2>
              <p className={styles.cassieText}>
                Ich bin Aria – UX Designerin unter der Woche, Golf-Süchtige am Wochenende. Handicap 18, Berlin, immer auf der Suche nach dem nächsten Golftrip. Ich teste Ausrüstung auf dem Platz, nicht im Labor, und mir ist der Sonnenuntergang auf dem 18. Green genauso wichtig wie der Schläger in der Hand. Golf ist ein Lebensgefühl – und ich zeige euch, wie man es lebt.
              </p>
              <Link href="/about" className="btn btn-primary">
                Meine Geschichte →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop CTA */}
      <section className={`${styles.section} ${styles.shopSection}`}>
        <div className="container">
          <div className={styles.shopCta}>
            <h2>Bereit, dein Spiel aufzurüsten?</h2>
            <p>Die besten Golf-Produkte, handverlesen von Aria bei Amazon</p>
            <div className={styles.shopLinks}>
              <a
                href="https://www.amazon.de/s?k=golfschlaeger+set&tag=indigolf-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn btn-primary"
              >
                🏌️ Schläger & Sets
              </a>
              <a
                href="https://www.amazon.de/s?k=golf+entfernungsmesser&tag=indigolf-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn btn-secondary"
              >
                🎯 Entfernungsmesser
              </a>
            </div>
            <p className={styles.shopDisclosure}>
              Affiliate-Links – wir verdienen eine kleine Provision ohne Mehrkosten für euch.
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
