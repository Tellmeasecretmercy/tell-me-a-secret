import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tell Me a Secret | Digital Sanctuary for Your Soul',
  description: 'A safe, anonymous space to share secrets, seek forgiveness, and make wishes. Find emotional healing through digital release.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* PayPal Hosted Buttons Script */}
        <script 
          src="https://www.paypal.com/sdk/js?client-id=BAAmtplucBfGAVafH5hC_9qpvmNtE8qLJfqhXFwi5Nuopz4bhwlT5CtkT_I2mTVcBQNbpW5bU78Mw4qjC0&components=hosted-buttons&disable-funding=venmo&currency=USD"
          crossOrigin="anonymous"
          async
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
