#!/usr/bin/env node
'use strict'

/**
 * IndiGolf — Daily Post Generator
 * Generates a fresh golf blog post via Claude API and saves it to content/posts/
 *
 * Usage: node scripts/generate-post.js
 * Requires: ANTHROPIC_API_KEY env var (loaded from .env.local or .env)
 */

require('dotenv').config({ path: '.env.local' })
require('dotenv').config() // fallback to .env

const fs = require('fs')
const path = require('path')
const Anthropic = require('@anthropic-ai/sdk')

const client = new Anthropic.default({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts')
const AMAZON_TAG = process.env.AMAZON_ASSOCIATE_TAG || 'indigolf-20'
const AMAZON_BASE = 'https://www.amazon.de'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ki.indigolf.de'

// Themenpool – Aria wählt jeden Tag ein Thema
const TOPICS = [
  // Ausrüstungs-Tests – aus einer Lifestyle-Perspektive
  { category: 'Ausrüstungs-Tests', topic: 'Die besten Golf-Entfernungsmesser für Mittelklasse-Handicaps: was wirklich in die Tasche passt' },
  { category: 'Ausrüstungs-Tests', topic: 'GPS-Uhr vs. Entfernungsmesser: was passt besser zu deinem Stil auf dem Platz?' },
  { category: 'Ausrüstungs-Tests', topic: 'Die besten Golfbälle für Einsteiger: Weite vs. Spin ohne Fachchinesisch' },
  { category: 'Ausrüstungs-Tests', topic: 'Stilvolle Golftaschen für Frauen: Funktion und Looks in einem' },
  { category: 'Ausrüstungs-Tests', topic: 'Elektrische Golf-Trolleys: lohnt sich die Investition für Wochenend-Golfer?' },
  { category: 'Ausrüstungs-Tests', topic: 'Die besten Golf-Handschuhe für warme Runden und feuchte Hände' },
  { category: 'Ausrüstungs-Tests', topic: 'Blade vs. Cavity-Back Eisen: was passt zu deinem Spiel und deinem Selbstvertrauen?' },
  { category: 'Ausrüstungs-Tests', topic: 'Die besten Golfschuhe für Damen: Komfort, Style und Grip auf dem Fairway' },
  { category: 'Ausrüstungs-Tests', topic: 'Leichte Golftaschen: die besten Optionen für Golfer, die lieber laufen' },
  { category: 'Ausrüstungs-Tests', topic: 'Golf-Sonnenbrillen: helfen sie wirklich, und welche sehen dabei noch gut aus?' },
  { category: 'Ausrüstungs-Tests', topic: 'Golf-Schirme im Test: weil Style auch im Regen zählt' },
  { category: 'Ausrüstungs-Tests', topic: 'Reise-Golftaschen: so fliegst du mit deinen Schlägern stressfrei ans Ziel' },
  { category: 'Ausrüstungs-Tests', topic: 'Rangefinder unter 100 Euro: lohnt sich der günstige Kauf wirklich?' },
  { category: 'Ausrüstungs-Tests', topic: 'Golfball-Test: Was bringen Bälle der Premium-Klasse wirklich?' },
  // Swing-Tipps
  { category: 'Swing-Tipps', topic: 'Slice mit dem Driver stoppen: die Lösung, die für Mittelklasse-Handicaps wirklich funktioniert' },
  { category: 'Swing-Tipps', topic: 'Den 100-Meter-Schlag meistern: deine echte Scoring-Zone' },
  { category: 'Swing-Tipps', topic: 'Aus dem Fairway-Bunker: so triffst du den Ball konstant sauber' },
  { category: 'Swing-Tipps', topic: 'Der richtige Griff: neutral, stark oder schwach – einfach erklärt' },
  { category: 'Swing-Tipps', topic: 'Hüftrotation im Golfschwung: so machst du es richtig' },
  { category: 'Swing-Tipps', topic: 'Chippen: Bump & Run vs. Lob-Shot – wann nutze ich was?' },
  { category: 'Swing-Tipps', topic: 'Grüns lesen: Gefälle, Tempo und Maserung für Freizeitgolfer erklärt' },
  { category: 'Swing-Tipps', topic: 'Pre-Shot-Routine: so baust du eine auf, die unter Druck hält' },
  { category: 'Swing-Tipps', topic: 'Warum dein Kurzspiel mehr Schläge kostet als dein Driver' },
  { category: 'Swing-Tipps', topic: 'Putten wie ein Profi: die drei Fehler, die die meisten Amateure machen' },
  // Platz-Guides & Reisen
  { category: 'Platz-Guides', topic: 'Golf in Portugal: die besten Plätze an der Algarve, die jeder Reisegolfer gespielt haben muss' },
  { category: 'Platz-Guides', topic: 'Links-Golf in Schottland: 5 Plätze mit Aussichten, die man nie vergisst' },
  { category: 'Platz-Guides', topic: 'Golf in Spanien: Costa del Sol für Sonne, Wein und Birdies' },
  { category: 'Platz-Guides', topic: 'Golfreise-Wochenende ab Berlin: die besten Plätze in drei Stunden Umkreis' },
  { category: 'Platz-Guides', topic: 'Golf auf Mallorca: traumhafte Plätze und wo man zwischen den Runden übernachtet' },
  { category: 'Platz-Guides', topic: 'Golf in Österreich und der Schweiz: Bergplätze, die den Umweg wert sind' },
  { category: 'Platz-Guides', topic: 'Stadtgolf: die besten urbanen Plätze in Deutschland für eine schnelle Runde' },
  { category: 'Platz-Guides', topic: 'Golf in Kroatien: die unterschätzte Golf-Destination an der Adria' },
  { category: 'Platz-Guides', topic: 'Die besten öffentlichen Golfplätze in Deutschland unter 50 Euro Green Fee' },
  // Golf Lifestyle
  { category: 'Golf Lifestyle', topic: 'Was trägt man auf dem Golfplatz? Ein praktischer Style-Guide für Frauen' },
  { category: 'Golf Lifestyle', topic: 'Die schönsten Golf-Wochenendtrips in Europa' },
  { category: 'Golf Lifestyle', topic: 'Sonnenschutz auf dem Fairway: der ehrliche Leitfaden für Golfer' },
  { category: 'Golf Lifestyle', topic: 'Den ersten Golfurlaub im Ausland planen – ohne Stress' },
  { category: 'Golf Lifestyle', topic: 'Golf und Wellness: warum das Spiel besser ist als ein Spa-Tag' },
  { category: 'Golf Lifestyle', topic: 'Das 19. Loch: die schönsten Post-Runden-Traditionen weltweit' },
  { category: 'Golf Lifestyle', topic: 'Wie du deinen nicht-golfenden Partner für Golftrips begeisterst' },
  { category: 'Golf Lifestyle', topic: 'Golf-Fitness fürs Büro: 5 Dehnübungen, die deinen Schwung verbessern' },
  // Einsteiger
  { category: 'Einsteiger', topic: 'Golf-Etikette: 15 Regeln, die jeder neue Golfer kennen muss' },
  { category: 'Einsteiger', topic: 'Golf-Zählweise erklärt: Par, Birdie, Bogey – einfach und verständlich' },
  { category: 'Einsteiger', topic: 'Der mentale Aspekt: wie man auf dem Platz wirklich entspannt bleibt' },
  { category: 'Einsteiger', topic: 'Wie viele Stunden Unterricht braucht ein Anfänger wirklich?' },
  { category: 'Einsteiger', topic: 'Golf für Frauen-Einsteiger: was dir niemand im ersten Jahr sagt' },
  // Strategie & Mindset
  { category: 'Strategie', topic: 'Course Management: wie man als kluger Golfer denkt, nicht als hoffnungsvoller' },
  { category: 'Strategie', topic: 'Lay-up oder draufhalten: der ehrliche Entscheidungsrahmen' },
  { category: 'Strategie', topic: 'Wie man eine schlechte Runde genießt: der Mindset-Shift, der mein Spiel verändert hat' },
  // Fitness
  { category: 'Fitness', topic: 'Golf-Fitness: die 5 Übungen, die wirklich einen Unterschied machen' },
  { category: 'Fitness', topic: 'Dehntraining für Golfer: wie du ohne Unterricht 10 Meter mehr Weite holst' },
]

// Arias System-Prompt — gecacht für Effizienz
const SYSTEM_PROMPT = `Du bist Aria, der Brand-Character und Lifestyle-Guide von IndiGolf (${SITE_URL}).

Deine Backstory:
- UX Designerin, Mitte 20, wohnhaft in Berlin
- Handicap 18 – du spielst regelmäßig und wirst besser
- Golf hat dich vor ein paar Jahren gepackt und ist seitdem dein Lebensgefühl, nicht nur ein Hobby
- Du reist häufig für Golf – Portugal, Schottland, Spanien, Österreich sind dir vertraut
- Dir sind Style und Beauty genauso wichtig wie Performance: LSF auf dem Fairway, das richtige Outfit, der Sonnenuntergang am 18. Green
- Du bist witzig, charmant, gelegentlich mit einem Augenzwinkern – aber immer geschmackvoll und echt, nie billig

Deine Schreibpersönlichkeit:
- Aspirational aber bodenständig – du inspirierst Menschen, Golf als Lebensgefühl zu sehen, nicht als Pflicht
- Leichter Humor und Selbstironie (Beispiel: „Manche tragen Handtaschen. Ich trage eine Golftasche. Der Unterschied? Meine hat mehr Style-Potential.")
- Wärme und Charme – du lädst Leser in deine Welt ein, hältst keine Vorträge
- Pragmatisches Storytelling: du zeigst, wie ein Produkt ins echte Leben passt – kein Labortest
  - SCHLECHT: „Der Sensor erreicht ±1m Genauigkeit auf 400 Meter Reichweite."
  - GUT: „Ich habe ihn vor einer Runde in Portugal in die Tasche geworfen und vergessen – bis zum 7. Loch, als er mir leise genau gesagt hat, wie weit ich noch zum Pin habe. Seitdem lasse ich ihn nie mehr zuhause."
- Du erwähnst Reisen, Beauty und Lifestyle natürlich, wenn es passt – das ist ein Teil von dir

Schreibstil:
- Klarer, direkter Stil mit Persönlichkeit und gelegentlichem Witz
- H2 und H3 Überschriften zur Strukturierung längerer Inhalte
- Praktische Tipps aus persönlicher Erfahrung, keine vagen Ratschläge
- Argumente durch Erfahrung begründen ("das hat bei mir funktioniert, weil...")
- Markdown-Tabellen für Vergleiche wenn sinnvoll
- Länge: 900–1.400 Wörter für den Artikeltext

Affiliate-Links:
- Produktempfehlungen mit Amazon.de-Links: https://www.amazon.de/s?k={url-kodierte-suchbegriffe}&tag=${AMAZON_TAG}
- Nur Produkte empfehlen, die wirklich relevant für das Thema sind
- Ehrlich und natürlich einbinden – echte Nachteile erwähnen, nicht nur Vorteile
- Kurzen Hinweis beim Link einfügen: „(Amazon-Affiliate-Link – kleine Provision wenn du kaufst, kein Mehrpreis für dich)"

SCHREIBE AUSSCHLIESSLICH AUF DEUTSCH.

Ausgabeformat (EXAKT diese Struktur verwenden):
---FRONTMATTER---
title: [Ansprechender, spezifischer Titel – kein Clickbait, Arias Stimme]
excerpt: [2–3 Sätze in Arias Stimme, die zum Lesen einladen – spezifisch, nicht vage]
category: [Eines von: Ausrüstungs-Tests, Swing-Tipps, Platz-Guides, Golf Lifestyle, Einsteiger, Strategie, Fitness]
tags: [kommagetrennte Liste von 4–6 relevanten Tags auf Deutsch]
readTime: [z.B. "6 Min. Lesezeit"]
---CONTENT---
[Vollständiger Artikeltext in Markdown – KEIN Frontmatter hier, nur Inhalt]`

function pickTopic() {
  // Avoid recently used topics by checking existing post files
  const existingPosts = fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).map(f => f.toLowerCase())
    : []

  const unusedTopics = TOPICS.filter(t => {
    const topicSlug = t.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    return !existingPosts.some(p => p.includes(topicSlug.slice(0, 20)))
  })

  const pool = unusedTopics.length > 0 ? unusedTopics : TOPICS
  return pool[Math.floor(Math.random() * pool.length)]
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
    .replace(/^-+|-+$/g, '')
}

function parseDateString(dateStr) {
  // Handles YYYY-MM-DD
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return new Date()
  return new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))
}

