import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticles, getCategoryBySlug, getCategories } from '@/lib/data'
import { CATEGORIES } from '@/lib/types'
import { HeaderAd, InArticleAd } from '@/components/AdSense'
import { formatDate, formatRelativeTime } from '@/lib/utils'

interface Props {
  category: ReturnType<typeof getCategoryBySlug>
  articles: ReturnType<typeof getArticles>
  categories: ReturnType<typeof getCategories>
}

export default function CategoryPage({ category, articles, categories }: Props) {
  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <>
      <Head>
        <title>{category.name} News | CoinNewsWired</title>
        <meta name="description" content={`Latest ${category.name} news, updates, and analysis from CoinNewsWired.`} />
        <meta property="og:title" content={`${category.name} News | CoinNewsWired`} />
        <meta property="og:description" content={`Latest ${category.name} news, updates, and analysis.`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${category.name} News | CoinNewsWired`} />
        <meta name="twitter:description" content={`Latest ${category.name} news, updates, and analysis.`} />
      </Head>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <HeaderAd />
        
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <span style={{ fontSize: '2.5rem', lineHeight: '1' }}>{category.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{category.name}</h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">{category.description}</p>
            </div>
          </div>
          
          <nav className="mt-6 flex flex-wrap gap-2" aria-label="Category navigation">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={"/category/" + cat.slug}
                className={cat.slug === category.slug
                  ? 'bg-orange-500 text-white rounded-full px-3 py-1.5 text-sm font-medium transition-colors'
                  : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-orange-900/30 dark:hover:text-orange-400 rounded-full px-3 py-1.5 text-sm font-medium transition-colors'}
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
            <div className="article-grid article-grid-3">
              {articles.slice(0, 9).map((article) => (
                <article key={article.id} className="article-card" aria-labelledby={"article-" + article.id + "-title"}>
                  <Link href={"/article/" + article.slug} className="article-card-image" aria-label={"Read: " + article.title}>
                    <img src={article.coverImage} alt="" loading="lazy" width="400" height="225" />
                    <span className="article-card-category" style={{ background: article.category.color, color: 'white' }}>
                      <span style={{ fontSize: '10px', lineHeight: '1', marginRight: '4px', display: 'inline-flex', alignItems: 'center' }}>{article.category.icon}</span>{article.category.name}
                    </span>
                  </Link>
                  <div className="article-card-content">
                    <div className="article-card-meta">
                      <time dateTime={article.publishedAt}>{formatRelativeTime(article.publishedAt)}</time>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime} min read</span>
                    </div>
                    <h3 id={"article-" + article.id + "-title"} className="article-card-title">
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
            
            <InArticleAd />
            
            {articles.length > 9 && (
              <div className="mt-8 article-grid article-grid-3">
                {articles.slice(9).map((article) => (
                  <article key={article.id} className="article-card article-card-compact" aria-labelledby={"article-" + article.id + "-title"}>
                    <Link href={"/article/" + article.slug} className="article-card-image" aria-label={"Read: " + article.title}>
                      <img src={article.coverImage} alt="" loading="lazy" width="200" height="112" />
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
                      <h3 id={"article-" + article.id + "-title"} className="article-card-title" style={{ fontSize: '15px' }}>
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
            )}
          </>
        )}
      </div>
    </>
  )
}



export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: CATEGORIES.map((cat) => ({ params: { slug: cat.slug } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const category = getCategoryBySlug(slug)
  
  if (!category) {
    return { notFound: true }
  }
  
  const articles = getArticles({ category: slug, limit: 50 })
  const categories = getCategories()
  
  return {
    props: {
      category,
      articles,
      categories,
    },
    revalidate: 60,
  }
}