import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import styles from './BlogCard.module.css'

const CATEGORY_COLORS = {
  'Equipment': '#2d6a4f',
  'Swing Tips': '#1b4332',
  'Course Guides': '#40916c',
  'Beginner Basics': '#52b788',
  'Strategy': '#1b4332',
  'Fitness': '#2d6a4f',
  'Rules': '#40916c',
}

export default function BlogCard({ post, featured = false }) {
  const { title, excerpt, date, category, slug, readTime, author = 'Cassie' } = post

  const formattedDate = date
    ? format(typeof date === 'string' ? parseISO(date) : new Date(date), 'MMMM d, yyyy')
    : ''

  const categoryColor = CATEGORY_COLORS[category] || '#2d6a4f'

  return (
    <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <div className={styles.body}>
        <div className={styles.meta}>
          {category && (
            <span
              className={styles.category}
              style={{ '--cat-color': categoryColor }}
            >
              {category}
            </span>
          )}
          {readTime && (
            <span className={styles.readTime}>⏱ {readTime}</span>
          )}
        </div>

        <h2 className={styles.title}>
          <Link href={`/blog/${slug}`} className={styles.titleLink}>
            {title}
          </Link>
        </h2>

        {excerpt && (
          <p className={styles.excerpt}>{excerpt}</p>
        )}

        <div className={styles.footer}>
          <div className={styles.author}>
            <span className={styles.authorAvatar}>🤖</span>
            <span className={styles.authorName}>{author}</span>
          </div>
          {formattedDate && (
            <time className={styles.date} dateTime={date}>
              {formattedDate}
            </time>
          )}
        </div>
      </div>

      <Link href={`/blog/${slug}`} className={styles.readMore} aria-label={`Read ${title}`}>
        Read more →
      </Link>
    </article>
  )
}
