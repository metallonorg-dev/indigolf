import Link from 'next/link'
import SEO from '../components/SEO'
import styles from '../styles/About.module.css'

export default function About() {
  return (
    <>
      <SEO
        title="Meet Aria — IndiGolf Lifestyle Guide"
        description="Meet Aria, the face of IndiGolf. UX designer, Handicap 18, Berlin-based golf enthusiast and traveller. She tests gear on the course, not in a lab."
        url="/about"
      />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>🏌️‍♀️</div>
            <div className={styles.avatarRing} aria-hidden="true" />
          </div>
          <h1 className={styles.heroTitle}>Hi, I&apos;m Aria</h1>
          <p className={styles.heroSub}>Golf Lifestyle Guide & IndiGolf&apos;s Brand Character</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.content}>
        <div className={`container ${styles.contentInner}`}>

          {/* Who I am */}
          <div className={styles.block}>
            <h2>Who Am I?</h2>
            <p>
              UX designer by day, golf addict by weekend. I&apos;m Aria — Handicap 18, based in Berlin, always planning the next golf trip. I discovered golf a few years ago and quickly realised it was more than a sport: it&apos;s a mindset, a lifestyle, and honestly the best excuse to travel somewhere beautiful and spend four hours outdoors.
            </p>
            <p>
              I test gear on the course, not in a lab. When I pick up a rangefinder, I&apos;m not measuring sensor accuracy to three decimal places — I&apos;m asking: does it fit in my bag, does it work when I need it most, and does it still look good when I pull it out on the 5th tee? That&apos;s the kind of honest take you&apos;ll find here.
            </p>
          </div>

          {/* My Golf Life */}
          <div className={styles.block}>
            <h2>My Golf Life in Four Things</h2>
            <div className={styles.featureGrid}>
              {[
                { icon: '🎯', title: 'On the Course', desc: 'Handicap 18 and improving. I play 2–3 rounds a week when I can, everything from municipal tracks to proper resort courses on trips.' },
                { icon: '✈️', title: 'Golf Travel', desc: 'Portugal, Spain, Scotland — I plan most of my holidays around golf courses. The best round I ever played had a view of the Atlantic Ocean.' },
                { icon: '💄', title: 'Style & Beauty', desc: 'Yes, your outfit matters. Not for vanity — because feeling good in what you wear is part of the game. I also never forget SPF 50 on a sunny fairway.' },
                { icon: '🛍️', title: 'Gear Testing', desc: 'I buy and borrow gear to test it properly. If something doesn\'t earn a place in my bag, I\'ll say so — no matter who makes it.' },
              ].map(f => (
                <div key={f.title} className={styles.feature}>
                  <span className={styles.featureIcon}>{f.icon}</span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The IndiGolf Story */}
          <div className={`${styles.block} ${styles.disclosureBlock}`}>
            <div className={styles.disclosureIcon}>⛳</div>
            <h2>The IndiGolf Story</h2>
            <p>
              IndiGolf was started by Jan and Philipp — two Berlin golfers who wanted to share their passion for the game, from real course reviews to honest gear tests and indoor golf adventures. The name? &ldquo;Indi&rdquo; as in independent. No brand deals that compromise the truth. No generic roundups written without ever touching the product.
            </p>
            <p>
              I&apos;m the IndiGolf brand character — the face you&apos;ll see across the blog and social channels. Think of me as the person who brings the content to life: trying the gear, taking the trips, sharing the moments. My stories are designed to feel real, because the experiences they&apos;re based on are.
            </p>
            <p>
              My favourite caption? <em>&ldquo;Manche tragen Handtaschen. Ich trage eine Golftasche. Der Unterschied? Meine hat mehr Style-Potential.&rdquo;</em>
            </p>
          </div>

          {/* Affiliate Disclosure */}
          <div className={`${styles.block} ${styles.affiliateBlock}`}>
            <h2>💰 Affiliate Links & Transparency</h2>
            <p>
              IndiGolf participates in the <strong>Amazon Associates program</strong> and other affiliate partnerships. When you click a product link and make a purchase, we earn a small commission — usually 1–8% — at absolutely no extra cost to you.
            </p>
            <p>
              This is what keeps the site running and lets us keep publishing free content. We&apos;re grateful for every purchase made through our links.
            </p>
            <p>
              <strong>Our promise:</strong> Affiliate relationships never influence recommendations. We won&apos;t push a product just because it pays more. Credibility matters more than any commission.
            </p>
          </div>

          {/* Why Golf */}
          <div className={styles.block}>
            <h2>Why Golf?</h2>
            <p>
              Golf teaches you things no other sport does. Patience. How to breathe when it counts. That a bad shot doesn&apos;t ruin the round — how you respond to it does. I love that it&apos;s simultaneously technical and meditative, accessible and deep.
            </p>
            <p>
              And honestly? Golf in Portugal is like golf in Germany — only with better light, better wine, and a smile that lasts three weeks. If that sentence speaks to you, you&apos;re in the right place.
            </p>
          </div>

          {/* CTA */}
          <div className={styles.ctaBlock}>
            <h2>Let&apos;s Talk Golf</h2>
            <p>Explore the latest tips, reviews, and stories from the fairway</p>
            <div className={styles.ctaButtons}>
              <Link href="/blog" className="btn btn-primary">
                Read the Blog
              </Link>
              <a
                href="https://www.amazon.com/s?k=golf+equipment&tag=indigolf-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn btn-outline"
              >
                Shop Gear
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
