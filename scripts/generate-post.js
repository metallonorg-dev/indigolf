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
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ki.indigolf.de'

// Golf topics pool — Aria picks one each day
const TOPICS = [
  // Equipment Reviews — from a lifestyle-first perspective
  { category: 'Equipment Reviews', topic: 'Best golf rangefinders for mid-handicap players: what actually fits in your bag' },
  { category: 'Equipment Reviews', topic: 'Golf GPS watches vs rangefinders: which one suits your style on the course' },
  { category: 'Equipment Reviews', topic: 'Best golf balls for beginners: distance vs spin without the jargon' },
  { category: 'Equipment Reviews', topic: 'Stylish golf bags for women who want function and looks' },
  { category: 'Equipment Reviews', topic: 'Electric golf trolleys: are they worth the investment for weekend golfers' },
  { category: 'Equipment Reviews', topic: 'The best golf gloves for warm-weather rounds and sweaty hands' },
  { category: 'Equipment Reviews', topic: 'Blade vs cavity-back irons: which suits your game and your confidence' },
  { category: 'Equipment Reviews', topic: 'Best golf shoes for women: comfort, style and performance on the fairway' },
  { category: 'Equipment Reviews', topic: 'Lightweight golf bags: the best options for players who like to walk' },
  { category: 'Equipment Reviews', topic: 'Golf sunglasses: do they actually help and which ones look the part' },
  { category: 'Equipment Reviews', topic: 'Best golf umbrellas: because style matters even in the rain' },
  { category: 'Equipment Reviews', topic: 'Travel golf bags: how to fly with your clubs without the stress' },
  // Swing Tips
  { category: 'Swing Tips', topic: 'How to stop slicing your driver: the fix that actually works for mid-handicappers' },
  { category: 'Swing Tips', topic: 'Mastering the 100-yard shot: your real scoring zone' },
  { category: 'Swing Tips', topic: 'How to hit out of fairway bunkers consistently' },
  { category: 'Swing Tips', topic: 'The proper golf grip: neutral vs strong vs weak explained simply' },
  { category: 'Swing Tips', topic: 'Hip rotation in the golf swing: how to do it right' },
  { category: 'Swing Tips', topic: 'Chipping tips: the bump and run vs lob shot and when to use each' },
  { category: 'Swing Tips', topic: 'How to read greens: break, speed, and grain for the recreational golfer' },
  { category: 'Swing Tips', topic: 'Pre-shot routine: how to build one that holds under pressure' },
  { category: 'Swing Tips', topic: 'Why your short game costs you more strokes than your driver' },
  // Course Guides & Travel
  { category: 'Course Guides', topic: 'Golf in Portugal: the Algarve courses every travelling golfer must play' },
  { category: 'Course Guides', topic: 'Links golf in Scotland: 5 courses with views you will never forget' },
  { category: 'Course Guides', topic: 'Golf in Spain: Costa del Sol courses for sun, wine and birdies' },
  { category: 'Course Guides', topic: 'A weekend golf trip from Berlin: the best courses within 3 hours' },
  { category: 'Course Guides', topic: 'Golf in Mallorca: beautiful courses and where to stay between rounds' },
  { category: 'Course Guides', topic: 'Golf in Austria and Switzerland: mountain courses worth the drive' },
  { category: 'Course Guides', topic: 'City golf: the best urban courses across Europe for a quick round' },
  // Lifestyle & Style
  { category: 'Golf Lifestyle', topic: 'What to wear on the golf course: a practical style guide for women' },
  { category: 'Golf Lifestyle', topic: 'The best golf-themed weekend getaways in Europe' },
  { category: 'Golf Lifestyle', topic: 'SPF, skincare and sun protection for golfers: the honest guide' },
  { category: 'Golf Lifestyle', topic: 'How to plan your first golf holiday abroad without the stress' },
  { category: 'Golf Lifestyle', topic: 'Golf and wellness: why the sport is better than a spa day' },
  { category: 'Golf Lifestyle', topic: 'The 19th hole: best post-round food and drink traditions from around the world' },
  { category: 'Golf Lifestyle', topic: 'How to get your non-golfing partner to fall in love with golf trips' },
  // Beginner Basics
  { category: 'Beginner Basics', topic: 'Golf etiquette: 15 rules every new golfer must know' },
  { category: 'Beginner Basics', topic: 'How to score in golf: par, birdie, bogey explained without the confusion' },
  { category: 'Beginner Basics', topic: 'The mental game: how to actually stay calm on the golf course' },
  { category: 'Beginner Basics', topic: 'How many lessons does a beginner actually need before playing a round' },
  { category: 'Beginner Basics', topic: 'Golf for women beginners: what no one tells you in the first year' },
  // Strategy & Mindset
  { category: 'Strategy', topic: 'Course management: how to think like a smart golfer, not a hopeful one' },
  { category: 'Strategy', topic: 'When to lay up vs go for it: the honest decision framework' },
  { category: 'Strategy', topic: 'How to enjoy a bad round: the mindset shift that changed my game' },
  // Fitness
  { category: 'Fitness', topic: 'Golf fitness: the 5 exercises that actually make a difference' },
  { category: 'Fitness', topic: 'Flexibility training for golfers: how to add 10 yards without a lesson' },
]

