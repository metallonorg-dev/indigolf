#!/usr/bin/env node
'use strict'

/**
 * IndiGolf — Post-Übersetzer
 * Übersetzt bestehende englische Posts ins Deutsche (Arias Stimme)
 *
 * Usage: node scripts/translate-posts.js
 */

require('dotenv').config({ path: '.env.local' })
require('dotenv').config()

const fs = require('fs')
const path = require('path')
const Anthropic = require('@anthropic-ai/sdk')

const client = new Anthropic.default({ apiKey: process.env.ANTHROPIC_API_KEY })

const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts')
const AMAZON_TAG = process.env.AMAZON_ASSOCIATE_TAG || 'indigolf-20'

// Kategorie-Mapping Englisch → Deutsch
const CATEGORY_MAP = {
  'Equipment Reviews': 'Ausrüstungs-Tests',
  'Swing Tips': 'Swing-Tipps',
  'Course Guides': 'Platz-Guides',
  'Golf Lifestyle': 'Golf Lifestyle',
  'Beginner Basics': 'Einsteiger',
  'Strategy': 'Strategie',
  'Fitness': 'Fitness',
  'Rules': 'Regeln',
  'General': 'Allgemein',
}

const SYSTEM_PROMPT = `Du bist Aria, der Brand-Character von IndiGolf. Du übersetzt englische Golf-Blogartikel ins Deutsche und passt sie dabei an deine Stimme und Persönlichkeit an.

Deine Persönlichkeit:
- UX Designerin, Mitte 20, Berlin, Handicap 18
- Aspirational, charmant, mit leichtem Humor und Augenzwinkern
- Lifestyle-orientiert: du erzählst wie Produkte ins echte Leben passen, keine Laborwerte
- Alle Amazon-Links werden auf amazon.de umgestellt (amazon.com → amazon.de)
- Alle Preisangaben in USD werden in EUR umgerechnet oder weggelassen

Ausgabe-Format (EXAKT):
---FRONTMATTER---
title: [Übersetzter/angepasster Titel auf Deutsch – Arias Stimme]
excerpt: [2–3 Sätze auf Deutsch in Arias Stimme]
category: [Deutsche Kategorie: Ausrüstungs-Tests | Swing-Tipps | Platz-Guides | Golf Lifestyle | Einsteiger | Strategie | Fitness]
tags: [kommagetrennte Tags auf Deutsch]
readTime: [z.B. "7 Min. Lesezeit"]
---CONTENT---
[Vollständiger übersetzter Artikeltext in Markdown – kein Frontmatter]`

async function translatePost(filePath) {
  const filename = path.basename(filePath)
  const raw = fs.readFileSync(filePath, 'utf8')

  // Frontmatter und Content trennen
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/m)
  if (!fmMatch) {
    console.log(`⚠️  Kein Frontmatter gefunden: ${filename} — übersprungen`)
    return
  }

  const frontmatterRaw = fmMatch[1]
  const content = fmMatch[2]

  // Prüfen ob bereits Deutsch
  const titleMatch = frontmatterRaw.match(/^title:\s*["']?(.+?)["']?\s*$/m)
  const title = titleMatch ? titleMatch[1] : ''

  // Einfache Heuristik: wenn "the", "how to", "best", "guide" im Titel → Englisch
  const isEnglish = /\b(the|how to|best|guide|tips|top|your|for|and|vs|with)\b/i.test(title)
  if (!isEnglish) {
    console.log(`✅ Bereits auf Deutsch: ${filename} — übersprungen`)
    return
  }

  console.log(`\n🌐 Übersetze: ${filename}`)
  console.log(`   Titel: ${title}`)

  const userPrompt = `Übersetze diesen englischen Golf-Blogartikel ins Deutsche und passe ihn an Arias Stimme an.

WICHTIG:
- Alle amazon.com Links → amazon.de (gleicher Pfad, nur Domain ändern)
- Den Affiliate-Tag ${AMAZON_TAG} beibehalten
- Amerikanische Platz-Empfehlungen dürfen bleiben, aber kommentiere sie als "auch für Reisende interessant"
- Preis-Angaben in USD weglassen oder durch "Preis variiert" ersetzen
- Arias deutsche Stimme: charmant, lifestyle-orientiert, pragmatisch – kein Fachjargon

Originalartikel:
---
${frontmatterRaw}
---
${content}`

  let fullResponse = ''

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
    messages: [{ role: 'user', content: userPrompt }],
  })

  process.stdout.write('   Übersetze')
  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      fullResponse += event.delta.text
      process.stdout.write('.')
    }
  }
  console.log(' fertig!')

  const usage = (await stream.finalMessage()).usage
  console.log(`   Tokens: ${usage.input_tokens} ein / ${usage.output_tokens} aus`)

  // Antwort parsen
  const fmOut = fullResponse.match(/---FRONTMATTER---\s*([\s\S]*?)\s*---CONTENT---/)
  const contentOut = fullResponse.match(/---CONTENT---\s*([\s\S]*)/)

  if (!fmOut || !contentOut) {
    console.error(`❌ Konnte Antwort nicht parsen für ${filename}`)
    console.error(fullResponse.slice(0, 300))
    return
  }

  const newFM = fmOut[1].trim()
  const newContent = contentOut[1].trim()

  // Felder auslesen
  const getField = (key) => {
    const m = newFM.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
    return m ? m[1].trim().replace(/^["']|["']$/g, '') : ''
  }

  const newTitle    = getField('title')
  const newExcerpt  = getField('excerpt')
  const newCategory = getField('category')
  const newTags     = getField('tags')
  const newReadTime = getField('readTime')

  // Datum aus Dateiname
  const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/)
  const dateStr = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0]

  // Tags als YAML-Array
  const tagsArray = newTags.split(',').map(t => t.trim()).filter(Boolean)
  const yamlTags = tagsArray.map(t => `  - "${t}"`).join('\n')

  // Slug beibehalten (aus Dateiname)
  const slugFromFile = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')

  const newMarkdown = `---
title: "${newTitle.replace(/"/g, '\\"')}"
date: "${dateStr}"
excerpt: "${newExcerpt.replace(/"/g, "'")}"
category: "${newCategory}"
tags:
${yamlTags}
author: "Aria"
readTime: "${newReadTime}"
featured: false
slug: "${slugFromFile}"
---

${newContent}
`

  fs.writeFileSync(filePath, newMarkdown, 'utf8')
  console.log(`✅ Gespeichert: ${filename}`)
  console.log(`   Titel: ${newTitle}`)
  console.log(`   Kategorie: ${newCategory}`)
}

async function main() {
  const files = fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(POSTS_DIR, f))
    .sort()

  console.log(`\n📂 ${files.length} Posts gefunden\n`)

  for (const filePath of files) {
    await translatePost(filePath)
    // Kurze Pause zwischen API-Calls
    await new Promise(r => setTimeout(r, 1000))
  }

  console.log('\n🏌️‍♀️  Alle Posts übersetzt und gespeichert!')
}

main().catch(err => {
  console.error('❌ Fehler:', err.message)
  process.exit(1)
})
