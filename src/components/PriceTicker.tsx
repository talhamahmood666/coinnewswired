'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const PRICE_DATA = [
  { symbol: 'BTC', price: 75294.36, change: 0.73, url: '/price-indexes/bitcoin' },
  { symbol: 'ETH', price: 2133.10, change: 0.35, url: '/price-indexes/ethereum' },
  { symbol: 'BNB', price: 690.81, change: 0.87, url: '/price-indexes/binancecoin' },
  { symbol: 'SOL', price: 86.58, change: 0.15, url: '/price-indexes/solana' },
  { symbol: 'XRP', price: 1.09, change: -1.39, url: '/price-indexes/ripple' },
  { symbol: 'DOGE', price: 0.06993, change: 1.44, url: '/price-indexes/dogecoin' },
  { symbol: 'ADA', price: 0.1769, change: 1.05, url: '/price-indexes/cardano' },
  { symbol: 'LINK', price: 10.63, change: 2.28, url: '/price-indexes/chainlink' },
  { symbol: 'XLM', price: 0.1472, change: 0.63, url: '/price-indexes/stellar' },
  { symbol: 'TRX', price: 0.3176, change: -0.53, url: '/price-indexes/tron' },
  { symbol: 'HYPE', price: 75.07, change: 0.84, url: '/price-indexes/hyperliquid' },
  { symbol: 'XMR', price: 582.78, change: -2.61, url: '/price-indexes/monero' },
  { symbol: 'ZEC', price: 1161.03, change: -4.16, url: '/price-indexes/zcash' },
]

export function PriceTicker() {
  const [tickers, setTickers] = useState(PRICE_DATA)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev => prev.map(t => ({
        ...t,
        price: t.price * (1 + (Math.random() - 0.5) * 0.002),
        change: t.change + (Math.random() - 0.5) * 0.1
      })))
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 500)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    if (price >= 1000) return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    if (price >= 1) return price.toFixed(2)
    return price.toFixed(5)
  }

  return (
    <div className="price-ticker" role="region" aria-label="Crypto price ticker">
      <div className="ticker-track" style={{ animationPlayState: isAnimating ? 'running' : 'paused' }}>
        {tickers.map((coin, index) => (
          <Link
            key={coin.symbol}
            href={coin.url}
            className="ticker-item"
            aria-label={`${coin.symbol} price ${formatPrice(coin.price)} ${coin.change >= 0 ? 'up' : 'down'} ${Math.abs(coin.change)}%`}
          >
            <span className="ticker-symbol">{coin.symbol}</span>
            <span className="ticker-price">${formatPrice(coin.price)}</span>
            <span className={`ticker-change ${coin.change >= 0 ? 'positive' : 'negative'}`}>
              {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(2)}%
            </span>
            {index < tickers.length - 1 && <span className="ticker-sep" aria-hidden="true">|</span>}
          </Link>
        ))}
        {/* Duplicate for seamless loop */}
        {tickers.map((coin, index) => (
          <Link
            key={`${coin.symbol}-dup`}
            href={coin.url}
            className="ticker-item"
            aria-label={`${coin.symbol} price ${formatPrice(coin.price)} ${coin.change >= 0 ? 'up' : 'down'} ${Math.abs(coin.change)}%`}
          >
            <span className="ticker-symbol">{coin.symbol}</span>
            <span className="ticker-price">${formatPrice(coin.price)}</span>
            <span className={`ticker-change ${coin.change >= 0 ? 'positive' : 'negative'}`}>
              {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(2)}%
            </span>
            {index < tickers.length - 1 && <span className="ticker-sep" aria-hidden="true">|</span>}
          </Link>
        ))}
      </div>
    </div>
  )
}