import Head from 'next/head'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ki.indigolf.de'
const SITE_NAME = 'IndiGolf'
const DEFAULT_DESCRIPTION = 'Golf as a lifestyle — tips, gear reviews, travel & course guides from Aria, your IndiGolf guide. Discover the best equipment and enjoy the game.'
const DEFAULT_IMAGE = `${SITE_URL}/images/og-default.jpg`

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  publishedAt,
  author = 'Aria',
  tags = [],
  noIndex = false,
}) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Golf Tips, Gear & Guides`
  const pageUrl = url ? `${SITE_URL}${url}` : SITE_URL
  const pageImage = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={pageUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={pageImage} />

      {/* Article-specific */}
      {type === 'article' && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Sitemap */}
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    </Head>
  )
}
