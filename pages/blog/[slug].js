import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import SEO from '../../components/SEO'
import { getAllPosts, getPostBySlug, getAllPostSlugs } from '../../lib/posts'
import styles from '../../styles/Post.module.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ki.indigolf.de'

export default function PostPage({ post, relatedPosts }) {
  const formattedDate = post.date
    ? format(typeof post.date === 'string' ? parseISO(post.date) : new Date(post.date), 'MMMM d, yyyy')
    : ''

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author || 'Aria',
    },
    datePublished: post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'IndiGolf',
      url: SITE_URL,
    },
    keywords: post.tags?.join(', '),
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        url={`/blog/${post.slug}`}
        type="article"
        publishedAt={post.date}
        author={post.author}
        tags={post.tags}
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <Link href="/blog" className={styles.backLink}>
            ← Zurück zum Blog
          </Link>
          {post.category && (
            <span className={styles.category}>{post.category}</span>
          )}
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <div className={styles.author}>
              <span className={styles.authorAvatar}>🏌️‍♀️</span>
              <span className={styles.authorName}>{post.author || 'Aria'}</span>
            </div>
            {formattedDate && (
              <time className={styles.date} dateTime={post.date}>
                {formattedDate}
              </time>
            )}
            {post.readTime && (
              <span className={styles.readTime}>⏱ {post.readTime}</span>
            )}
          </div>
        </div>
      </section>

      {/* Article */}
      <div className={`container ${styles.layout}`}>
        <article className={styles.article}>
          {post.excerpt && (
            <p className={styles.lead}>{post.excerpt}</p>
          )}
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className={styles.tags}>
              <strong>Themen:</strong>
              {post.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}

          {/* Author Disclosure */}
          <div className={styles.disclosure}>
            <span className={styles.disclosureIcon}>🏌️‍♀️</span>
            <div>
              <strong>Verfasst von Aria</strong>
              <p>Aria ist IndiGolfs Golf-Lifestyle-Guide – UX Designerin, Handicap 18, Berlin. Immer auf der Suche nach dem nächsten großartigen Platz. Dieser Beitrag kann Affiliate-Links enthalten – wir verdienen eine kleine Provision, wenn du darüber kaufst, ohne Mehrkosten für dich.</p>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {/* Shop CTA */}
          <div className={styles.widget}>
            <h3 className={styles.widgetTitle}>🛒 Bei Amazon shoppen</h3>
            <p className={styles.widgetText}>Die besten Golf-Produkte, von Aria kuratiert</p>
            <a
              href={`https://www.amazon.de/s?k=${encodeURIComponent(post.category || 'golf ausruestung')}&tag=indigolf-20`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className={`btn btn-primary ${styles.widgetBtn}`}
            >
              {post.category || 'Golf'}-Ausrüstung ansehen →
            </a>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>📖 Ähnliche Beiträge</h3>
              <ul className={styles.relatedList}>
                {relatedPosts.map(related => (
                  <li key={related.slug} className={styles.relatedItem}>
                    <Link href={`/blog/${related.slug}`} className={styles.relatedLink}>
                      {related.title}
                    </Link>
                    {related.category && (
                      <span className={styles.relatedCat}>{related.category}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* About Aria */}
          <div className={`${styles.widget} ${styles.cassieWidget}`}>
            <div className={styles.cassieAvatar}>🏌️‍♀️</div>
            <h3>Über Aria</h3>
            <p>UX Designerin, Handicap 18, Berlin. Golf-Enthusiastin, Vielflieger-Golferin und deine IndiGolf Lifestyle-Begleiterin.</p>
            <Link href="/about" className={styles.cassieLink}>Aria kennenlernen →</Link>
          </div>
        </aside>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const slugs = getAllPostSlugs()
  const paths = slugs.map(slug => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return { notFound: true }
  }

  // Get related posts (same category, different slug)
  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)

  return {
    props: {
      post,
      relatedPosts,
    },
  }
}
