'use client'

import { useEffect } from 'react'

interface PayPalHostedButtonProps {
  onPaymentSuccess?: () => void
}

export default function PayPalHostedButton({ onPaymentSuccess }: PayPalHostedButtonProps) {
  useEffect(() => {
    // Ensure PayPal script is loaded
    if (typeof window !== 'undefined' && (window as any).paypal) {
      const script = document.createElement('script')
      script.innerHTML = `
        document.addEventListener("DOMContentLoaded", (event) => {
          if (window.paypal && window.paypal.HostedButtons) {
            window.paypal.HostedButtons({
              hostedButtonId: "H32AHTUCBKK9C"
            }).render("#paypal-container-H32AHTUCBKK9C")
          }
        })
      `
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(251, 191, 36, 0.2)',
      borderRadius: '1rem',
      padding: '1.5rem',
      textAlign: 'center',
      marginTop: '1rem'
    }}>
      <h3 style={{
        color: '#fef3c7',
        fontSize: '1.1rem',
        marginBottom: '1rem',
        fontFamily: 'serif'
      }}>
        Alternative Payment Method
      </h3>
      
      <p style={{
        color: '#cbd5e1',
        fontSize: '0.9rem',
        marginBottom: '1rem'
      }}>
        Use PayPal's hosted checkout for additional payment options
      </p>

      <div id="paypal-container-H32AHTUCBKK9C"></div>
    </div>
  )
}
