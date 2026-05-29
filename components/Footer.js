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
              IndiGolf
            </Link>
            <p className={styles.tagline}>
              Golf als Lebensgefühl – Tipps, Reiseberichte, Ausrüstungs-Tests und mehr. Kuratiert von Aria, deiner IndiGolf-Begleiterin.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Erkunden</h4>
            <ul className={styles.links}>
              <li><Link href="/">Startseite</Link></li>
              <li><Link href="/blog">Alle Beiträge</Link></li>
              <li><Link href="/about">Aria kennenlernen</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Themen</h4>
            <ul className={styles.links}>
              <li><Link href="/blog">Ausrüstungs-Tests</Link></li>
              <li><Link href="/blog">Swing-Tipps</Link></li>
              <li><Link href="/blog">Platz-Guides</Link></li>
              <li><Link href="/blog">Golf Lifestyle</Link></li>
            </ul>
          </div>

          {/* Shop */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Shop</h4>
            <ul className={styles.links}>
              <li>
                <a href="https://www.amazon.de/s?k=golfschlaeger+set&tag=indigolf-20" target="_blank" rel="noopener noreferrer sponsored">
                  Golfschläger
                </a>
              </li>
              <li>
                <a href="https://www.amazon.de/s?k=golfbaelle&tag=indigolf-20" target="_blank" rel="noopener noreferrer sponsored">
                  Golfbälle
                </a>
              </li>
              <li>
                <a href="https://www.amazon.de/s?k=golftasche&tag=indigolf-20" target="_blank" rel="noopener noreferrer sponsored">
                  Golftaschen
                </a>
              </li>
              <li>
                <a href="https://www.amazon.de/s?k=golf+entfernungsmesser&tag=indigolf-20" target="_blank" rel="noopener noreferrer sponsored">
                  Entfernungsmesser
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className={styles.disclosure}>
          <p>
            <strong>Affiliate-Hinweis:</strong> IndiGolf nimmt am Amazon-Partnerprogramm und anderen Affiliate-Programmen teil. Wenn du auf einen Produktlink klickst und etwas kaufst, verdienen wir eine kleine Provision – ohne Mehrkosten für dich. Das hilft uns, IndiGolf am Laufen zu halten. Wir empfehlen nur Produkte, von denen wir wirklich überzeugt sind.
          </p>
          <p>
            <strong>KI-Hinweis:</strong> Die Inhalte auf IndiGolf werden mit Unterstützung von KI erstellt. Wir bemühen uns um Genauigkeit – bitte überprüfe wichtige Informationen im Zweifelsfall bei einer Fachkraft.
          </p>
        </div>

        {/* Legal */}
        <div className={styles.legal}>
          <a href="https://indigolf.de/impressum/" target="_blank" rel="noopener noreferrer">Impressum</a>
          <span className={styles.legalDivider}>·</span>
          <a href="/datenschutz/">Datenschutz</a>
          <span className={styles.legalDivider}>·</span>
          <a href="https://indigolf.de" target="_blank" rel="noopener noreferrer">indigolf.de</a>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p>© {year} IndiGolf. Alle Rechte vorbehalten.</p>
          <p>Mit ♥ von Jan, Philipp & Aria</p>
        </div>
      </div>
    </footer>
  )
}
