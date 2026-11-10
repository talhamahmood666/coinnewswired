import { Metadata } from 'next'
import { getArticles } from '@/lib/data'
import { ArticleCard } from '@/components/ArticleCard'
import { HeaderAd } from '@/components/AdSense'

export const metadata: Metadata = {
  title: 'Latest Crypto News',
  description: 'All the latest cryptocurrency news, market updates, and blockchain analysis in one place.',
}

export default function LatestPage() {
  const articles = getArticles({ limit: 30 })
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <HeaderAd />
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Latest News</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          All the latest cryptocurrency news and market updates
        </p>
      </header>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="default" />
        ))}
      </div>
      
      {articles.length >= 30 && (
        <div className="mt-12 text-center">
          <button className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-orange-500 dark:hover:bg-orange-900/30 dark:hover:text-orange-400">
            Load More
          </button>
        </div>
      )}
    </div>
  )
}