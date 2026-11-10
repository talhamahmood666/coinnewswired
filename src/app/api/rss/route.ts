import { getArticles } from '@/lib/data'
import { SITE_CONFIG } from '@/lib/types'

export async function GET() {
  const articles = getArticles({ limit: 50 })
  const baseUrl = SITE_CONFIG.url
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${SITE_CONFIG.name}</title>
    <link>${baseUrl}</link>
    <description>${SITE_CONFIG.description}</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/og-image.png</url>
      <title>${SITE_CONFIG.name}</title>
      <link>${baseUrl}</link>
    </image>
    ${articles.map((article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/article/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/article/${article.slug}</guid>
      <description><![CDATA[${article.excerpt}]]></description>
      <content:encoded><![CDATA[${article.content}]]></content:encoded>
      <dc:creator>${article.author.name}</dc:creator>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <category>${article.category.name}</category>
      ${article.tags.map(tag => `<category>${tag}</category>`).join('')}
    </item>
    `).join('')}
  </channel>
</rss>`
  
  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}