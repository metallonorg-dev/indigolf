import Link from 'next/link'
import SEO from '../components/SEO'
import styles from '../styles/About.module.css'

export default function Datenschutz() {
  return (
    <>
      <SEO
        title="Datenschutzerklärung – IndiGolf"
        description="Datenschutzerklärung von ki.indigolf.de gemäß DSGVO."
        url="/datenschutz"
        noIndex={true}
      />

      <section className={styles.hero} style={{ paddingBottom: '2rem' }}>
        <div className={`container ${styles.heroInner}`}>
          <h1 className={styles.heroTitle}>Datenschutzerklärung</h1>
          <p className={styles.heroSub}>Stand: Mai 2026</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={`container ${styles.contentInner}`}>

          <div className={styles.block}>
            <h2>1. Verantwortlicher</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist der Betreiber von IndiGolf.
              Die vollständigen Kontaktdaten findest du im{' '}
              <a href="https://indigolf.de/impressum/" target="_blank" rel="noopener noreferrer">
                Impressum auf indigolf.de
              </a>.
            </p>
          </div>

          <div className={styles.block}>
            <h2>2. Allgemeines zur Datenverarbeitung</h2>
            <p>
              Diese Website ist ein rein statisches Informationsangebot. Es werden keine Nutzerkonten angelegt,
              keine Kontaktformulare angeboten und keine eigenen Cookies durch die Website gesetzt.
            </p>
            <p>
              Wenn du diese Website aufrufst, werden durch den Webserver automatisch technische Zugriffsdaten
              (sogenannte Server-Logs) erfasst. Dazu gehören:
            </p>
            <ul style={{ marginLeft: '1.5rem', lineHeight: '2' }}>
              <li>IP-Adresse des anfragenden Geräts</li>
              <li>Datum und Uhrzeit des Abrufs</li>
              <li>Name der abgerufenen Seite/Datei</li>
              <li>Übertragene Datenmenge</li>
              <li>Browser-Typ und -Version</li>
              <li>Betriebssystem</li>
              <li>Verweisende URL (Referrer)</li>
            </ul>
            <p>
              Diese Daten werden ausschließlich zur technischen Bereitstellung der Website und zur
              Abwehr von Angriffen verarbeitet (Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse).
              Sie werden nicht mit anderen Daten zusammengeführt oder für Werbezwecke genutzt.
            </p>
          </div>

          <div className={styles.block}>
            <h2>3. Hosting</h2>
            <p>
              Diese Website wird auf einem Webserver eines deutschen/europäischen Hosting-Anbieters betrieben.
              Die Verarbeitung der Server-Logs erfolgt auf dessen Servern. Es besteht ein
              Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO.
            </p>
          </div>

          <div className={styles.block}>
            <h2>4. Affiliate-Links (Amazon-Partnerprogramm)</h2>
            <p>
              Diese Website nimmt am <strong>Amazon EU Partnerprogramm</strong> teil, einem
              Partnerprogramm zur Erzielung von Werbekostenerstattungen. Wenn du auf einen
              Amazon-Link klickst und auf amazon.de einen Kauf tätigst, erhalten wir eine
              kleine Provision – ohne Mehrkosten für dich.
            </p>
            <p>
              Beim Klick auf einen Amazon-Link verlässt du unsere Website. Amazon setzt auf seinen
              Seiten eigene Cookies und erhebt Daten gemäß der{' '}
              <a
                href="https://www.amazon.de/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ"
                target="_blank"
                rel="noopener noreferrer"
              >
                Amazon-Datenschutzerklärung
              </a>.
              Wir haben keinen Einfluss auf diese Datenverarbeitung.
            </p>
            <p>
              Rechtsgrundlage für die Einbindung der Affiliate-Links ist Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an der Monetarisierung des kostenlosen Angebots).
            </p>
          </div>

          <div className={styles.block}>
            <h2>5. KI-generierte Inhalte</h2>
            <p>
              Die Inhalte dieser Website werden mit Unterstützung von KI-Technologie (Claude von Anthropic)
              erstellt. Dabei werden keine personenbezogenen Daten von Besuchern dieser Website verarbeitet.
              Die KI-Nutzung erfolgt serverseitig im Rahmen der Inhaltserstellung durch die Betreiber.
            </p>
          </div>

          <div className={styles.block}>
            <h2>6. Externe Links</h2>
            <p>
              Diese Website enthält Links zu externen Websites (z.B. Amazon, Instagram, YouTube).
              Wir haben keinen Einfluss auf die Datenschutzpraktiken dieser Anbieter und empfehlen,
              deren jeweilige Datenschutzerklärungen zu lesen.
            </p>
          </div>

          <div className={styles.block}>
            <h2>7. Deine Rechte</h2>
            <p>Du hast gemäß DSGVO folgende Rechte gegenüber dem Verantwortlichen:</p>
            <ul style={{ marginLeft: '1.5rem', lineHeight: '2' }}>
              <li><strong>Auskunft</strong> (Art. 15 DSGVO) – welche Daten wir über dich verarbeiten</li>
              <li><strong>Berichtigung</strong> (Art. 16 DSGVO) – Korrektur unrichtiger Daten</li>
              <li><strong>Löschung</strong> (Art. 17 DSGVO) – Löschung deiner Daten</li>
              <li><strong>Einschränkung</strong> (Art. 18 DSGVO) – eingeschränkte Verarbeitung</li>
              <li><strong>Widerspruch</strong> (Art. 21 DSGVO) – gegen Verarbeitung auf Basis berechtigter Interessen</li>
              <li><strong>Beschwerde</strong> bei einer Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO)</li>
            </ul>
            <p>
              Zur Ausübung deiner Rechte nutze bitte das{' '}
              <a href="https://indigolf.de/kontakt/" target="_blank" rel="noopener noreferrer">
                Kontaktformular auf indigolf.de
              </a>.
            </p>
          </div>

          <div className={styles.block}>
            <h2>8. Änderungen dieser Datenschutzerklärung</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen,
              etwa bei Änderungen der Website oder neuen gesetzlichen Anforderungen.
              Die aktuelle Version ist stets auf dieser Seite abrufbar.
            </p>
          </div>

          <div className={styles.block} style={{ borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
            <p>
              <Link href="/">← Zurück zur Startseite</Link>
              {' · '}
              <a href="https://indigolf.de/impressum/" target="_blank" rel="noopener noreferrer">
                Impressum
              </a>
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
