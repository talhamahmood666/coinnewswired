import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticles, getCategoryBySlug } from '@/lib/data'
import { CATEGORIES } from '@/lib/types'
import { ArticleCard } from '@/components/ArticleCard'
import { HeaderAd, InArticleAd } from '@/components/AdSense'
import { formatDate } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  
  if (!category) {
    return { title: 'Category Not Found' }
  }
  
  return {
    title: `${category.name} News`,
    description: `Latest ${category.name} news, updates, and analysis from CoinNewsWired.`,
    openGraph: {
      title: `${category.name} News | CoinNewsWired`,
      description: `Latest ${category.name} news, updates, and analysis.`,
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  
  if (!category) {
    notFound()
  }
  
  const articles = getArticles({ category: slug, limit: 20 })
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <HeaderAd />
      
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{category.name}</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">{category.description}</p>
          </div>
        </div>
        
        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Category navigation">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className={cn(
                'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                cat.slug === slug
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-orange-50 hover:text-orange-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-orange-900/30 dark:hover:text-orange-400'
              )}
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </nav>
      </header>
      
      {articles.length === 0 ? (
        <div className="text-center py-16">
          <svg className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">No articles yet</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Check back soon for the latest {category.name.toLowerCase()} news.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} variant="default" />
            ))}
          </div>
          
          <InArticleAd />
          
          {articles.length > 6 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.slice(6).map((article) => (
                <ArticleCard key={article.id} article={article} variant="compact" />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

import { cn } from '@/lib/utils'
import Link from 'next/link'