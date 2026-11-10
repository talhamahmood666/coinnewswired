import Link from 'next/link'
import { CATEGORIES, SITE_CONFIG } from '@/lib/types'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'Press', href: '/press' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Editorial Guidelines', href: '/guidelines' },
    ],
    resources: [
      { label: 'Crypto Glossary', href: '/glossary' },
      { label: 'Price Tracker', href: '/prices' },
      { label: 'ICO Calendar', href: '/ico-calendar' },
      { label: 'Research Reports', href: '/research' },
    ],
  }
  
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2" aria-label="CoinNewsWired Home">
              <span className="text-2xl font-bold text-orange-500">₿</span>
              <span className="font-bold text-xl text-gray-900 dark:text-white">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-6 flex gap-4">
              <a href={`https://twitter.com/${SITE_CONFIG.twitterHandle.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500" aria-label="Follow us on Twitter">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500" aria-label="Follow us on LinkedIn">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
              </a>
              <a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500" aria-label="RSS Feed">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18c0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4-4 1.79-4 4zm-4 0c0 3.31 2.69 6 6 6s6-2.69 6-6-2.69-6-6-6-6 2.69-6 6zm10 0h2v-8c0-2.21-1.79-4-4-4S8 7.79 8 10v8h2v-8c0-1.1.9-2 2-2s2 .9 2 2v8z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Categories</h3>
            <ul className="mt-4 space-y-3">
              {CATEGORIES.slice(0, 4).map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.slug}`} className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400">
                    {category.icon} {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Resources</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Not financial advice. Do your own research.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}