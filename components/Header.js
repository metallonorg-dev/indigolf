import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Header.module.css'

const navLinks = [
  { href: '/', label: 'Startseite' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'Aria kennenlernen' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [router.pathname])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/indigolf-logo.png"
            alt="IndiGolf"
            width={177}
            height={66}
            className={styles.logoImg}
            priority
          />
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="Hauptnavigation">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${router.pathname === link.href || (link.href !== '/' && router.pathname.startsWith(link.href)) ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.amazon.de/s?k=golf+ausruestung&tag=indigolf-20"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={styles.shopBtn}
          >
            Shop
          </a>
        </nav>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
        </button>
      </div>
    </header>
  )
}
