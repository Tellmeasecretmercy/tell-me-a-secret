export const GA_MEASUREMENT_ID = 'G-G5V6G66CLF'

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Track custom events
export const event = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Specific tracking functions for your platform
export const trackChamberEntry = (chamberType: 'secret' | 'confession' | 'wish') => {
  event('chamber_entered', 'engagement', chamberType)
}

export const trackContentStart = (chamberType: 'secret' | 'confession' | 'wish') => {
  event('content_start', 'engagement', chamberType)
}

export const trackAmountSelection = (amount: string, chamberType: 'secret' | 'confession' | 'wish') => {
  event('amount_selected', 'conversion', chamberType, parseFloat(amount))
}

export const trackPaymentInitiated = (amount: string, chamberType: 'secret' | 'confession' | 'wish') => {
  event('payment_initiated', 'conversion', chamberType, parseFloat(amount))
}

export const trackPaymentCompleted = (amount: string, chamberType: 'secret' | 'confession' | 'wish') => {
  event('payment_completed', 'conversion', chamberType, parseFloat(amount))
}
