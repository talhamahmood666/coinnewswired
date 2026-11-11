import type { NextApiRequest, NextApiResponse } from 'next'

const SITE_URL = 'https://coinnewswired.online'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const robots = `# CoinNewsWired Robots.txt
User-agent: *
Allow: /

# Disallow private/admin paths
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /*.json$
Disallow: /*?*
Disallow: /admin/
Disallow: /private/

# Sitemap
Sitemap: ${SITE_URL}/api/sitemap.xml

# Host
Host: ${SITE_URL}`

  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400')
  res.status(200).send(robots)
}
