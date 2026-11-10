import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getArticleBySlug, getRelatedArticles, getCategories } from '@/lib/data'
import { InArticleAd } from '@/components/AdSense'
import { formatDate } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  
  if (!article) {
    return { title: 'Article Not Found' }
  }
  
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      images: [{ url: article.coverImage, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
  }
}

export async function generateStaticParams() {
  const articles = getCategories().flatMap(c => c) // placeholder
  // We'll use dynamic rendering instead
  return []
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  
  if (!article) {
    notFound()
  }
  
  const relatedArticles = getRelatedArticles(slug)
  
  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Link
            href={`/category/${article.category.slug}`}
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium',
              `bg-${article.category.color}/10 text-${article.category.color} dark:bg-${article.category.color}/20`
            )}
          >
            {article.category.icon} {article.category.name}
          </Link>
          {article.breaking && (
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              BREAKING
            </span>
          )}
        </div>
        
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <Link href={`/author/${article.author.id}`} className="font-medium text-gray-900 hover:text-orange-500 dark:text-white dark:hover:text-orange-400">
              {article.author.name}
            </Link>
          </div>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readTime} min read</span>
        </div>
      </header>
      
      <figure className="mb-8 rounded-xl overflow-hidden">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover"
        />
      </figure>
      
      <InArticleAd />
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
      
      <InArticleAd />
      
      {/* Tags */}
      <footer className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
        <div className="mb-6 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-600 transition-colors hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-orange-500 dark:hover:bg-orange-900/30 dark:hover:text-orange-400"
            >
              #{tag}
            </Link>
          ))}
        </div>
        
        {/* Author Bio */}
        <div className="flex gap-4">
          <Link href={`/author/${article.author.id}`}>
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={64}
              height={64}
              className="rounded-full"
            />
          </Link>
          <div className="flex-1">
            <Link href={`/author/${article.author.id}`} className="font-semibold text-gray-900 hover:text-orange-500 dark:text-white dark:hover:text-orange-400">
              {article.author.name}
            </Link>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{article.author.bio}</p>
            <div className="mt-2 flex gap-4">
              {article.author.twitter && (
                <a href={`https://twitter.com/${article.author.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400">
                  @{article.author.twitter.replace('@', '')}
                </a>
              )}
              {article.author.linkedin && (
                <a href={`https://linkedin.com/in/${article.author.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400">
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </footer>
      
      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="mt-12" aria-labelledby="related-heading">
          <h2 id="related-heading" className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Related Articles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((related) => (
              <ArticleCard key={related.id} article={related} variant="default" />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

import { cn } from '@/lib/utils'
import { ArticleCard } from '@/components/ArticleCard'