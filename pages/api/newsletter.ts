import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email } = req.body
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email address' })
    }
    
    // In production, integrate with your email service (Mailchimp, ConvertKit, etc.)
    console.log(`Newsletter signup: ${email}`)
    
    return res.status(200).json({ message: 'Successfully subscribed!' })
  } catch {
    return res.status(500).json({ message: 'Something went wrong. Please try again.' })
  }
}