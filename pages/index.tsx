import Head from 'next/head'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { getFeaturedArticles, getBreakingNews, getArticles, getCategories } from '@/lib/data'
import { CATEGORIES } from '@/lib/types'
import { HeaderAd, InArticleAd, SidebarAd, FooterAd } from '@/components/AdSense'
import { formatRelativeTime } from '@/lib/utils'
import { ArticleCard } from '@/components/ArticleCard'

interface Props {
  featuredArticles: ReturnType<typeof getFeaturedArticles>
  breakingNews: ReturnType<typeof getBreakingNews>
  latestArticles: ReturnType<typeof getArticles>
  marketArticles: ReturnType<typeof getArticles>
  magazineArticles: ReturnType<typeof getArticles>
  categories: ReturnType<typeof getCategories>
}

export default function HomePage({ 
  featuredArticles, 
  breakingNews, 
  latestArticles, 
  marketArticles, 
  magazineArticles, 
  categories 
}: Props) {
  const mainFeature = featuredArticles[0]
  const secondaryFeatures = featuredArticles.slice(1, 4)

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Head>
        <title>CoinNewsWired | Breaking Crypto News & Market Analysis</title>
        <meta name="description" content="Leading source for crypto news, Bitcoin price analysis, Ethereum updates, DeFi, NFTs, regulation and blockchain technology." />
        <meta property="og:title" content="CoinNewsWired | Breaking Crypto News & Market Analysis" />
        <meta property="og:description" content="Leading source for crypto news, Bitcoin price analysis, Ethereum updates, DeFi, NFTs, regulation and blockchain technology." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CoinNewsWired | Breaking Crypto News" />
        <meta name="twitter:description" content="Leading source for crypto news, Bitcoin price analysis, Ethereum updates, DeFi, NFTs, regulation and blockchain technology." />
      </Head>

      {breakingNews.length > 0 && (
        <div className="breaking-banner mb-6" role="region" aria-label="Breaking news">
          <div className="flex flex-wrap items-center gap-4">
            <span className="breaking-label" aria-hidden="true">Breaking</span>
            <div className="flex-1 flex gap-6 overflow-x-auto pb-2">
              {breakingNews.slice(0, 5).map((article) => (
                <Link
                  key={article.id}
                  href={"/article/" + article.slug}
                  className="shrink-0 font-medium text-sm text-gray-900 hover:text-orange-500 dark:text-white dark:hover:text-orange-400 whitespace-nowrap"
                >
                  {article.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <HeaderAd />

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-10">
          {mainFeature && (
            <article className="article-card article-card-featured" aria-labelledby={"article-" + mainFeature.id + "-title"}>
              <div className="article-card-image">
                <img src={mainFeature.coverImage} alt="" loading="eager" width="640" height="360" />
                {mainFeature.breaking && (
                  <span className="article-card-badge" style={{ background: '#f59e0b', color: 'white' }}>Breaking</span>
                )}
                <span className="article-card-category" style={{ background: mainFeature.category.color, color: 'white' }}>
                  {mainFeature.category.icon} {mainFeature.category.name}
                </span>
              </div>
              <div className="article-card-content">
                <div className="article-card-meta">
                  <time dateTime={mainFeature.publishedAt}>{formatRelativeTime(mainFeature.publishedAt)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{mainFeature.readTime} min read</span>
                </div>
                <h3 id={"article-" + mainFeature.id + "-title"} className="article-card-title" style={{ fontSize: '28px', lineHeight: '1.25', WebkitLineClamp: 3 }}>
                  <Link href={"/article/" + mainFeature.slug} className="hover:text-orange-500 transition-colors">
                    {mainFeature.title}
                  </Link>
                </h3>
                <p className="article-card-excerpt" style={{ fontSize: '16px', WebkitLineClamp: 3 }}>{mainFeature.excerpt}</p>
                <div className="article-card-footer">
                  <div className="article-card-author">
                    <img src={mainFeature.author.avatar} alt={mainFeature.author.name} loading="lazy" />
                    <span className="article-card-author-name">
                      <Link href={"/author/" + mainFeature.author.id} className="hover:text-orange-500 transition-colors">
                        {mainFeature.author.name}
                      </Link>
                    </span>
                  </div>
                  <div className="article-card-tags">
                    {mainFeature.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="article-tag" style={{ background: 'transparent', border: 'none', padding: 0, color: 'var(--muted-foreground)' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          )}

          {secondaryFeatures.length > 0 && (
            <div className="article-grid article-grid-2">
              {secondaryFeatures.map((article) => (
                <article key={article.id} className="article-card" aria-labelledby={"article-" + article.id + "-title"}>
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
          )}

          <InArticleAd />

          <section aria-labelledby="top-news-heading" className="space-y-6">
            <header className="section-header">
              <h2 id="top-news-heading" className="section-header-title">Top crypto news today</h2>
              <Link href="/category/news" className="section-header-link">View all</Link>
            </header>
            <div className="space-y-4">
              {featuredArticles.slice(1, 5).map((article, index) => (
                <article key={article.id} className="article-card article-card-compact" aria-labelledby={"top-article-" + article.id + "-title"}>
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
                    <h3 id={"top-article-" + article.id + "-title"} className="article-card-title" style={{ fontSize: '16px' }}>
                      <Link href={"/article/" + article.slug} className="hover:text-orange-500 transition-colors">
                        {article.title}
                      </Link>
                    </h3>
                    <p className="article-card-excerpt" style={{ display: index < 2 ? 'block' : 'none' }}>{article.excerpt}</p>
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
          </section>

          {marketArticles.length > 0 && (
            <section aria-labelledby="markets-heading" className="space-y-6">
              <header className="section-header">
                <h2 id="markets-heading" className="section-header-title">Markets</h2>
                <Link href="/category/markets" className="section-header-link">View all</Link>
              </header>
              <div className="article-grid article-grid-3">
                {marketArticles.map((article) => (
                  <article key={article.id} className="article-card" aria-labelledby={"market-" + article.id + "-title"}>
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
                      <h3 id={"market-" + article.id + "-title"} className="article-card-title">
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
            </section>
          )}

          {magazineArticles.length > 0 && (
            <section aria-labelledby="magazine-heading" className="space-y-6">
              <header className="section-header">
                <h2 id="magazine-heading" className="section-header-title">Magazine</h2>
                <Link href="/category/magazine" className="section-header-link">View all</Link>
              </header>
              <div className="article-grid article-grid-2">
                {magazineArticles.map((article) => (
                  <article key={article.id} className="article-card" aria-labelledby={"mag-" + article.id + "-title"}>
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
                      <h3 id={"mag-" + article.id + "-title"} className="article-card-title">
                        <Link href={"/article/" + article.slug} className="hover:text-orange-500 transition-colors">
                          {article.title}
                        </Link>
                      </h3>
                      <p className="article-card-excerpt">{article.excerpt}</p>
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
            </section>
          )}

          <section aria-labelledby="categories-heading" className="space-y-6">
            <header className="section-header">
              <h2 id="categories-heading" className="section-header-title">Browse by category</h2>
            </header>
            <nav className="category-pills" aria-label="Category navigation">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={"/category/" + category.slug}
                  className="category-pill"
                  style={{ borderColor: category.color, color: category.color }}
                >
                  <span style={{ color: category.color }}>{category.icon}</span>
                  {category.name}
                </Link>
              ))}
            </nav>
          </section>

          <FooterAd />
        </div>

        <aside className="lg:col-span-4 space-y-6" aria-label="Sidebar">
          <div className="newsletter-widget sidebar-widget" style={{ padding: '28px' }}>
            <h3 className="newsletter-widget-title">Daily crypto news in your inbox</h3>
            <p className="newsletter-widget-text">Join 100,000+ readers getting the latest Bitcoin, Ethereum and crypto market analysis every morning.</p>
            <form action="/api/newsletter" method="POST" className="newsletter-widget-form">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="newsletter-widget-input"
                aria-label="Email address"
              />
              <button type="submit" className="newsletter-widget-button">Subscribe</button>
            </form>
            <p className="newsletter-widget-disclaimer">No spam. Unsubscribe anytime. By subscribing you agree to our <a href="/privacy" className="underline hover:opacity-70">Privacy Policy</a>.</p>
          </div>

          <div className="sidebar-widget" style={{ padding: '16px', textAlign: 'center' }}>
            <SidebarAd />
          </div>

          <div className="sidebar-widget">
            <h3 className="sidebar-widget-title">Trending Now</h3>
            <ul className="trending-list" role="list">
              {getArticles({ limit: 5 }).map((article) => (
                <li key={article.id} className="trending-item">
                  <Link href={"/article/" + article.slug} className="trending-item-image" aria-label={"Read: " + article.title}>
                    <img src={article.coverImage} alt="" loading="lazy" width="140" height="140" />
                  </Link>
                  <div className="trending-item-content">
                    <Link href={"/article/" + article.slug} className="trending-item-title" aria-label={"Read: " + article.title}>
                      {article.title}
                    </Link>
                    <span className="trending-item-category" style={{ color: article.category.color }}>
                      {article.category.icon} {article.category.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-widget">
            <h3 className="sidebar-widget-title">Most Read (24h)</h3>
            <ul className="trending-list" role="list">
              {getArticles({ limit: 5 }).map((article, index) => (
                <li key={article.id} className="trending-item">
                  <div className="flex items-center gap-3 min-w-[40px]">
                    <span className="text-2xl font-bold text-orange-500">{index + 1}</span>
                  </div>
                  <div className="trending-item-content">
                    <Link href={"/article/" + article.slug} className="trending-item-title" aria-label={"Read: " + article.title}>
                      {article.title}
                    </Link>
                    <span className="trending-item-category" style={{ color: article.category.color }}>
                      {article.category.icon} {article.category.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-widget">
            <h3 className="sidebar-widget-title">Featured Authors</h3>
            <ul className="space-y-4" role="list">
              {[
                { name: 'Sarah Chen', avatar: '/authors/sarah-chen.jpg', bio: 'Senior crypto journalist covering DeFi and institutional adoption.', articles: 47 },
                { name: 'Marcus Rodriguez', avatar: '/authors/marcus-rodriguez.jpg', bio: 'Blockchain developer turned reporter. Ethereum scaling expert.', articles: 32 },
                { name: 'Priya Sharma', avatar: '/authors/priya-sharma.jpg', bio: 'Regulatory affairs correspondent tracking global crypto policy.', articles: 28 },
                { name: 'James Okonkwo', avatar: '/authors/james-okonkwo.jpg', bio: 'Market analyst and technical trader covering price action.', articles: 51 },
              ].map((author) => (
                <li key={author.name} className="flex gap-3">
                  <img src={author.avatar} alt={author.name} className="w-12 h-12 rounded-full object-cover" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <Link href={"/author/" + author.name.toLowerCase().replace(' ', '-')} className="font-semibold text-gray-900 dark:text-white hover:text-orange-500 transition-colors">
                      {author.name}
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{author.bio}</p>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{author.articles} articles</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-widget">
            <h3 className="sidebar-widget-title">Newsletters</h3>
            <ul className="space-y-3" role="list">
              {[
                { name: 'The Daily Bit', desc: 'Morning crypto briefing', freq: 'Daily' },
                { name: 'Market Movers', desc: 'Price analysis & trends', freq: 'Weekly' },
                { name: 'DeFi Digest', desc: 'Protocol updates & yields', freq: 'Weekly' },
                { name: 'NFT Now', desc: 'Collectibles & culture', freq: 'Bi-weekly' },
              ].map((nl) => (
                <li key={nl.name}>
                  <Link href="/newsletters" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{nl.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{nl.desc}</p>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{nl.freq}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-center">
              <Link href="/newsletters" className="text-sm font-medium text-orange-500 hover:text-orange-600">View all newsletters →</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const featuredArticles = getFeaturedArticles()
  const breakingNews = getBreakingNews()
  const latestArticles = getArticles({ limit: 12, offset: 4 })
  const marketArticles = getArticles({ category: 'trading', limit: 6 })
  const magazineArticles = getArticles({ category: 'magazine', limit: 4 })
  const categories = getCategories()

  return {
    props: {
      featuredArticles,
      breakingNews,
      latestArticles,
      marketArticles,
      magazineArticles,
      categories,
    },
    revalidate: 60,
  }
}