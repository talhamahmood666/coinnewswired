export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
export const ADSENSE_SLOTS = {
  header: process.env.NEXT_PUBLIC_ADSENSE_HEADER_SLOT,
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT,
  inArticle: process.env.NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT,
  footer: process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT,
}

export const loadAdSense = () => {
  if (typeof window !== 'undefined' && ADSENSE_CLIENT_ID && !document.querySelector('script[data-ad-client]')) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`
    script.crossOrigin = 'anonymous'
    script.setAttribute('data-ad-client', ADSENSE_CLIENT_ID)
    document.head.appendChild(script)
  }
}

export const pushAd = (slot: string) => {
  if (typeof window !== 'undefined' && window.adsbygoogle) {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}