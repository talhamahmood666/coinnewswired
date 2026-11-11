'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/lib/types'
import { cn, formatRelativeTime } from '@/lib/utils'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'featured' | 'compact' | 'breaking'
  className?: string
}

export function ArticleCard({ article, variant = 'default', className }: ArticleCardProps) {
  const baseClasses = 'group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900'
  
  const variantClasses = {
    default: 'md:flex-row',
    featured: 'md:flex-row',
    compact: '',
    breaking: 'border-orange-200 dark:border-orange-800',
  }
  
  const imageClasses = {
    default: 'md:w-64 md:h-48 md:flex-shrink-0',
    featured: 'md:w-72 md:h-56 md:flex-shrink-0',
    compact: 'h-32 w-full',
    breaking: 'md:w-64 md:h-48 md:flex-shrink-0',
  }
  
  const contentClasses = {
    default: 'flex-1 p-4',
    featured: 'flex-1 p-6',
    compact: 'p-3',
    breaking: 'flex-1 p-4',
  }
  
  return (
    <article className={cn(baseClasses, variantClasses[variant], className)}>
      {article.breaking && variant !== 'breaking' && (
        <div className="absolute top-2 left-2 z-10 rounded-full bg-orange-500 px-2 py-0.5 text-xs font-bold text-white">
          BREAKING
        </div>
      )}
      
      <Link href={`/article/${article.slug}`} className="focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900" aria-label={`Read: ${article.title}`}>
        <div className={cn('relative overflow-hidden', variant === 'compact' ? 'rounded-t-xl' : 'rounded-l-xl md:rounded-l-xl md:rounded-tr-none')}>
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes={variant === 'compact' ? '100vw' : '(max-width: 768px) 100vw, 320px'}
            className={cn('object-cover transition-transform duration-300 group-hover:scale-105', imageClasses[variant])}
            loading={variant === 'featured' ? 'eager' : 'lazy'}
          />
          
          {variant === 'breaking' && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          )}
          
          <div className="absolute top-2 right-2 flex gap-1">
            <span className={cn(
              'rounded-full px-2 py-0.5 text-xs font-medium',
              `bg-${article.category.color}/10 text-${article.category.color} dark:bg-${article.category.color}/20`
            )}>
              <span style={{ fontSize: '10px', lineHeight: '1', marginRight: '4px' }}>{article.category.icon}</span>{article.category.name}
            </span>
          </div>
        </div>
        
        <div className={cn('flex flex-col', contentClasses[variant])}>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <time dateTime={article.publishedAt}>{formatRelativeTime(article.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readTime} min read</span>
          </div>
          
          <h2 className={cn(
            'mt-1 line-clamp-2 transition-colors',
            variant === 'featured' ? 'text-xl font-bold' : 'text-lg font-semibold',
            variant === 'compact' ? 'text-base font-semibold line-clamp-1' : ''
          )}>
            {article.title}
          </h2>
          
          {variant !== 'compact' && (
            <p className={cn('mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400', variant === 'featured' ? 'text-base line-clamp-3' : '')}>
              {article.excerpt}
            </p>
          )}
          
          <div className="mt-auto flex items-center justify-between pt-3">
            <div className="flex items-center gap-2">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{article.author.name}</span>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              <span>{article.tags.slice(0, 2).join(', ')}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}