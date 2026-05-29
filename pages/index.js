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
              <Link href="/about" className="btn btn-primary">
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

      {/* Friends */}
      <section className={`${styles.section} ${styles.friendsSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Unsere Freunde</h2>
            <p className={styles.sectionSub}>Menschen, die Golf genauso lieben wie wir</p>
          </div>
          <div className={styles.friendsGrid}>
            <div className={styles.friendCard}>
              <h3 className={styles.friendName}>NoBirdieNoParty</h3>
              <p className={styles.friendDesc}>
                Leidenschaftliche Golfer mit einem echten Faible für das Spiel – authentisch, witzig und immer mit dem Herz dabei. Schaut unbedingt bei ihnen vorbei!
              </p>
              <div className={styles.friendLinks}>
                <a
                  href="https://www.youtube.com/@nobirdienoparty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.friendLink}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </a>
                <a
                  href="https://www.instagram.com/nobirdienoparty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.friendLink}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                  Instagram
                </a>
              </div>
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
                className="btn btn-primary-glow"
              >
                🏌️ Schläger & Sets
              </a>
              <a
                href="https://www.amazon.de/s?k=golf+entfernungsmesser&tag=indigolf-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn btn-outline-dark"
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
