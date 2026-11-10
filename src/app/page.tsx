import { Metadata } from 'next'
import Link from 'next/link'
import { getFeaturedArticles, getBreakingNews, getArticles } from '@/lib/data'
import { CATEGORIES } from '@/lib/types'
import { ArticleCard } from '@/components/ArticleCard'
import { HeaderAd, SidebarAd } from '@/components/AdSense'

export const metadata: Metadata = {
  title: 'Breaking Crypto News & Market Analysis',
  description: 'Latest Bitcoin, Ethereum, DeFi, NFT, and Web3 news. Real-time market analysis and regulatory updates.',
}

export default function HomePage() {
  const featuredArticles = getFeaturedArticles()
  const breakingNews = getBreakingNews()
  const latestArticles = getArticles({ limit: 8, offset: 4 })
  const mainFeature = featuredArticles[0]
  const secondaryFeatures = featuredArticles.slice(1, 4)
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breaking News Banner */}
      {breakingNews.length > 0 && (
        <div className="mb-8 rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-900/20" role="region" aria-label="Breaking news">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex shrink-0 items-center gap-2 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              BREAKING
            </span>
            <div className="flex-1 flex gap-6 overflow-x-auto pb-2">
              {breakingNews.slice(0, 5).map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="shrink-0 font-medium text-sm text-gray-900 hover:text-orange-500 dark:text-white dark:hover:text-orange-400 whitespace-nowrap"
                >
                  {article.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Header Ad */}
      <HeaderAd />
      
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Hero Section */}
          {mainFeature && (
            <article className="relative rounded-2xl overflow-hidden">
              <ArticleCard article={mainFeature} variant="featured" />
            </article>
          )}
          
          {/* Secondary Features */}
          {secondaryFeatures.length > 0 && (
            <section aria-labelledby="latest-heading">
              <header className="mb-6 flex items-center justify-between">
                <h2 id="latest-heading" className="text-2xl font-bold text-gray-900 dark:text-white">
                  Latest Stories
                </h2>
                <Link href="/latest" className="text-sm font-medium text-orange-500 hover:text-orange-600">
                  View all →
                </Link>
              </header>
              <div className="grid gap-6 sm:grid-cols-2">
                {secondaryFeatures.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="default" />
                ))}
              </div>
            </section>
          )}
          
          {/* Category Sections */}
          {CATEGORIES.slice(0, 4).map((category) => {
            const categoryArticles = getArticles({ category: category.slug, limit: 4 })
            if (categoryArticles.length === 0) return null
            
            return (
              <section key={category.id} aria-labelledby={`cat-${category.slug}`}>
                <header className="mb-4 flex items-center justify-between">
                  <h2 id={`cat-${category.slug}`} className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                    <span className="text-2xl">{category.icon}</span>
                    {category.name}
                  </h2>
                  <Link href={`/category/${category.slug}`} className="text-sm font-medium text-orange-500 hover:text-orange-600">
                    View all →
                  </Link>
                </header>
                <div className="grid gap-4 sm:grid-cols-2">
                  {categoryArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="compact" />
                  ))}
                </div>
              </section>
            )
          })}
          
          {/* More Articles */}
          <section aria-labelledby="more-heading">
            <header className="mb-6 flex items-center justify-between">
              <h2 id="more-heading" className="text-2xl font-bold text-gray-900 dark:text-white">
                More News
              </h2>
              <Link href="/latest" className="text-sm font-medium text-orange-500 hover:text-orange-600">
                View all →
              </Link>
            </header>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} variant="default" />
              ))}
            </div>
          </section>
        </div>
        
        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Newsletter Signup */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Stay Updated</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Get the latest crypto news delivered to your inbox.
            </p>
            <form action="/api/newsletter" method="POST" className="mt-4 space-y-3">
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              />
              <button type="submit" className="w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600">
                Subscribe
              </button>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>
          
          {/* Sidebar Ad */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
            <SidebarAd />
          </div>
          
          {/* Trending */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Trending Now</h3>
            <ul className="mt-4 space-y-4" role="list">
              {getArticles({ limit: 5 }).map((article) => (
                <li key={article.id}>
                  <Link href={`/article/${article.slug}`} className="flex gap-3 group">
                    <div className="relative shrink-0 overflow-hidden rounded-lg bg-gray-200 w-20 h-20 dark:bg-gray-700">
                      <img
                        src={article.coverImage}
                        alt=""
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-orange-500 dark:text-white dark:group-hover:text-orange-400 line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{article.category.icon} {article.category.name}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Categories</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-orange-900/30 dark:hover:text-orange-400"
                >
                  <span style={{ color: category.color }}>{category.icon}</span>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
