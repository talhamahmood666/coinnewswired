'use client'

import { useEffect, useRef } from 'react'
import { ADSENSE_SLOTS, pushAd } from '@/lib/adsense'

interface AdSenseProps {
  slot: keyof typeof ADSENSE_SLOTS
  className?: string
  style?: React.CSSProperties
}

export function AdSense({ slot, className, style }: AdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const slotId = ADSENSE_SLOTS[slot]
  
  useEffect(() => {
    if (slotId && adRef.current) {
      pushAd(slotId)
    }
  }, [slotId])
  
  if (!slotId) {
    return null
  }
  
  return (
    <div ref={adRef} className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

export function HeaderAd() {
  return <AdSense slot="header" className="my-4" />
}

export function SidebarAd() {
  return <AdSense slot="sidebar" className="my-4" />
}

export function InArticleAd() {
  return <AdSense slot="inArticle" className="my-8" />
}

export function FooterAd() {
  return <AdSense slot="footer" className="my-4" />
}