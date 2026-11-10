'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORIES } from '@/lib/types'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-gray-800 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2" aria-label="CoinNewsWired Home">
              <span className="text-2xl font-bold text-orange-500">₿</span>
              <span className="font-bold text-xl text-gray-900 dark:text-white">CoinNewsWired</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-orange-500',
                    pathname === `/category/${category.slug}` 
                      ? 'text-orange-500' 
                      : 'text-gray-600 dark:text-gray-300'
                  )}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              href="/newsletter"
              className="hidden sm:block rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600"
            >
              Subscribe
            </Link>
            
            <button
              className="p-2 rounded-lg text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400"
              aria-label="Toggle dark mode"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="md:hidden border-t border-gray-200 dark:border-gray-800 px-4 py-3">
        <nav className="flex flex-wrap items-center gap-2" aria-label="Mobile navigation">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={cn(
                'text-xs font-medium px-3 py-1 rounded-full transition-colors',
                pathname === `/category/${category.slug}`
                  ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
              )}
            >
              {category.icon} {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}