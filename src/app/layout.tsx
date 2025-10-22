import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from './components/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'Tell Me a Secret | Anonymous Digital Sanctuary for Emotional Release',
  description: 'A safe, anonymous space to share secrets, seek forgiveness, and make wishes. Find emotional healing through digital release. Your secrets are sealed forever.',
  keywords: 'anonymous secrets, digital confession, emotional healing, wish making, mental wellness, safe space, anonymous sharing, emotional release, digital sanctuary',
  authors: [{ name: 'Tell Me a Secret' }],
  creator: 'Tell Me a Secret',
  publisher: 'Tell Me a Secret',
  robots: 'index, follow',
  openGraph: {
    title: 'Tell Me a Secret | Anonymous Digital Sanctuary',
    description: 'A mystical space for emotional release. Share secrets, confessions, and wishes anonymously. Find peace through digital healing.',
    url: 'https://tellmeasecret.space',
    siteName: 'Tell Me a Secret',
    images: [
      {
        url: 'https://tellmeasecret.space/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tell Me a Secret - Digital Sanctuary for Emotional Healing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tell Me a Secret | Anonymous Digital Sanctuary',
    description: 'A mystical space for emotional release. Share secrets, confessions, and wishes anonymously.',
    images: ['https://tellmeasecret.space/og-image.jpg'],
  },
  verification: {
    google: 'your-google-site-verification-code', // Add when you get it from Search Console
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* SEO Meta Tags */}
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://tellmeasecret.space" />
        
        {/* Additional Meta for Better SEO */}
        <meta property="og:site_name" content="Tell Me a Secret" />
        <meta name="application-name" content="Tell Me a Secret" />
        <meta name="apple-mobile-web-app-title" content="Tell Me a Secret" />
      </head>
      <body>
        {/* Google Analytics */}
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
