export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: Category
  tags: string[]
  author: Author
  publishedAt: string
  updatedAt: string
  readTime: number
  featured: boolean
  breaking: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  color: string
  icon: string
}

export interface Author {
  id: string
  name: string
  avatar: string
  bio: string
  twitter?: string
  linkedin?: string
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  twitterHandle: string
  gaId?: string
  adsenseClientId?: string
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Bitcoin', slug: 'bitcoin', description: 'Latest Bitcoin news and analysis', color: '#F7931A', icon: '₿' },
  { id: '2', name: 'Ethereum', slug: 'ethereum', description: 'Ethereum ecosystem updates', color: '#627EEA', icon: 'Ξ' },
  { id: '3', name: 'DeFi', slug: 'defi', description: 'Decentralized finance protocols', color: '#00D4AA', icon: '📊' },
  { id: '4', name: 'NFTs', slug: 'nfts', description: 'Non-fungible token marketplace', color: '#E91E63', icon: '🎨' },
  { id: '5', name: 'Regulation', slug: 'regulation', description: 'Crypto regulation and policy', color: '#FF5722', icon: '⚖️' },
  { id: '6', name: 'Trading', slug: 'trading', description: 'Market analysis and trading', color: '#2196F3', icon: '📈' },
  { id: '7', name: 'Web3', slug: 'web3', description: 'Web3 infrastructure and apps', color: '#9C27B0', icon: '🌐' },
  { id: '8', name: 'Mining', slug: 'mining', description: 'Mining news and hardware', color: '#FF9800', icon: '⛏️' },
]

export const SITE_CONFIG: SiteConfig = {
  name: 'CoinNewsWired',
  description: 'Your trusted source for breaking crypto news, market analysis, and blockchain insights.',
  url: 'https://coinnewswired.online',
  ogImage: '/og-image.png',
  twitterHandle: '@coinnewswired',
}