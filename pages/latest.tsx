import Head from 'next/head'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { getArticles } from '@/lib/data'
import { HeaderAd } from '@/components/AdSense'
import { formatRelativeTime } from '@/lib/utils'

interface Props {
  articles: ReturnType<typeof getArticles>
}

export default function LatestPage({ articles }: Props) {
  return (
    <>
      <Head>
        <title>Latest Crypto News | CoinNewsWired</title>
        <meta name="description" content="All the latest cryptocurrency news, market updates, and blockchain analysis in one place." />
        <meta property="og:title" content="Latest Crypto News | CoinNewsWired" />
        <meta property="og:description" content="All the latest cryptocurrency news, market updates, and blockchain analysis in one place." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Latest Crypto News | CoinNewsWired" />
        <meta name="twitter:description" content="All the latest cryptocurrency news, market updates, and blockchain analysis in one place." />
      </Head>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <HeaderAd />
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Latest News</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            All the latest cryptocurrency news and market updates
          </p>
        </header>
        
        <div className="article-grid article-grid-3">
          {articles.map((article) => (
            <article key={article.id} className="article-card" aria-labelledby={"latest-" + article.id + "-title"}>
              <Link href={"/article/" + article.slug} className="article-card-image" aria-label={"Read: " + article.title}>
                <img src={article.coverImage} alt="" loading="lazy" width="400" height="225" />
                <span className="article-card-category" style={{ background: article.category.color, color: 'white' }}>
                  {article.category.icon} {article.category.name}
                </span>
              </Link>
              <div className="article-card-content">
                <div className="article-card-meta">
                  <time dateTime={article.publishedAt}>{formatRelativeTime(article.publishedAt)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime} min read</span>
                </div>
                <h3 id={"latest-" + article.id + "-title"} className="article-card-title">
                  <Link href={"/article/" + article.slug} className="hover:text-orange-500 transition-colors">
                    {article.title}
                  </Link>
                </h3>
                <div className="article-card-footer">
                  <div className="article-card-author">
                    <img src={article.author.avatar} alt={article.author.name} loading="lazy" />
                    <span className="article-card-author-name">
                      <Link href={"/author/" + article.author.id} className="hover:text-orange-500 transition-colors">
                        {article.author.name}
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </article>
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
    </>
  )
}



export const getStaticProps: GetStaticProps = async () => {
  const articles = getArticles({ limit: 30 })
  
  return {
    props: {
      articles,
    },
    revalidate: 60,
  }
}