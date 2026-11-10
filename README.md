# CoinNewsWired

A modern, performant crypto news website built with Next.js 15, TypeScript, and Tailwind CSS. Features Google Analytics 4, Google AdSense integration, and optimized for Vercel deployment.

## Features

- **Modern Stack**: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4
- **Crypto News Focus**: Categories for Bitcoin, Ethereum, DeFi, NFTs, Regulation, Trading, Web3, Mining
- **Responsive Design**: Mobile-first, dark mode support, accessible
- **Analytics**: Google Analytics 4 (GA4) with custom events
- **Monetization**: Google AdSense integration (header, sidebar, in-article, footer)
- **SEO Optimized**: Sitemap, robots.txt, RSS feed, Open Graph, Twitter Cards
- **Performance**: Static generation, optimized images, code splitting
- **Deployment**: Vercel-ready with GitHub Actions CI/CD

## Getting Started

### Prerequisites

- Node.js 22+
- npm 10+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/coinnewswired.git
cd coinnewswired

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your environment variables in .env.local
# (See Environment Variables section below)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID (G-XXXXXXXXXX) | Yes |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Google AdSense Client ID (ca-pub-XXXXXXXXXXXXXXXX) | Yes |
| `NEXT_PUBLIC_ADSENSE_HEADER_SLOT` | Header ad slot ID | No |
| `NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT` | Sidebar ad slot ID | No |
| `NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT` | In-article ad slot ID | No |
| `NEXT_PUBLIC_ADSENSE_FOOTER_SLOT` | Footer ad slot ID | No |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification code | No |

Copy `.env.example` to `.env.local` and fill in your values.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── newsletter/    # Newsletter signup endpoint
│   │   └── rss/           # RSS feed generator
│   ├── article/[slug]/    # Dynamic article pages
│   ├── category/[slug]/   # Category pages
│   ├── latest/            # Latest news page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage
│   ├── providers.tsx      # Theme provider
│   ├── robots.ts          # robots.txt generator
│   └── sitemap.ts         # Sitemap generator
├── components/            # React components
│   ├── AdSense.tsx        # AdSense ad components
│   ├── ArticleCard.tsx    # Article card variants
│   ├── Footer.tsx         # Site footer
│   ├── Header.tsx         # Site header with navigation
│   └── NewsletterSignup.tsx # Newsletter form
└── lib/                   # Utilities and data
    ├── analytics.ts       # GA4 helpers
    ├── adsense.ts         # AdSense helpers
    ├── data.ts            # Mock article data
    ├── types.ts           # TypeScript types
    └── utils.ts           # Helper functions
```

## Adding Real Content

Currently uses mock data in `src/lib/data.ts`. To connect a real CMS:

1. Replace `getArticles()` and related functions with API calls
2. Add a CMS integration (Contentful, Sanity, Strapi, etc.)
3. Update `generateStaticParams` for static generation
4. Add image optimization for article covers

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### GitHub Actions CI/CD

The repository includes a workflow for:
- Type checking
- Linting
- Building
- Deploying to Vercel on push to main

Required secrets in GitHub:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Customization

### Colors

Edit CSS variables in `src/app/globals.css`:
```css
:root {
  --primary: #ea580c;  /* Orange accent */
  /* ... */
}
```

### Categories

Modify `CATEGORIES` array in `src/lib/types.ts`.

### Fonts

Change font imports in `src/app/layout.tsx`.

## Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint
npm run type-check # TypeScript check
npm run format     # Prettier format
npm run preview    # Build and preview locally
```

## License

MIT License - feel free to use for your own projects.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request
