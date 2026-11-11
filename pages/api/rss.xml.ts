import type { NextApiRequest, NextApiResponse } from 'next'
import { getArticles } from '@/lib/data'

const SITE_URL = 'https://coinnewswired.online'
const SITE_TITLE = 'CoinNewsWired'
const SITE_DESCRIPTION = 'Leading source for crypto news, Bitcoin price analysis, Ethereum updates, DeFi, NFTs, regulation and blockchain technology'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const articles = getArticles()
  const recentArticles = articles.slice(0, 50)

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/api/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/logo.png</url>
      <title>${SITE_TITLE}</title>
      <link>${SITE_URL}</link>
    </image>
    <category>Technology</category>
    <category>Finance</category>
    <category>Cryptocurrency</category>
    <ttl>60</ttl>
${recentArticles.map((article) => {
  const articleUrl = `${SITE_URL}/article/${article.slug}`
  const pubDate = new Date(article.publishedAt).toUTCString()
  return `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description><![CDATA[${article.excerpt}]]></description>
      <content:encoded><![CDATA[${article.excerpt}]]></content:encoded>
      <dc:creator>${article.author.name}</dc:creator>
      <pubDate>${pubDate}</pubDate>
      <category>${article.category.name}</category>
      ${article.coverImage ? `<media:content url="${article.coverImage}" medium="image" />` : ''}
    </item>`
}).join('\n')}
  </channel>
</rss>`

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.status(200).send(rss)
}