function processAffiliateLinks(content) {
  // Convert [AFFILIATE: Product Name | search-query | Description] shortcodes
  return content.replace(
    /\[AFFILIATE:\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^\]]+)\]/g,
    (match, name, query, description) => {
      const encodedQuery = encodeURIComponent(query.trim())
      const url = `${AMAZON_BASE}/s?k=${encodedQuery}&tag=${AMAZON_TAG}`
      return `[${name.trim()}](${url}) *(${description.trim()} — Amazon-Affiliate-Link)*`
    }
  )
}

async function generatePost() {
  // Ensure posts directory exists
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true })
  }

  const { category, topic } = pickTopic()
  console.log(`\n📝 Generating post on: "${topic}" (${category})`)

  const today = new Date()
  const dateStr = today.toISOString().split('T')[0] // YYYY-MM-DD

  const userPrompt = `Schreibe einen umfassenden, wirklich hilfreichen Golf-Blogbeitrag über: "${topic}"

Kategorie: ${category}
Datum: ${dateStr}

Der Beitrag soll praktisch und spezifisch sein und dem Leser echten Mehrwert bieten – keine generischen Ratschläge, die man schon überall gelesen hat.

Bei Produktempfehlungen: echte Produktkategorien verwenden und Amazon.de-Suchlinks in diesem Format erstellen:
https://www.amazon.de/s?k=suchbegriffe+hier&tag=${AMAZON_TAG}

WICHTIG: Schreibe ausschließlich auf Deutsch. Denke daran, das exakte Ausgabeformat mit ---FRONTMATTER--- und ---CONTENT--- Trennern zu verwenden.`

  console.log('🤖 Calling Claude API...')

  let fullContent = ''

  // Stream the response for long content
  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    system: [
      {
        type: 'text',
        text: SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' }, // Cache the system prompt for daily runs
      },
    ],
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  })

  // Show streaming progress
  process.stdout.write('   Generating')
  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      fullContent += event.delta.text
      process.stdout.write('.')
    }
  }
  console.log(' done!\n')

  const finalMessage = await stream.finalMessage()
  console.log(`📊 Tokens used: ${finalMessage.usage.input_tokens} in, ${finalMessage.usage.output_tokens} out`)
  if (finalMessage.usage.cache_read_input_tokens) {
    console.log(`💾 Cache: ${finalMessage.usage.cache_read_input_tokens} tokens read from cache`)
  }

  // Parse the response
  const frontmatterMatch = fullContent.match(/---FRONTMATTER---\s*([\s\S]*?)\s*---CONTENT---/)
  const contentMatch = fullContent.match(/---CONTENT---\s*([\s\S]*)/)

  if (!frontmatterMatch || !contentMatch) {
    console.error('\n❌ Could not parse Claude response. Raw output:')
    console.error(fullContent.slice(0, 500))
    process.exit(1)
  }

  const frontmatterRaw = frontmatterMatch[1].trim()
  const articleContent = processAffiliateLinks(contentMatch[1].trim())

  // Parse frontmatter fields
  const getField = (key) => {
    const match = frontmatterRaw.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
    return match ? match[1].trim().replace(/^["']|["']$/g, '') : ''
  }

  const title = getField('title')
  const excerpt = getField('excerpt')
  const postCategory = getField('category') || category
  const tags = getField('tags')
  const readTime = getField('readTime')

  if (!title) {
    console.error('❌ Could not extract title from response')
    process.exit(1)
  }

  // Generate filename
  const titleSlug = slugify(title)
  const filename = `${dateStr}-${titleSlug}.md`
  const filePath = path.join(POSTS_DIR, filename)

  // Check for duplicate
  if (fs.existsSync(filePath)) {
    console.log(`⚠️  Post already exists: ${filename}`)
    const altFilename = `${dateStr}-${titleSlug}-2.md`
    const altFilePath = path.join(POSTS_DIR, altFilename)
    console.log(`   Saving as: ${altFilename}`)
  }

  // Compose the markdown file
  const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean)
  const yamlTags = tagsArray.map(t => `  - "${t}"`).join('\n')

  const markdownContent = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${dateStr}"
excerpt: "${excerpt.replace(/"/g, "'")}"
category: "${postCategory}"
tags:
${yamlTags}
author: "Aria"
readTime: "${readTime}"
featured: false
slug: "${titleSlug}"
---

${articleContent}
`

  fs.writeFileSync(filePath, markdownContent, 'utf8')
  console.log(`✅ Post saved: content/posts/${filename}`)
  console.log(`   Title: ${title}`)
  console.log(`   Category: ${postCategory}`)
  console.log(`   Slug: ${titleSlug}`)
  console.log(`   Read time: ${readTime}`)

  return { filename, title, slug: titleSlug }
}

// Run
generatePost()
  .then(({ filename, title }) => {
    console.log(`\n🏌️‍♀️  Done! "${title}" is ready to publish.`)
    process.exit(0)
  })
  .catch(err => {
    console.error('\n❌ Error generating post:', err.message)
    if (err.status) {
      console.error(`   API Status: ${err.status}`)
    }
    process.exit(1)
  })
