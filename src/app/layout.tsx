import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from './components/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'Tell Me a Secret - Anonymous Digital Sanctuary',
  description: 'A safe space for your thoughts. Share secrets, seek forgiveness, make wishes anonymously. Your privacy is sacred.',
  keywords: [
    'anonymous confession',
    'digital sanctuary', 
    'secret sharing',
    'anonymous therapy',
    'spiritual confession',
    'private thoughts',
    'safe space',
    'anonymous secrets',
    'emotional healing',
    'digital confessional'
  ],
  authors: [{ name: 'Tell Me a Secret' }],
  creator: 'Tell Me a Secret',
  publisher: 'Tell Me a Secret',
  
  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    title: 'Tell Me a Secret - Anonymous Digital Sanctuary',
    description: 'A safe space for your thoughts. Share secrets, seek forgiveness, make wishes anonymously.',
    url: 'https://your-domain.com', // Update with your actual domain
    siteName: 'Tell Me a Secret',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png', // 1200x630 social sharing image
        width: 1200,
        height: 630,
        alt: 'Tell Me a Secret - Anonymous Digital Sanctuary',
      },
      {
        url: '/logo.png', // Your main logo
        width: 500,
        height: 500,
        alt: 'Tell Me a Secret Logo',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Tell Me a Secret - Anonymous Digital Sanctuary',
    description: 'A safe space for your thoughts. Share anonymously and find peace.',
    images: ['/og-image.png'],
    creator: '@tellmeasecret', // Update with your Twitter handle if you have one
  },
  
  // Search Engine Optimization
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Icons and Favicons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/logo-icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  
  // Manifest for PWA (optional)
  manifest: '/manifest.json',
  
  category: 'lifestyle',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href="https://your-domain.com" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#8b5cf6" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="application-name" content="Tell Me a Secret" />
        <meta name="apple-mobile-web-app-title" content="Tell Me a Secret" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Preload important assets */}
        <link rel="preload" href="/logo.png" as="image" />
      </head>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
