import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticleBySlug, getRelatedArticles, getCategories } from '@/lib/data'
import { InArticleAd } from '@/components/AdSense'
import { formatDate, formatRelativeTime } from '@/lib/utils'
import React from 'react'

interface Props {
  article: ReturnType<typeof getArticleBySlug>
  relatedArticles: ReturnType<typeof getRelatedArticles>
}

export default function ArticlePage({ article, relatedArticles }: Props) {
  if (!article) {
    return <div>Article not found</div>
  }

  return (
      <>
        <Head>
          <title>{article.title}</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={article.coverImage} />
        <meta property="article:published_time" content={article.publishedAt} />
        <meta property="article:modified_time" content={article.updatedAt} />
        <meta property="article:author" content={article.author.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={article.coverImage} />
        </Head>

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Link
              href={"/category/" + article.category.slug}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
              style={{ backgroundColor: article.category.color + '1A', color: article.category.color }}
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
              <img
                src={article.author.avatar}
                alt={article.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <Link href={"/author/" + article.author.id} className="font-medium text-gray-900 hover:text-orange-500 dark:text-white dark:hover:text-orange-400">
                {article.author.name}
              </Link>
            </div>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readTime} min read</span>
          </div>
        </header>
        
        <figure className="mb-8 rounded-xl overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            width="1200"
            height="630"
            className="w-full h-auto object-cover"
          />
        </figure>
        
        <InArticleAd />
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
        
        <InArticleAd />
        
        <footer className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
          <div className="mb-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={"/tag/" + tag.toLowerCase().replace(/\s+/g, '-')}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-600 transition-colors hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-orange-500 dark:hover:bg-orange-900/30 dark:hover:text-orange-400"
              >
                #{tag}
              </Link>
            ))}
          </div>
          
          <div className="author-bio">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <Link href={"/author/" + article.author.id} className="font-semibold text-gray-900 hover:text-orange-500 dark:text-white dark:hover:text-orange-400">
                {article.author.name}
              </Link>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{article.author.bio}</p>
              <div className="mt-2 flex gap-4">
                {article.author.twitter && (
                  <a href={"https://twitter.com/" + article.author.twitter.replace('@', '')} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400">
                    @{article.author.twitter.replace('@', '')}
                  </a>
                )}
                {article.author.linkedin && (
                  <a href={"https://linkedin.com/in/" + article.author.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400">
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </footer>
        
        {relatedArticles.length > 0 ? (
          (() => {
            const relatedItems = relatedArticles.map((related) => (
              <Link key={related.id} href={"/article/" + related.slug} className="article-card" aria-label={"Read: " + related.title}>
                <div className="article-card-image">
                  <img src={related.coverImage} alt="" loading="lazy" width="400" height="225" />
                  <span className="article-card-category" style={{ background: related.category.color, color: "white" }}>
                    {related.category.icon} {related.category.name}
                  </span>
                </div>
                <div className="article-card-content">
                  <div className="article-card-meta">
                    <time dateTime={related.publishedAt}>{formatRelativeTime(related.publishedAt)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{related.readTime} min read</span>
                  </div>
                  <h3 className="article-card-title">{related.title}</h3>
                  <div className="article-card-footer">
                    <div className="article-card-author">
                      <img src={related.author.avatar} alt={related.author.name} loading="lazy" />
                      <span className="article-card-author-name">
                        <Link href={"/author/" + related.author.id} className="hover:text-orange-500 transition-colors">
                          {related.author.name}
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
            return (
              <section className="mt-12" aria-labelledby="related-heading">
                <h2 id="related-heading" className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Related Articles
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedItems}
                </div>
              </section>
            )
          })()
        ) : null}
        </article>
      </>
  )
}
