// Deploy trigger 1794385361.745592
import { Article, Category, Author, CATEGORIES } from './types'

export const AUTHORS: Author[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: '/authors/sarah-chen.jpg',
    bio: 'Senior crypto journalist covering DeFi and institutional adoption. Former Wall Street analyst.',
    twitter: '@sarahchen_crypto',
    linkedin: 'sarahchen-crypto',
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    avatar: '/authors/marcus-rodriguez.jpg',
    bio: 'Blockchain developer turned reporter. Specializes in Ethereum scaling and L2 solutions.',
    twitter: '@marcusrod_dev',
    linkedin: 'marcusrodriguez-blockchain',
  },
  {
    id: '3',
    name: 'Priya Sharma',
    avatar: '/authors/priya-sharma.jpg',
    bio: 'Regulatory affairs correspondent. Tracks global crypto policy from Washington to Singapore.',
    twitter: '@priyasharma_reg',
    linkedin: 'priyasharma-policy',
  },
  {
    id: '4',
    name: 'James Okonkwo',
    avatar: '/authors/james-okonkwo.jpg',
    bio: 'Market analyst and technical trader. Writes on price action, derivatives, and on-chain metrics.',
    twitter: '@jamesokonkwo_ta',
    linkedin: 'jamesokonkwo-markets',
  },
]

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'bitcoin-hits-new-all-time-high-above-100k',
    title: 'Bitcoin Surges Past $100K as Institutional Inflows Accelerate',
    excerpt: 'Bitcoin reached a historic milestone Tuesday, breaking above $100,000 for the first time as spot ETF flows hit record weekly highs and corporate treasury adoption expands.',
    content: `
      <p>Bitcoin (BTC) smashed through the psychological $100,000 barrier on Tuesday, reaching an all-time high of $103,847 during Asian trading hours. The milestone comes after weeks of sustained institutional buying pressure.</p>
      
      <h2>ETF Flows Drive Momentum</h2>
      <p>U.S. spot Bitcoin ETFs recorded $2.3 billion in net inflows last week, the highest weekly total since their January launch. BlackRock's IBIT led with $1.1 billion, followed by Fidelity's FBTC at $680 million.</p>
      
      <h2>Corporate Treasury Adoption</h2>
      <p>MicroStrategy announced an additional $2.5 billion Bitcoin purchase, bringing its total holdings to 214,400 BTC. Semler Scientific and Metaplanet also disclosed new allocations.</p>
      
      <h2>Technical Outlook</h2>
      <p>Analysts cite the $100K level as a key psychological resistance that, once flipped to support, could open the path toward $120K by Q2 2025.</p>
    `,
    coverImage: '/images/bitcoin-100k.jpg',
    category: { id: '1', name: 'Bitcoin', slug: 'bitcoin', description: '', color: '#F7931A', icon: '₿' },
    tags: ['Bitcoin', 'ETF', 'Institutional', 'ATH'],
    author: AUTHORS[0],
    publishedAt: '2025-01-15T08:30:00Z',
    updatedAt: '2025-01-15T08:30:00Z',
    readTime: 5,
    featured: true,
    breaking: true,
  },
  {
    id: '2',
    slug: 'ethereum-pekhardt-fork-live-mainnet',
    title: 'Ethereum Pectra Upgrade Goes Live on Mainnet',
    excerpt: 'The Pectra upgrade combining Prague and Electra improvements activates today, bringing account abstraction, validator experience upgrades, and blob throughput increases.',
    content: `
      <p>Ethereum's highly anticipated Pectra upgrade successfully activated on mainnet at block 22,256,640, marking the network's most significant upgrade since Dencun.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li><strong>EIP-7702:</strong> Native account abstraction allowing EOAs to temporarily act as smart contracts</li>
        <li><strong>EIP-7251:</strong> Increased validator effective balance cap from 32 to 2,048 ETH</li>
        <li><strong>EIP-7691:</strong> Increased blob throughput for L2 scaling</li>
        <li><strong>EIP-2537:</strong> BLS12-381 precompile for ZK-cryptography</li>
      </ul>
      
      <h2>L2 Impact</h2>
      <p>Arbitrum, Optimism, and Base are expected to see 2-3x throughput improvements with the blob space increase.</p>
    `,
    coverImage: '/images/ethereum-pectra.jpg',
    category: { id: '2', name: 'Ethereum', slug: 'ethereum', description: '', color: '#627EEA', icon: 'Ξ' },
    tags: ['Ethereum', 'Pectra', 'Upgrade', 'Account Abstraction'],
    author: AUTHORS[1],
    publishedAt: '2025-01-14T14:20:00Z',
    updatedAt: '2025-01-14T14:20:00Z',
    readTime: 7,
    featured: true,
    breaking: false,
  },
  {
    id: '3',
    slug: 'uniswap-v4-launches-with-hooks',
    title: 'Uniswap v4 Launches with Customizable Hooks Architecture',
    excerpt: 'The long-awaited v4 protocol goes live on Ethereum mainnet, introducing hooks for custom AMM logic, singleton contracts for gas efficiency, and native ETH support.',
    content: `
      <p>Uniswap v4 is now live on Ethereum mainnet after months of audits and testnet iterations. The upgrade introduces a fundamentally new architecture centered on "hooks" - customizable smart contracts that can modify pool behavior at key lifecycle points.</p>
      
      <h2>Hooks Enable Innovation</h2>
      <p>Developers can now build custom logic for dynamic fees, on-chain limit orders, TWAMM implementations, and impermanent loss protection directly into liquidity pools.</p>
      
      <h2>Gas Savings</h2>
      <p>The singleton contract design reduces pool deployment gas by ~99% and multi-hop swap costs by ~30%.</p>
    `,
    coverImage: '/images/uniswap-v4.jpg',
    category: { id: '3', name: 'DeFi', slug: 'defi', description: '', color: '#00D4AA', icon: '📊' },
    tags: ['Uniswap', 'DeFi', 'v4', 'Hooks', 'AMM'],
    author: AUTHORS[0],
    publishedAt: '2025-01-13T10:15:00Z',
    updatedAt: '2025-01-13T10:15:00Z',
    readTime: 6,
    featured: false,
    breaking: false,
  },
  {
    id: '4',
    slug: 'sec-approves-first-spot-solana-etf',
    title: 'SEC Approves First Spot Solana ETF Applications',
    excerpt: 'In a landmark decision, the SEC has approved 19b-4 filings for spot Solana ETFs from VanEck, 21Shares, and Canary Capital, with trading expected to begin within weeks.',
    content: `
      <p>The U.S. Securities and Exchange Commission has approved the 19b-4 exchange rule filings for multiple spot Solana ETF applications, marking the first altcoin ETF approvals beyond Bitcoin and Ethereum.</p>
      
      <h2>Approved Issuers</h2>
      <ul>
        <li>VanEck Solana Trust</li>
        <li>21Shares Core Solana ETF</li>
        <li>Canary Solana ETF</li>
      </ul>
      
      <h2>Market Implications</h2>
      <p>Analysts project $3-5 billion in first-year flows. SOL rallied 22% on the news, outperforming the broader market.</p>
    `,
    coverImage: '/images/solana-etf.jpg',
    category: { id: '5', name: 'Regulation', slug: 'regulation', description: '', color: '#FF5722', icon: '⚖️' },
    tags: ['SEC', 'Solana', 'ETF', 'Regulation', 'Approval'],
    author: AUTHORS[2],
    publishedAt: '2025-01-12T16:45:00Z',
    updatedAt: '2025-01-12T16:45:00Z',
    readTime: 4,
    featured: true,
    breaking: true,
  },
  {
    id: '5',
    slug: 'bitcoin-mining-difficulty-hits-record',
    title: 'Bitcoin Mining Difficulty Hits Record High Amid Hash Rate Surge',
    excerpt: 'Network difficulty adjusted upward 6.8% to 110.4T, the highest ever, as hash rate reaches 650 EH/s driven by new ASIC deployments and seasonal power advantages.',
    content: `
      <p>Bitcoin's mining difficulty climbed to an all-time high of 110.4 trillion at block 884,352, reflecting a 6.8% increase from the previous epoch.</p>
      
      <h2>Hash Rate Growth</h2>
      <p>The 7-day average hash rate now stands at 650 EH/s, up 40% year-over-year. New S21 XP and T21 deployments from Bitmain and MicroBT are driving efficiency gains.</p>
      
      <h2>Seasonal Factors</h2>
      <p>Hydro-rich regions in China and North America benefit from wet-season electricity surpluses, temporarily lowering operational costs.</p>
    `,
    coverImage: '/images/mining-difficulty.jpg',
    category: { id: '8', name: 'Mining', slug: 'mining', description: '', color: '#FF9800', icon: '⛏️' },
    tags: ['Mining', 'Difficulty', 'Hash Rate', 'ASIC'],
    author: AUTHORS[3],
    publishedAt: '2025-01-11T09:30:00Z',
    updatedAt: '2025-01-11T09:30:00Z',
    readTime: 4,
    featured: false,
    breaking: false,
  },
  {
    id: '6',
    slug: 'layerzero-v2-mainnet-launch',
    title: 'LayerZero v2 Launches Mainnet with DVN Security Model',
    excerpt: 'The omnichain interoperability protocol debuts v2 with Decentralized Verifier Networks, configurable security, and support for 50+ chains at launch.',
    content: `
      <p>LayerZero v2 is now live across 50+ blockchains, introducing a modular security architecture where applications configure their own Decentralized Verifier Networks (DVNs).</p>
      
      <h2>Key Improvements</h2>
      <ul>
        <li>Permissionless DVN marketplace</li>
        <li>Configurable security per message</li>
        <li>Native gas abstraction</li>
        <li>Horizontal composability</li>
      </ul>
    `,
    coverImage: '/images/layerzero-v2.jpg',
    category: { id: '7', name: 'Web3', slug: 'web3', description: '', color: '#9C27B0', icon: '🌐' },
    tags: ['LayerZero', 'Interoperability', 'v2', 'DVN', 'Cross-chain'],
    author: AUTHORS[1],
    publishedAt: '2025-01-10T13:00:00Z',
    updatedAt: '2025-01-10T13:00:00Z',
    readTime: 5,
    featured: false,
    breaking: false,
  },
  {
    id: '7',
    slug: 'tether-usdt-market-cap-100b',
    title: 'Tether USDT Market Cap Surpasses $100 Billion',
    excerpt: 'USDT becomes the first stablecoin to reach $100B in circulation, cementing its dominance as crypto\'s primary liquidity layer across centralized and decentralized venues.',
    content: `
      <p>Tether's USDT has crossed the $100 billion market cap threshold, a milestone that underscores its role as the backbone of crypto trading and DeFi liquidity.</p>
      
      <h2>Supply Breakdown</h2>
      <p>Approximately $60B on Tron, $35B on Ethereum, and $5B across other chains including Solana, Avalanche, and Near.</p>
    `,
    coverImage: '/images/usdt-100b.jpg',
    category: { id: '3', name: 'DeFi', slug: 'defi', description: '', color: '#00D4AA', icon: '📊' },
    tags: ['Tether', 'USDT', 'Stablecoin', 'Market Cap', 'DeFi'],
    author: AUTHORS[0],
    publishedAt: '2025-01-09T11:20:00Z',
    updatedAt: '2025-01-09T11:20:00Z',
    readTime: 3,
    featured: false,
    breaking: false,
  },
  {
    id: '8',
    slug: 'friend-tech-v2-launches-base',
    title: 'friend.tech V2 Launches on Base with New Tokenomics',
    excerpt: 'The social finance app relaunches with FRIEND token, revenue sharing for key holders, and a bonding curve model designed for sustainable creator economies.',
    content: `
      <p>friend.tech V2 is live on Base, introducing the FRIEND token and a redesigned economic model aimed at long-term sustainability.</p>
      
      <h2>New Mechanics</h2>
      <p>Key holders now earn a share of trading fees. The bonding curve adjusts dynamically based on activity metrics.</p>
    `,
    coverImage: '/images/friendtech-v2.jpg',
    category: { id: '7', name: 'Web3', slug: 'web3', description: '', color: '#9C27B0', icon: '🌐' },
    tags: ['friend.tech', 'SocialFi', 'Base', 'FRIEND Token'],
    author: AUTHORS[1],
    publishedAt: '2025-01-08T15:40:00Z',
    updatedAt: '2025-01-08T15:40:00Z',
    readTime: 4,
    featured: false,
    breaking: false,
  },
]

