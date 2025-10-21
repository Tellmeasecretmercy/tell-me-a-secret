'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Lock, ArrowLeft, CreditCard } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface SecretRitualProps {
  onBack: () => void
}

export default function SecretRitual({ onBack }: SecretRitualProps) {
  const [secret, setSecret] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!secret.trim()) return
    
    setIsSubmitting(true)
    setError('')

    try {
      // Create Stripe checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: secret.trim() })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Payment failed')
      }

      
    } catch (err) {
      console.error('Payment error:', err)
      setError(err instanceof Error ? err.message : 'Payment failed')
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '42rem', width: '100%' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '1.5rem' 
          }}>
            <Lock size={64} color="#8b5cf6" strokeWidth={1.5} />
          </div>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#fef3c7',
            fontFamily: 'serif'
          }}>
            Tell Me a Secret
          </h2>
          <p style={{
            color: '#cbd5e1',
            fontSize: '1.125rem',
            lineHeight: 1.6
          }}>
            Share what weighs on your heart. For $1, your secret will be 
            sealed forever in the digital void.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ marginBottom: '2rem' }}
        >
          <textarea
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Whisper your secret here..."
            maxLength={500}
            style={{
              width: '100%',
              height: '12rem',
              padding: '1.5rem',
              backgroundColor: 'rgba(30, 41, 59, 0.5)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              borderRadius: '0.75rem',
              color: '#fef3c7',
              fontSize: '1.125rem',
              fontFamily: 'serif',
              lineHeight: 1.6,
              resize: 'none',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(251, 191, 36, 0.5)'
              e.target.style.boxShadow = '0 0 0 2px rgba(251, 191, 36, 0.2)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(251, 191, 36, 0.2)'
              e.target.style.boxShadow = 'none'
            }}
          />
          <div style={{
            textAlign: 'right',
            fontSize: '0.875rem',
            color: '#94a3b8',
            marginTop: '0.5rem'
          }}>
            {secret.length}/500 characters
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '0.5rem',
              padding: '1rem',
              marginBottom: '1rem',
              color: '#fca5a5',
              textAlign: 'center'
            }}
          >
            {error}
          </motion.div>
        )}

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            disabled={isSubmitting}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              border: '1px solid #64748b',
              borderRadius: '0.5rem',
              color: '#cbd5e1',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
              opacity: isSubmitting ? 0.5 : 1
            }}
          >
            <ArrowLeft size={16} />
            Back
          </motion.button>
          
          <motion.button
            whileHover={{ scale: secret.trim() && !isSubmitting ? 1.05 : 1 }}
            whileTap={{ scale: secret.trim() && !isSubmitting ? 0.95 : 1 }}
            onClick={handleSubmit}
            disabled={!secret.trim() || isSubmitting}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: secret.trim() && !isSubmitting ? '#fbbf24' : '#64748b',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#0f172a',
              cursor: secret.trim() && !isSubmitting ? 'pointer' : 'not-allowed',
              fontSize: '1rem',
              fontWeight: '600',
              minWidth: '140px',
              transition: 'all 0.3s ease',
              opacity: secret.trim() && !isSubmitting ? 1 : 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              justifyContent: 'center'
            }}
          >
            {isSubmitting ? (
              'Redirecting to Stripe...'
            ) : (
              <>
                <CreditCard size={16} />
                Pay $1 & Seal Secret
              </>
            )}
          </motion.button>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          color: '#94a3b8',
          fontSize: '0.875rem'
        }}>
          <p>🔒 Secure payment powered by Stripe</p>
          <p>💳 Supports all major credit cards worldwide</p>
          <p>🌍 Trusted by millions of businesses globally</p>
          <p>🗑️ Your secret will be permanently deleted after payment</p>
        </div>
      </motion.div>
    </div>
  )
}
