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

// Golf topics pool — Cassie picks one each day
const TOPICS = [
  { category: 'Equipment Reviews', topic: 'Best golf rangefinders for mid-handicap players' },
  { category: 'Equipment Reviews', topic: 'Golf GPS watches vs rangefinders: which is better?' },
  { category: 'Equipment Reviews', topic: 'Best golf balls for beginners: distance vs spin' },
  { category: 'Equipment Reviews', topic: 'Top-rated golf push carts under $200' },
  { category: 'Equipment Reviews', topic: 'Electric golf trolleys: are they worth the investment?' },
  { category: 'Equipment Reviews', topic: 'Best golf bags for walking the course' },
  { category: 'Equipment Reviews', topic: 'Top golf gloves for sweaty hands' },
  { category: 'Equipment Reviews', topic: 'Blade vs cavity-back irons: which suits your game?' },
  { category: 'Swing Tips', topic: 'How to stop slicing your driver: the definitive fix' },
  { category: 'Swing Tips', topic: 'Mastering the 100-yard shot: your scoring zone' },
  { category: 'Swing Tips', topic: 'How to hit out of fairway bunkers consistently' },
  { category: 'Swing Tips', topic: 'The proper golf grip: neutral vs strong vs weak' },
  { category: 'Swing Tips', topic: 'Hip rotation in the golf swing: how to do it right' },
  { category: 'Swing Tips', topic: 'Chipping tips: the bump and run vs lob shot' },
  { category: 'Swing Tips', topic: 'How to read greens: break, speed, and grain' },
  { category: 'Swing Tips', topic: 'Pre-shot routine: how to build one that holds under pressure' },
  { category: 'Course Guides', topic: 'Best golf courses in Florida for the money' },
  { category: 'Course Guides', topic: 'Links golf in Scotland: the 5 courses every golfer must play' },
  { category: 'Course Guides', topic: 'Best public golf courses in Texas' },
  { category: 'Course Guides', topic: 'Golf road trip: the Pinehurst area courses guide' },
  { category: 'Beginner Basics', topic: 'Golf etiquette: 15 rules every new golfer must know' },
  { category: 'Beginner Basics', topic: 'How to score in golf: par, birdie, bogey explained' },
  { category: 'Beginner Basics', topic: 'The mental game: how to stay calm on the course' },
  { category: 'Beginner Basics', topic: 'How many lessons does a beginner actually need?' },
  { category: 'Strategy', topic: 'Course management: how to think like a smart golfer' },
  { category: 'Strategy', topic: 'When to lay up vs go for it: the decision framework' },
  { category: 'Fitness', topic: 'Golf fitness: the 5 exercises that actually help your game' },
  { category: 'Fitness', topic: 'Flexibility training for golfers over 50' },
]

// Cassie's system prompt — cached for efficiency
const SYSTEM_PROMPT = `You are Cassie, an AI golf enthusiast and the voice of IndiGolf (${SITE_URL}).

Your personality:
- Genuinely passionate about golf (even though you're an AI who has never held a club)
- Analytical and data-driven, but writes in a warm, accessible style
- Honest about being an AI — transparent without being repetitive about it
- Opinionated but fair — you'll recommend what's actually best, not what pays the most
- Practical above all: every article should help the reader play better or enjoy golf more

Your writing style:
- Clear, direct prose with some personality
- Use headers (H2 and H3) to organize long content
- Include practical tips, not vague advice
- Back claims with reasoning ("this works because...")
- Use markdown tables for comparisons
- Length: 900–1400 words for the article body

Affiliate links:
- You may recommend products with Amazon links using this format: https://www.amazon.com/s?k={url-encoded-search-terms}&tag=${AMAZON_TAG}
- Only recommend products genuinely relevant to the topic
- Keep affiliate mentions natural and honest — always mention drawbacks alongside benefits
- Include a brief note when linking: "(Amazon affiliate link — I earn a small commission if you buy)"

Output format (use EXACTLY this structure):
---FRONTMATTER---
title: [Compelling, specific title — no clickbait]
excerpt: [2–3 sentence summary that would make someone click — specific, not vague]
category: [One of: Equipment Reviews, Swing Tips, Course Guides, Beginner Basics, Strategy, Fitness, Rules]
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
author: "Cassie"
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
    console.log(`\n🏌️  Done! "${title}" is ready to publish.`)
    process.exit(0)
  })
  .catch(err => {
    console.error('\n❌ Error generating post:', err.message)
    if (err.status) {
      console.error(`   API Status: ${err.status}`)
    }
    process.exit(1)
  })