export function getArticles(params?: {
  category?: string
  featured?: boolean
  breaking?: boolean
  limit?: number
  offset?: number
}): Article[] {
  let filtered = [...MOCK_ARTICLES].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  
  if (params?.category) {
    filtered = filtered.filter(a => a.category.slug === params.category)
  }
  if (params?.featured) {
    filtered = filtered.filter(a => a.featured)
  }
  if (params?.breaking) {
    filtered = filtered.filter(a => a.breaking)
  }
  if (params?.offset) {
    filtered = filtered.slice(params.offset)
  }
  if (params?.limit) {
    filtered = filtered.slice(0, params.limit)
  }
  
  return filtered
}

export function getArticleBySlug(slug: string): Article | undefined {
  return MOCK_ARTICLES.find(a => a.slug === slug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug)
}

export function getRelatedArticles(currentSlug: string, limit = 3): Article[] {
  const current = getArticleBySlug(currentSlug)
  if (!current) return []
  
  return MOCK_ARTICLES
    .filter(a => a.id !== currentSlug && (a.category.id === current.category.id || a.tags.some(t => current.tags.includes(t))))
    .slice(0, limit)
}

export function getBreakingNews(): Article[] {
  return MOCK_ARTICLES.filter(a => a.breaking).slice(0, 5)
}

export function getFeaturedArticles(): Article[] {
  return MOCK_ARTICLES.filter(a => a.featured).slice(0, 4)
}

export function getCategories(): Category[] {
  return CATEGORIES
}
export function getAllArticleSlugs(): string[] {
  return MOCK_ARTICLES.map((article) => article.slug)
}


export function getAuthorById(id: string): Author | undefined {
  return AUTHORS.find(a => a.id === id)
}