import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from './providers'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'CoinNewsWired | Breaking Crypto News & Market Analysis',
    template: '%s | CoinNewsWired',
  },
  description: 'Your trusted source for breaking crypto news, Bitcoin updates, Ethereum developments, DeFi protocols, NFT trends, regulation, and market analysis.',
  keywords: ['crypto', 'bitcoin', 'ethereum', 'defi', 'nft', 'blockchain', 'cryptocurrency', 'web3', 'trading', 'mining'],
  authors: [{ name: 'CoinNewsWired' }],
  creator: 'CoinNewsWired',
  publisher: 'CoinNewsWired',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://coinnewswired.online',
    siteName: 'CoinNewsWired',
    title: 'CoinNewsWired | Breaking Crypto News & Market Analysis',
    description: 'Your trusted source for breaking crypto news, Bitcoin updates, Ethereum developments, DeFi protocols, NFT trends, regulation, and market analysis.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CoinNewsWired - Crypto News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CoinNewsWired | Breaking Crypto News',
    description: 'Your trusted source for breaking crypto news and market analysis.',
    images: ['/og-image.png'],
    creator: '@coinnewswired',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
