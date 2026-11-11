import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter, Roboto_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PriceTicker } from '@/components/PriceTicker'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const interMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-inter-mono' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <html lang="en" className={`${inter.variable} ${interMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <Providers>
          <Header />
          <PriceTicker />
          <main className="flex-1"><Component {...pageProps} /></main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}