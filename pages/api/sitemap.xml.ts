import type { NextApiRequest, NextApiResponse } from 'next'
import { getArticles, getCategories, getAllArticleSlugs } from '@/lib/data'

const SITE_URL = 'https://coinnewswired.online'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const articles = getArticles()
  const categories = getCategories()
  const allSlugs = getAllArticleSlugs()

  const staticPages = [
    '',
    '/latest',
  ]

  const categoryPages = categories.map((cat) => `/category/${cat.slug}`)
  const articlePages = allSlugs.map((slug) => `/article/${slug}`)

  const allUrls = [...staticPages, ...categoryPages, ...articlePages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allUrls.map((url) => {
  const fullUrl = `${SITE_URL}${url}`
  const isArticle = url.startsWith('/article/')
  const article = isArticle ? articles.find((a) => a.slug === url.replace('/article/', '')) : null
  
  let lastmod = new Date().toISOString().split('T')[0]
  if (article) {
    lastmod = new Date(article.updatedAt).toISOString().split('T')[0]
  }
  
  return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${isArticle ? 'weekly' : 'daily'}</changefreq>
    <priority>${isArticle ? '0.8' : url === '' ? '1.0' : '0.9'}</priority>
  </url>`
}).join('\n')}
</urlset>`

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.status(200).send(sitemap)
}