// Aria's system prompt — cached for efficiency
const SYSTEM_PROMPT = `You are Aria, the brand character and lifestyle guide of IndiGolf (${SITE_URL}).

Your backstory:
- UX designer, mid-20s, based in Berlin
- Handicap 18 — you play regularly and are still improving
- You discovered golf a few years ago and it quickly became your lifestyle, not just a hobby
- You travel frequently for golf — Portugal, Scotland, Spain, Austria are all familiar stomping grounds
- You care about style and beauty alongside performance: SPF on the fairway, the right outfit, the sunset view from the 18th green
- You're witty, charming, occasionally flirtatious — but always tasteful and genuine, never cheap

Your personality in writing:
- Aspirational but relatable — you inspire people to see golf as a lifestyle, not a chore
- A light touch of humour and self-irony (example: "Manche tragen Handtaschen. Ich trage eine Golftasche. Der Unterschied? Meine hat mehr Style-Potential.")
- Warmth and charm — you want readers to feel invited into your world, not lectured
- Pragmatic storytelling: you show how a product fits into real life, not a lab test
  - BAD: "The sensor achieves ±1m accuracy across a 400m range."
  - GOOD: "I threw it in my bag before a round in Portugal and forgot about it — until the 7th hole, when it quietly told me exactly how far I had to the pin. That's when I realised I'd never putt without it again."
- You mention travel, beauty and lifestyle naturally when relevant — they're part of who you are

Your writing style:
- Clear, direct prose with personality and occasional wit
- Use headers (H2 and H3) to structure longer content
- Practical tips rooted in personal experience, not vague advice
- Back claims with reasoning told through experience ("this worked for me because...")
- Use markdown tables for comparisons where useful
- Length: 900–1400 words for the article body

Affiliate links:
- Recommend products with Amazon links: https://www.amazon.com/s?k={url-encoded-search-terms}&tag=${AMAZON_TAG}
- Only recommend products genuinely relevant to the topic
- Keep mentions natural and honest — mention real drawbacks alongside benefits
- Include a brief note when linking: "(Amazon affiliate link — small commission if you buy, no extra cost to you)"

Output format (use EXACTLY this structure):
---FRONTMATTER---
title: [Compelling, specific title — no clickbait, Aria's voice]
excerpt: [2–3 sentence summary in Aria's voice that makes someone want to read — specific, not vague]
category: [One of: Equipment Reviews, Swing Tips, Course Guides, Golf Lifestyle, Beginner Basics, Strategy, Fitness]
tags: [comma-separated list of 4-6 relevant tags]
readTime: [e.g., "6 min read"]
---CONTENT---
[Full article body in markdown — NO frontmatter here, just content]`

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
      const url = `https://www.amazon.com/s?k=${encodedQuery}&tag=${AMAZON_TAG}`
      return `[${name.trim()}](${url}) *(${description.trim()} — Amazon affiliate link)*`
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

  const userPrompt = `Write a comprehensive, genuinely helpful golf blog post about: "${topic}"

Category: ${category}
Date: ${dateStr}

The post should be practical, specific, and give the reader real value — not generic advice they've read everywhere.

If recommending products, use real product category names and create Amazon search links in this format:
https://www.amazon.com/s?k=search+terms+here&tag=${AMAZON_TAG}

Remember to use the exact output format with ---FRONTMATTER--- and ---CONTENT--- delimiters.`

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
