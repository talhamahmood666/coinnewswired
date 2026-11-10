'use client'

import { useState } from 'react'
import { event } from '@/lib/analytics'

export function NewsletterSignup({ className }: { className?: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'loading') return
    
    setStatus('loading')
    setMessage('')
    
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      
      const data = await res.json()
      
      if (res.ok) {
        setStatus('success')
        setMessage('Thanks for subscribing! Check your inbox for confirmation.')
        setEmail('')
        event('newsletter_signup', 'engagement', 'footer')
      } else {
        setStatus('error')
        setMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please check your connection and try again.')
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)} noValidate>
      <div>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === 'loading' || status === 'success'}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          aria-describedby={status === 'success' ? 'success-message' : status === 'error' ? 'error-message' : undefined}
        />
      </div>
      
      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
      
      {status === 'success' && (
        <p id="success-message" className="text-sm text-green-600 dark:text-green-400" role="status">
          {message}
        </p>
      )}
      
      {status === 'error' && (
        <p id="error-message" className="text-sm text-red-600 dark:text-red-400" role="alert">
          {message}
        </p>
      )}
      
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        We respect your privacy. Unsubscribe at any time.{' '}
        <a href="/privacy" className="underline hover:text-orange-500">Privacy Policy</a>
      </p>
    </form>
  )
}

import { cn } from '@/lib/utils'