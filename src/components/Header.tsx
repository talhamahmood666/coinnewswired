'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { CATEGORIES } from '@/lib/types'
import { cn } from '@/lib/utils'

const MAIN_NAV = [
  { label: 'News', href: '/', exact: true },
  { label: 'Markets', href: '/category/markets' },
  { label: 'Magazine', href: '/category/magazine' },
  { label: 'Opinion', href: '/category/opinion' },
  { label: 'Learn', href: '/learn' },
  { label: 'Newsletters', href: '/newsletters' },
  { label: 'Events', href: '/events' },
  { label: 'Research', href: '/research' },
  { label: 'Video', href: '/video' },
  { label: 'Jobs', href: '/jobs' },
]

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
}

function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-start justify-center pt-20" role="dialog" aria-modal="true" aria-label="Search">
      <div className="w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close search"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <input
            type="search"
            placeholder="Search articles, authors, topics..."
            className="flex-1 bg-transparent text-lg text-gray-900 dark:text-white placeholder-gray-400 outline-none"
            autoFocus
            aria-label="Search query"
          />
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Recent searches</p>
          <div className="flex flex-wrap gap-2">
            {['Bitcoin ETF', 'Ethereum upgrade', 'DeFi regulation', 'NFT marketplace'].map((term) => (
              <button key={term} className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-900/30 dark:hover:text-orange-400 transition-colors">
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Header() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (href: string, exact = false) => {
    if (!pathname) return false
    if (exact) return pathname === href
    return pathname.startsWith(href) && href !== '/'
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-gray-800 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between gap-4">
            <div className="flex items-center gap-6 shrink-0">
              <button
                className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              <Link href="/" className="flex items-center gap-2" aria-label="CoinNewsWired Home">
                <svg className="h-8 w-8 text-orange-500" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                  <path d="M16 2L4 8v16l12 6 12-6V8L16 2zm0 2.5L26 9.5v13L16 29.5V4.5zM8 10.5l6 3v9l-6 3v-9l-6-3V10.5zm12 0l6 3v9l-6 3v-9l-6-3v-9z" />
                </svg>
                <span className="font-bold text-xl text-gray-900 dark:text-white">CoinNewsWired</span>
              </Link>

              <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation" role="menubar">
                {MAIN_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    className={cn(
                      'px-3 py-2 text-sm font-medium rounded transition-colors',
                      isActive(item.href, item.exact)
                        ? 'text-orange-500 bg-orange-50 dark:bg-orange-900/20'
                        : 'text-gray-600 hover:text-orange-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-orange-400'
                    )}
                    aria-current={isActive(item.href, item.exact) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Search"
                  aria-expanded={isSearchOpen}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-sm font-medium">Search</span>
                  <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2H6a2 2 0 002 2z" /></svg>
                    <span>K</span>
                  </kbd>
                </button>
              </div>

              <Link
                href="/newsletters"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-medium transition-colors hover:bg-orange-600"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                </svg>
                Newsletters
              </Link>

              <button
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 transition-colors"
                aria-label="Toggle dark mode"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-4">
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.href, item.exact)
                      ? 'bg-orange-50 text-orange-500 dark:bg-orange-900/20 dark:text-orange-400'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-orange-500 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-orange-400'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <hr className="my-2 border-gray-200 dark:border-gray-700" />
              <Link
                href="/newsletters"
                className="px-3 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium text-center transition-colors hover:bg-orange-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Subscribe to Newsletters
              </Link>
            </nav>
          </div>
        )}

        <div className="hidden sm:flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <nav className="flex flex-wrap items-center gap-4" aria-label="Category navigation">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={"/category/" + category.slug}
                className={cn(
                  'inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full transition-colors',
                  pathname && pathname === "/category/" + category.slug
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-orange-900/30 dark:hover:text-orange-400'
                )}
                aria-current={pathname && pathname === "/category/" + category.slug ? 'page' : undefined}
              >
                <span style={{ color: category.color, fontSize: '10px', lineHeight: '1', display: 'inline-flex', alignItems: 'center' }}>{category.icon}</span>
                {category.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Live</span>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" aria-label="Live indicator" />
          </div>
        </div>
    </header>

    <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}