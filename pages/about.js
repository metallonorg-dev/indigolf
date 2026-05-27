import Link from 'next/link'
import SEO from '../components/SEO'
import styles from '../styles/About.module.css'

export default function About() {
  return (
    <>
      <SEO
        title="Aria kennenlernen – deine IndiGolf-Begleiterin"
        description="Lern Aria kennen – UX Designerin, Handicap 18, Berlin. Sie testet Ausrüstung auf dem Platz, reist für Golf und lebt das Spiel als Lifestyle."
        url="/about"
      />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.avatarWrap}>
            {/* Aria image slot — replace emoji with <img> when ready */}
            <div className={styles.avatar}>🏌️‍♀️</div>
            <div className={styles.avatarRing} aria-hidden="true" />
          </div>
          <h1 className={styles.heroTitle}>Hi, ich bin Aria</h1>
          <p className={styles.heroSub}>Golf-Lifestyle-Guide & das Gesicht von IndiGolf</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.content}>
        <div className={`container ${styles.contentInner}`}>

          {/* Who I am */}
          <div className={styles.block}>
            <h2>Wer bin ich?</h2>
            <p>
              UX Designerin unter der Woche, Golf-Süchtige am Wochenende. Ich bin Aria – Handicap 18, wohnhaft in Berlin, immer auf der Suche nach dem nächsten Golftrip. Golf hat mich vor ein paar Jahren erwischt, und seitdem ist es mehr als ein Hobby: Es ist ein Lebensgefühl, eine Entschuldigung, schöne Orte zu besuchen, und der beste Grund, vier Stunden lang draußen zu sein.
            </p>
            <p>
              Ich teste Ausrüstung auf dem Platz, nicht im Labor. Wenn ich einen Entfernungsmesser in die Hand nehme, frage ich nicht nach Sensor-Genauigkeit auf drei Nachkommastellen – ich frage: Passt er in meine Tasche? Funktioniert er, wenn ich ihn brauche? Und sieht er noch gut aus, wenn ich ihn auf dem 5. Abschlag heraushole? Genau das findet ihr hier.
            </p>
          </div>

          {/* My Golf Life */}
          <div className={styles.block}>
            <h2>Mein Golfleben in vier Punkten</h2>
            <div className={styles.featureGrid}>
              {[
                { icon: '🎯', title: 'Auf dem Platz', desc: 'Handicap 18, im Aufwärtstrend. Ich spiele 2–3 Runden pro Woche wenn möglich – von städtischen Plätzen bis zu Resorts auf Reisen.' },
                { icon: '✈️', title: 'Golf-Reisen', desc: 'Portugal, Spanien, Schottland – meine besten Urlaube plane ich um Golfplätze. Die schönste Runde meines Lebens hatte den Atlantik im Hintergrund.' },
                { icon: '💄', title: 'Style & Beauty', desc: 'Ja, das Outfit zählt. Nicht aus Eitelkeit – weil man besser spielt, wenn man sich gut fühlt. Und LSF 50 auf dem Fairway ist ein Muss.' },
                { icon: '🛍️', title: 'Ausrüstungs-Tests', desc: 'Ich kaufe und leihe mir Ausrüstung, um sie wirklich zu testen. Wenn etwas keinen Platz in meiner Tasche verdient, sage ich das – egal von wem es kommt.' },
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
            <h2>Die IndiGolf-Geschichte</h2>
            <p>
              IndiGolf wurde von Jan und Philipp gegründet – zwei Berliner Golfer, die ihre Leidenschaft für das Spiel teilen wollten: echte Platz-Reviews, ehrliche Ausrüstungs-Tests und Indoor-Golf-Abenteuer. Der Name? &ldquo;Indi&rdquo; wie unabhängig. Keine Brand-Deals, die die Wahrheit verbiegen. Keine generischen Listen, geschrieben ohne das Produkt je berührt zu haben.
            </p>
            <p>
              Ich bin das Gesicht von IndiGolf – die Figur, die den Content zum Leben erweckt: Ausrüstung testen, Trips machen, Momente teilen. Meine Geschichten sollen sich echt anfühlen, weil die Erlebnisse dahinter es sind.
            </p>
            <p>
              Mein Lieblings-Zitat? <em>&ldquo;Manche tragen Handtaschen. Ich trage eine Golftasche. Der Unterschied? Meine hat mehr Style-Potential.&rdquo;</em>
            </p>
          </div>

          {/* Affiliate Disclosure */}
          <div className={`${styles.block} ${styles.affiliateBlock}`}>
            <h2>💰 Affiliate-Links & Transparenz</h2>
            <p>
              IndiGolf nimmt am <strong>Amazon-Partnerprogramm</strong> und anderen Affiliate-Programmen teil. Wenn du auf einen Produktlink klickst und kaufst, verdienen wir eine kleine Provision – meist 1–8% – ohne Mehrkosten für dich.
            </p>
            <p>
              Diese Einnahmen halten die Seite am Laufen und ermöglichen es uns, täglich kostenlose Inhalte zu veröffentlichen.
            </p>
            <p>
              <strong>Unser Versprechen:</strong> Affiliate-Beziehungen beeinflussen unsere Empfehlungen nie. Wir empfehlen kein Produkt nur wegen einer höheren Provision. Glaubwürdigkeit ist uns mehr wert als jede Provision.
            </p>
          </div>

          {/* Why Golf */}
          <div className={styles.block}>
            <h2>Warum Golf?</h2>
            <p>
              Golf lehrt Dinge, die kein anderer Sport lehrt. Geduld. Wie man atmet, wenn es darauf ankommt. Dass ein schlechter Schlag eine Runde nicht ruiniert – sondern wie man darauf reagiert. Ich liebe, dass das Spiel gleichzeitig technisch und meditativ ist, zugänglich und tief.
            </p>
            <p>
              Und mal ehrlich: Golf in Portugal ist wie Golf in Deutschland – nur mit besserem Licht, besserem Wein und einem Grinsen, das drei Wochen anhält. Wenn euch dieser Satz anspricht, seid ihr hier genau richtig.
            </p>
          </div>

          {/* CTA */}
          <div className={styles.ctaBlock}>
            <h2>Lass uns über Golf reden</h2>
            <p>Entdecke die neuesten Tipps, Tests und Geschichten vom Fairway</p>
            <div className={styles.ctaButtons}>
              <Link href="/blog" className="btn btn-primary">
                Zum Blog
              </Link>
              <a
                href="https://www.amazon.de/s?k=golf+ausruestung&tag=indigolf-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn btn-outline"
              >
                Ausrüstung shoppen
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
