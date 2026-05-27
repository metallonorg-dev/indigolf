import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span>⛳</span> IndiGolf
            </Link>
            <p className={styles.tagline}>
              Golf as a lifestyle — tips, travel stories, gear reviews and more. Curated by Aria, your IndiGolf guide.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Explore</h4>
            <ul className={styles.links}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/blog">All Posts</Link></li>
              <li><Link href="/about">Meet Aria</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Topics</h4>
            <ul className={styles.links}>
              <li><Link href="/blog">Equipment Reviews</Link></li>
              <li><Link href="/blog">Swing Tips</Link></li>
              <li><Link href="/blog">Course Guides</Link></li>
              <li><Link href="/blog">Beginner Basics</Link></li>
            </ul>
          </div>

          {/* Shop */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Shop</h4>
            <ul className={styles.links}>
              <li>
                <a href="https://www.amazon.com/s?k=golf+clubs&tag=indigolf-20" target="_blank" rel="noopener noreferrer sponsored">
                  Golf Clubs
                </a>
              </li>
              <li>
                <a href="https://www.amazon.com/s?k=golf+balls&tag=indigolf-20" target="_blank" rel="noopener noreferrer sponsored">
                  Golf Balls
                </a>
              </li>
              <li>
                <a href="https://www.amazon.com/s?k=golf+bags&tag=indigolf-20" target="_blank" rel="noopener noreferrer sponsored">
                  Golf Bags
                </a>
              </li>
              <li>
                <a href="https://www.amazon.com/s?k=golf+training+aids&tag=indigolf-20" target="_blank" rel="noopener noreferrer sponsored">
                  Training Aids
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className={styles.disclosure}>
          <p>
            <strong>Affiliate Disclosure:</strong> IndiGolf participates in the Amazon Associates program and other affiliate programs. When you click links and make a purchase, we may earn a small commission at no additional cost to you. This helps keep IndiGolf running. We only recommend products we genuinely believe in.
          </p>
          <p>
            <strong>AI Disclosure:</strong> Content on IndiGolf is produced with the support of AI. While we strive for accuracy, always verify important information with professional sources.
          </p>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p>© {year} IndiGolf. All rights reserved.</p>
          <p>Made with ♥ by Jan, Philipp & Aria</p>
        </div>
      </div>
    </footer>
  )
}
