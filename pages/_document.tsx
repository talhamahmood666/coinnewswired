import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const gaId = process.env.NEXT_PUBLIC_GA_ID
    const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          {gaId && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gaId}', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
              />
            </>
          )}
          {adsenseClientId && (
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
              crossOrigin="anonymous"
            />
          )}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'NewsMediaOrganization',
                name: 'CoinNewsWired',
                url: 'https://coinnewswired.online',
                logo: 'https://coinnewswired.online/logo.png',
                sameAs: [
                  'https://twitter.com/coinnewswired',
                  'https://linkedin.com/company/coinnewswired',
                  'https://youtube.com/@coinnewswired',
                ],
                description: 'Leading source for crypto news, Bitcoin price analysis, Ethereum updates, DeFi, NFTs, regulation and blockchain technology.',
                publisher: {
                  '@type': 'Organization',
                  name: 'CoinNewsWired',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://coinnewswired.online/logo.png',
                  },
                },
                potentialAction: {
                  '@type': 'SearchAction',
                  target: {
                    '@type': 'EntryPoint',
                    urlTemplate: 'https://coinnewswired.online/search?q={search_term_string}',
                  },
                  'query-input': 'required name=search_term_string',
                },
              }),
            }}
          />
        </Head>
        <body className="min-h-full flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument