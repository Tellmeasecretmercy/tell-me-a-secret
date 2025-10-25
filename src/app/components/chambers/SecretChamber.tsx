'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { Lock, ArrowLeft, Send, DollarSign } from 'lucide-react'
import BuyMeCoffeeButton from '../BuyMeCoffeeButton'
import { trackChamberEntry, trackContentStart, trackAmountSelection, trackPaymentInitiated } from '../../lib/analytics'

interface SecretChamberProps {
  onBack: () => void
}

export default function SecretChamber({ onBack }: SecretChamberProps) {
  const [secret, setSecret] = useState('')
  const [amount, setAmount] = useState('1.00')
  const [showPaymentButton, setShowPaymentButton] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [hasStartedTyping, setHasStartedTyping] = useState(false)

  useEffect(() => {
    setIsClient(true)
    trackChamberEntry('secret')
  }, [])

  // MANY MORE purple particles!
  const particles = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 60 }, (_, i) => ({ // INCREASED from 25 to 60!
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 2,
      delay: Math.random() * 2,
      size: Math.random() > 0.7 ? 8 : 6 // Some bigger particles
    }))
  }, [isClient])

  // NEW: Twinkling stars
  const stars = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 80 }, (_, i) => ({ // TONS of stars!
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.8,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
      size: Math.random() > 0.8 ? 3 : 2
    }))
  }, [isClient])

  // NEW: Floating purple bubbles
  const bubbles = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 35 }, (_, i) => ({ // Purple bubbles!
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 4 + Math.random() * 8,
      duration: 8 + Math.random() * 4,
      delay: Math.random() * 5
    }))
  }, [isClient])

  const handleSecretChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setSecret(newValue)
    
    if (newValue.length === 1 && !hasStartedTyping) {
      trackContentStart('secret')
      setHasStartedTyping(true)
    }
  }

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '')
    const numValue = parseFloat(numericValue) || 1.00
    if (numValue < 1.00) {
      setAmount('1.00')
      trackAmountSelection('1.00', 'secret')
    } else {
      const newAmount = numValue.toFixed(2)
      setAmount(newAmount)
      trackAmountSelection(newAmount, 'secret')
    }
  }

  const handlePresetAmount = (preset: string) => {
    setAmount(preset)
    trackAmountSelection(preset, 'secret')
  }

  const handlePayAndSeal = () => {
    if (!secret.trim()) return
    trackPaymentInitiated(amount, 'secret')
    setShowPaymentButton(true)
  }

  // Completion state with MORE particles
  if (isComplete) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 4vw, 2rem)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Celebration particles */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {[...Array(100)].map((_, i) => ( // TONS of celebration particles!
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: `${4 + Math.random() * 6}px`,
                height: `${4 + Math.random() * 6}px`,
                backgroundColor: ['#8b5cf6', '#a855f7', '#c084fc'][Math.floor(Math.random() * 3)],
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -150, 0],
                x: [0, (Math.random() - 0.5) * 100, 0],
                opacity: [0, 1, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ 
            textAlign: 'center', 
            maxWidth: 'clamp(20rem, 80vw, 32rem)',
            position: 'relative',
            zIndex: 10
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
            style={{ marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
          >
            <Lock 
              size={typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 80} 
              color="#8b5cf6" 
              strokeWidth={1.5} 
            />
          </motion.div>
          
          <h2 style={{
            fontSize: 'clamp(2rem, 6vw, 2.5rem)',
            marginBottom: '1rem',
            color: '#fef3c7',
            fontFamily: 'serif',
            fontWeight: 300
          }}>
            Your secret is sealed forever
          </h2>
          
          <p style={{
            color: '#cbd5e1',
            marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
            lineHeight: 1.6,
            fontSize: 'clamp(1rem, 3vw, 1.125rem)'
          }}>
            It has been released into the digital void, never to be seen again. 
            You are free from its weight.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            style={{
              padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
              background: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '2rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
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
      
      {/* MANY MORE magical particles - Only render on client */}
      {isClient && (
        <div style={{ position: 'absolute', inset: 0 }}>
          {/* Enhanced purple particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              style={{
                position: 'absolute',
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: '#a855f7',
                borderRadius: '50%',
                opacity: 0.4,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                boxShadow: '0 0 10px #a855f7',
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.7, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}

          {/* NEW: Twinkling purple stars */}
          {stars.map((star) => (
            <motion.div
              key={`star-${star.id}`}
              style={{
                position: 'absolute',
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: '#c084fc',
                borderRadius: '50%',
                opacity: star.opacity,
                left: `${star.left}%`,
                top: `${star.top}%`,
                boxShadow: '0 0 6px #c084fc',
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
              }}
            />
          ))}

          {/* NEW: Floating purple bubbles */}
          {bubbles.map((bubble) => (
            <motion.div
              key={`bubble-${bubble.id}`}
              style={{
                position: 'absolute',
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                backgroundColor: 'transparent',
                border: '1px solid #8b5cf6',
                borderRadius: '50%',
                opacity: 0.3,
                left: `${bubble.left}%`,
                top: `${bubble.top}%`,
              }}
              animate={{
                y: [0, -120, 0],
                x: [0, Math.sin(bubble.id) * 40, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: bubble.duration,
                repeat: Infinity,
                delay: bubble.delay,
                ease: "easeInOut"
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
          padding: 'clamp(1rem, 4vw, 2rem)'
        }}
      >
        <div style={{ maxWidth: 'clamp(20rem, 90vw, 48rem)', width: '100%' }}>
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 6vw, 3rem)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>
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
                  padding: 'clamp(1rem, 3vw, 1.5rem)',
                  borderRadius: '50%',
                  background: 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.3), rgba(109, 40, 217, 0.3))',
                  border: '1px solid rgba(139, 92, 246, 0.3)'
                }}
              >
                <Lock 
                  size={typeof window !== 'undefined' && window.innerWidth < 768 ? 48 : 64} 
                  color="#8b5cf6" 
                  strokeWidth={1.5} 
                />
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
              fontSize: 'clamp(1rem, 3.5vw, 1.25rem)',
              color: '#cbd5e1',
              lineHeight: 1.6,
              maxWidth: '32rem',
              margin: '0 auto'
            }}>
              This is a safe, anonymous space to release what's been weighing on your mind. 
              Your secret will be sealed forever.
            </p>
          </motion.div>

          {/* Secret Input */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
          >
            <div style={{ position: 'relative' }}>
              <textarea
                value={secret}
                onChange={handleSecretChange}
                placeholder="What would you like to share? Take your time..."
                maxLength={500}
                style={{
                  width: '100%',
                  height: 'clamp(22rem, 55vh, 28rem)',
                  padding: 'clamp(1rem, 3vw, 1.5rem)',
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '1rem',
                  color: '#fef3c7',
                  fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
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
                bottom: 'clamp(0.75rem, 2vw, 1rem)',
                right: 'clamp(0.75rem, 2vw, 1rem)',
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
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
            style={{ marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
          >
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '1rem',
              padding: 'clamp(1rem, 3vw, 1.5rem)',
              textAlign: 'center'
            }}>
              <h3 style={{
                color: '#fef3c7',
                fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
                marginBottom: '1rem',
                fontFamily: 'serif'
              }}>
                Choose Your Contribution
              </h3>
              
              <p style={{
                color: '#cbd5e1',
                fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                lineHeight: 1.5
              }}>
                Your secret deserves a sacred space. Choose what feels right for this moment of release.
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(0.3rem, 1vw, 0.5rem)',
                marginBottom: '1rem'
              }}>
                <DollarSign size={typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 24} color="#8b5cf6" />
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    fontWeight: 'bold',
                    color: '#fef3c7',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    textAlign: 'center',
                    width: 'clamp(100px, 25vw, 120px)',
                    fontFamily: 'monospace'
                  }}
                  placeholder="1.00"
                />
                <span style={{ color: '#cbd5e1', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>USD</span>
              </div>

              <div style={{
                display: 'flex',
                gap: 'clamp(0.3rem, 1vw, 0.5rem)',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                {['1.00', '3.00', '5.00', '10.00', '15.00'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePresetAmount(preset)}
                    style={{
                      padding: 'clamp(0.4rem, 1.5vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)',
                      background: amount === preset 
                        ? 'rgba(139, 92, 246, 0.3)' 
                        : 'rgba(139, 92, 246, 0.1)',
                      border: `1px solid ${amount === preset ? '#8b5cf6' : 'rgba(139, 92, 246, 0.2)'}`,
                      borderRadius: '0.5rem',
                      color: '#cbd5e1',
                      cursor: 'pointer',
                      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    ${preset}
                  </button>
                ))}
              </div>

              <p style={{
                color: '#94a3b8',
                fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
                marginTop: '1rem',
                fontStyle: 'italic'
              }}>
                Minimum $1.00 • Your generosity supports this sacred space
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            style={{
              display: 'flex',
              gap: 'clamp(1rem, 3vw, 1.5rem)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              style={{
                padding: 'clamp(0.8rem, 2.5vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                backgroundColor: 'transparent',
                border: '1px solid #64748b',
                color: '#cbd5e1',
                borderRadius: '2rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
              }}
            >
              <ArrowLeft size={typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 20} />
              Back to Doors
            </motion.button>
            
            <motion.button
              whileHover={{ scale: secret.trim() ? 1.05 : 1 }}
              whileTap={{ scale: secret.trim() ? 0.95 : 1 }}
              onClick={handlePayAndSeal}
              disabled={!secret.trim()}
              style={{
                padding: 'clamp(0.8rem, 2.5vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                borderRadius: '2rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                minWidth: 'clamp(200px, 50vw, 220px)',
                justifyContent: 'center',
                cursor: secret.trim() ? 'pointer' : 'not-allowed',
                background: secret.trim() 
                  ? 'linear-gradient(to right, #7c3aed, #6d28d9)'
                  : '#64748b',
                color: secret.trim() ? '#ffffff' : '#94a3b8',
                border: 'none',
                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
              }}
            >
              <Send size={typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 20} />
              Share Secret for ${amount}
            </motion.button>
          </motion.div>

          {/* Buy Me a Coffee Button appears here when clicked */}
          <motion.div
            initial={false}
            animate={{
              height: showPaymentButton ? 'auto' : 0,
              opacity: showPaymentButton ? 1 : 0
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ overflow: 'hidden', marginTop: showPaymentButton ? '2rem' : 0 }}
          >
            {showPaymentButton && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <BuyMeCoffeeButton 
                  amount={amount}
                  chamber="secret"
                  onPaymentSuccess={() => setIsComplete(true)} 
                />
              </motion.div>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              marginTop: 'clamp(2rem, 6vw, 3rem)',
              textAlign: 'center',
              color: '#94a3b8',
              fontSize: 'clamp(0.8rem, 2vw, 0.875rem)'
            }}
          >
            <p style={{ marginBottom: '0.5rem' }}>
              Your secret will be sealed forever in the digital void
            </p>
            <p>Secure anonymous sharing • Complete privacy guaranteed</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
