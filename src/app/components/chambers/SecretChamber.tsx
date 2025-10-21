'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { Lock, ArrowLeft, Send, DollarSign } from 'lucide-react'

interface SecretChamberProps {
  onBack: () => void
}

export default function SecretChamber({ onBack }: SecretChamberProps) {
  const [secret, setSecret] = useState('')
  const [amount, setAmount] = useState('1.00') // Default $1 for secrets
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Generate stable particle positions only on client
  const particles = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 2,
      delay: Math.random() * 2
    }))
  }, [isClient])

  const handleAmountChange = (value: string) => {
    // Only allow numbers and decimal point
    const numericValue = value.replace(/[^0-9.]/g, '')
    
    // Ensure minimum $1
    const numValue = parseFloat(numericValue) || 1.00
    if (numValue < 1.00) {
      setAmount('1.00')
    } else {
      setAmount(numValue.toFixed(2))
    }
  }

  const handleSubmit = async () => {
    if (!secret.trim()) return
    
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          content: secret.trim(),
          type: 'secret',
          amount: amount
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Payment failed')
      }

      // Redirect to PayPal
      window.location.href = data.approvalUrl

    } catch (err) {
      console.error('Payment error:', err)
      setError(err instanceof Error ? err.message : 'Payment failed')
      setIsSubmitting(false)
    }
  }

  // Completion state (won't be used with PayPal redirect, but keeping for consistency)
  if (isComplete) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center', maxWidth: '32rem' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
            style={{ marginBottom: '2rem' }}
          >
            <Lock size={80} color="#8b5cf6" strokeWidth={1.5} />
          </motion.div>
          
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#fef3c7',
            fontFamily: 'serif',
            fontWeight: 300
          }}>
            Your secret is sealed forever
          </h2>
          
          <p style={{
            color: '#cbd5e1',
            marginBottom: '2rem',
            lineHeight: 1.6,
            fontSize: '1.125rem'
          }}>
            It has been released into the digital void, never to be seen again. 
            You are free from its weight.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            style={{
              padding: '0.75rem 2rem',
              background: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '2rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Return to Sanctuary
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Gentle Particles - Only render on client */}
      {isClient && (
        <div style={{ position: 'absolute', inset: 0 }}>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              style={{
                position: 'absolute',
                width: '6px',
                height: '6px',
                backgroundColor: '#a855f7',
                borderRadius: '50%',
                opacity: 0.3,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '1rem'
        }}
      >
        <div style={{ maxWidth: '48rem', width: '100%' }}>
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  padding: '1.5rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.3), rgba(109, 40, 217, 0.3))',
                  border: '1px solid rgba(139, 92, 246, 0.3)'
                }}
              >
                <Lock size={64} color="#8b5cf6" strokeWidth={1.5} />
              </motion.div>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontFamily: 'serif',
              color: '#fef3c7',
              marginBottom: '1rem',
              fontWeight: 300
            }}>
              Share Your Secret
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#cbd5e1',
              lineHeight: 1.6,
              maxWidth: '32rem',
              margin: '0 auto'
            }}>
              This is a safe, anonymous space to release what&apos;s been weighing on your mind. 
              Your secret will be sealed forever.
            </p>
          </motion.div>

          {/* Secret Input */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ marginBottom: '2rem' }}
          >
            <div style={{ position: 'relative' }}>
              <textarea
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="What would you like to share? Take your time..."
                maxLength={500}
                style={{
                  width: '100%',
                  height: '16rem',
                  padding: '1.5rem',
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '1rem',
                  color: '#fef3c7',
                  fontSize: '1.125rem',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  lineHeight: 1.6,
                  resize: 'none',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)'
                  e.target.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(139, 92, 246, 0.2)'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                fontSize: '0.875rem',
                color: '#94a3b8'
              }}>
                {secret.length}/500
              </div>
            </div>
          </motion.div>

          {/* Amount Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{ marginBottom: '2rem' }}
          >
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '1rem',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <h3 style={{
                color: '#fef3c7',
                fontSize: '1.25rem',
                marginBottom: '1rem',
                fontFamily: 'serif'
              }}>
                Choose Your Contribution
              </h3>
              
              <p style={{
                color: '#cbd5e1',
                fontSize: '0.95rem',
                marginBottom: '1.5rem',
                lineHeight: 1.5
              }}>
                Your secret deserves a sacred space. Choose what feels right for this moment of release.
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                <DollarSign size={24} color="#8b5cf6" />
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#fef3c7',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    textAlign: 'center',
                    width: '120px',
                    fontFamily: 'monospace'
                  }}
                  placeholder="1.00"
                />
                <span style={{ color: '#cbd5e1', fontSize: '1.5rem' }}>USD</span>
              </div>

              <div style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                {['1.00', '3.00', '5.00', '10.00'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: amount === preset 
                        ? 'rgba(139, 92, 246, 0.3)' 
                        : 'rgba(139, 92, 246, 0.1)',
                      border: `1px solid ${amount === preset ? '#8b5cf6' : 'rgba(139, 92, 246, 0.2)'}`,
                      borderRadius: '0.5rem',
                      color: '#cbd5e1',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    ${preset}
                  </button>
                ))}
              </div>

              <p style={{
                color: '#94a3b8',
                fontSize: '0.8rem',
                marginTop: '1rem',
                fontStyle: 'italic'
              }}>
                Minimum $1.00 • Your generosity supports this sacred space
              </p>
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: 'rgba(127, 29, 29, 0.3)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '0.5rem',
                color: '#fca5a5',
                textAlign: 'center'
              }}
            >
              {error}
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              disabled={isSubmitting}
              style={{
                padding: '1rem 2rem',
                backgroundColor: 'transparent',
                border: '1px solid #64748b',
                color: '#cbd5e1',
                borderRadius: '2rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <ArrowLeft size={20} />
              Back to Doors
            </motion.button>
            
            <motion.button
              whileHover={{ scale: secret.trim() && !isSubmitting ? 1.05 : 1 }}
              whileTap={{ scale: secret.trim() && !isSubmitting ? 0.95 : 1 }}
              onClick={handleSubmit}
              disabled={!secret.trim() || isSubmitting}
              style={{
                padding: '1rem 2rem',
                borderRadius: '2rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                minWidth: '220px',
                justifyContent: 'center',
                cursor: secret.trim() && !isSubmitting ? 'pointer' : 'not-allowed',
                background: secret.trim() && !isSubmitting 
                  ? 'linear-gradient(to right, #7c3aed, #6d28d9)'
                  : '#64748b',
                color: secret.trim() && !isSubmitting ? '#ffffff' : '#94a3b8',
                border: 'none'
              }}
            >
              {isSubmitting ? (
                'Processing Payment...'
              ) : (
                <>
                  <Send size={20} />
                  Pay ${amount} & Seal Secret
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              marginTop: '3rem',
              textAlign: 'center',
              color: '#94a3b8',
              fontSize: '0.875rem'
            }}
          >
            <p style={{ marginBottom: '0.5rem' }}>
              Your secret will be encrypted and permanently deleted after payment
            </p>
            <p>Secure payment processing by PayPal</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
