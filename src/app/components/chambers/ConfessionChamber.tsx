'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { Heart, ArrowLeft, Send, DollarSign } from 'lucide-react'
import BuyMeCoffeeButton from '../BuyMeCoffeeButton'
import { trackChamberEntry, trackContentStart, trackAmountSelection, trackPaymentInitiated } from '../../lib/analytics'

interface ConfessionChamberProps {
  onBack: () => void
}

export default function ConfessionChamber({ onBack }: ConfessionChamberProps) {
  const [confession, setConfession] = useState('')
  const [amount, setAmount] = useState('3.00')
  const [showPaymentButton, setShowPaymentButton] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [hasStartedTyping, setHasStartedTyping] = useState(false)

  useEffect(() => {
    setIsClient(true)
    trackChamberEntry('confession')
  }, [])

  // MANY MORE golden particles!
  const particles = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 70 }, (_, i) => ({ // INCREASED from 30 to 70!
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 6 + Math.random() * 2,
      delay: Math.random() * 3,
      size: Math.random() > 0.7 ? 8 : 6 // Some bigger particles
    }))
  }, [isClient])

  // NEW: Golden bubbles
  const bubbles = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 45 }, (_, i) => ({ // Golden healing bubbles!
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 4 + Math.random() * 10,
      duration: 8 + Math.random() * 4,
      delay: Math.random() * 5
    }))
  }, [isClient])

  // NEW: Warm light rays
  const lightRays = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 25 }, (_, i) => ({ // Healing light rays!
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: 2 + Math.random() * 4,
      height: 20 + Math.random() * 40,
      duration: 10 + Math.random() * 5,
      delay: Math.random() * 8
    }))
  }, [isClient])

  const handleConfessionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setConfession(newValue)
    
    if (newValue.length === 1 && !hasStartedTyping) {
      trackContentStart('confession')
      setHasStartedTyping(true)
    }
  }

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '')
    const numValue = parseFloat(numericValue) || 1.00
    if (numValue < 1.00) {
      setAmount('1.00')
      trackAmountSelection('1.00', 'confession')
    } else {
      const newAmount = numValue.toFixed(2)
      setAmount(newAmount)
      trackAmountSelection(newAmount, 'confession')
    }
  }

  const handlePresetAmount = (preset: string) => {
    setAmount(preset)
    trackAmountSelection(preset, 'confession')
  }

  const handlePayAndFindPeace = () => {
    if (!confession.trim()) return
    trackPaymentInitiated(amount, 'confession')
    setShowPaymentButton(true)
  }

  // Completion state with MORE golden effects
  if (isComplete) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #92400e 25%, #f59e0b 50%, #92400e 75%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 4vw, 2rem)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Golden celebration particles */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {[...Array(120)].map((_, i) => ( // TONS of golden celebration!
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                backgroundColor: ['#fbbf24', '#f59e0b', '#fcd34d'][Math.floor(Math.random() * 3)],
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -150, 0],
                x: [0, (Math.random() - 0.5) * 100, 0],
                opacity: [0, 1, 0],
                scale: [0, 2.5, 0],
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
          <div style={{ marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}>
            <Heart 
              size={typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 80} 
              color="#f59e0b" 
              strokeWidth={1.5} 
            />
          </div>
          
          <h2 style={{
            fontSize: 'clamp(2rem, 6vw, 2.5rem)',
            marginBottom: '1rem',
            color: '#fef3c7',
            fontFamily: 'serif'
          }}>
            You are forgiven
          </h2>
          
          <p style={{
            color: '#cbd5e1',
            marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
            lineHeight: 1.6,
            fontSize: 'clamp(1rem, 3vw, 1.125rem)'
          }}>
            Your confession has been received with compassion. 
            You are free to heal and move forward.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            style={{
              padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
              background: 'linear-gradient(to right, #f59e0b, #d97706)',
              color: '#0f172a',
              border: 'none',
              borderRadius: '9999px',
              fontWeight: '600',
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
      background: 'linear-gradient(135deg, #0f172a 0%, #92400e 25%, #f59e0b 50%, #92400e 75%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* MANY MORE magical golden effects - Only render on client */}
      {isClient && (
        <div style={{ position: 'absolute', inset: 0 }}>
          {/* Enhanced golden particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              style={{
                position: 'absolute',
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: '#fbbf24',
                borderRadius: '50%',
                opacity: 0.6,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                boxShadow: '0 0 12px #fbbf24',
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}

          {/* NEW: Golden healing bubbles */}
          {bubbles.map((bubble) => (
            <motion.div
              key={`bubble-${bubble.id}`}
              style={{
                position: 'absolute',
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                backgroundColor: 'transparent',
                border: '1px solid #fbbf24',
                borderRadius: '50%',
                opacity: 0.4,
                left: `${bubble.left}%`,
                top: `${bubble.top}%`,
              }}
              animate={{
                y: [0, -140, 0],
                x: [0, Math.sin(bubble.id) * 50, 0],
                opacity: [0.2, 0.7, 0.2],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: bubble.duration,
                repeat: Infinity,
                delay: bubble.delay,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* NEW: Warm healing light rays */}
          {lightRays.map((ray) => (
            <motion.div
              key={`ray-${ray.id}`}
              style={{
                position: 'absolute',
                width: `${ray.width}px`,
                height: `${ray.height}px`,
                background: 'linear-gradient(to bottom, transparent, #fbbf24, transparent)',
                left: `${ray.left}%`,
                top: `${ray.top}%`,
                opacity: 0.3,
                borderRadius: '2px',
              }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
                scaleY: [1, 1.5, 1],
              }}
              transition={{
                duration: ray.duration,
                repeat: Infinity,
                delay: ray.delay,
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
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  padding: 'clamp(1rem, 3vw, 1.5rem)',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(217, 119, 6, 0.3))',
                  border: '1px solid rgba(245, 158, 11, 0.3)'
                }}
              >
                <Heart 
                  size={typeof window !== 'undefined' && window.innerWidth < 768 ? 48 : 64} 
                  color="#f59e0b" 
                  strokeWidth={1.5} 
                />
              </motion.div>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontFamily: 'serif',
              color: '#fef3c7',
              marginBottom: '1rem'
            }}>
              Seek Forgiveness
            </h1>
            
            <p style={{
              fontSize: 'clamp(1rem, 3.5vw, 1.25rem)',
              color: '#fed7aa',
              lineHeight: 1.6,
              maxWidth: '32rem',
              margin: '0 auto'
            }}>
              Share what needs healing in your heart. 
              Find peace through compassion and self-forgiveness.
            </p>
          </motion.div>

          {/* Confession Input */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
          >
            <div style={{ position: 'relative' }}>
              <textarea
                value={confession}
                onChange={handleConfessionChange}
                placeholder="What seeks forgiveness and healing in your heart?"
                maxLength={500}
                style={{
                  width: '100%',
                  height: 'clamp(22rem, 55vh, 28rem)',
                  padding: 'clamp(1rem, 3vw, 1.5rem)',
                  backgroundColor: 'rgba(30, 41, 59, 0.4)',
                  backdropFilter: 'blur(16px)',
                  border: '2px solid rgba(245, 158, 11, 0.2)',
                  borderRadius: '1rem',
                  color: '#fef3c7',
                  fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                  fontFamily: 'serif',
                  lineHeight: 1.6,
                  resize: 'none',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(245, 158, 11, 0.5)'
                  e.target.style.boxShadow = '0 0 0 4px rgba(245, 158, 11, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(245, 158, 11, 0.2)'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 'clamp(0.75rem, 2vw, 1rem)',
                right: 'clamp(0.75rem, 2vw, 1rem)',
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                color: '#fed7aa'
              }}>
                {confession.length}/500
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
              background: 'rgba(30, 41, 59, 0.4)',
              backdropFilter: 'blur(16px)',
              border: '2px solid rgba(245, 158, 11, 0.2)',
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
                Choose Your Offering
              </h3>
              
              <p style={{
                color: '#fed7aa',
                fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                lineHeight: 1.5
              }}>
                Your confession deserves compassionate space. Choose what feels right for this healing moment.
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(0.3rem, 1vw, 0.5rem)',
                marginBottom: '1rem'
              }}>
                <DollarSign size={typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 24} color="#f59e0b" />
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
                  placeholder="3.00"
                />
                <span style={{ color: '#fed7aa', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>USD</span>
              </div>

              <div style={{
                display: 'flex',
                gap: 'clamp(0.3rem, 1vw, 0.5rem)',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                {['1.00', '3.00', '5.00', '10.00', '25.00'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePresetAmount(preset)}
                    style={{
                      padding: 'clamp(0.4rem, 1.5vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)',
                      background: amount === preset 
                        ? 'rgba(245, 158, 11, 0.3)' 
                        : 'rgba(245, 158, 11, 0.1)',
                      border: `1px solid ${amount === preset ? '#f59e0b' : 'rgba(245, 158, 11, 0.2)'}`,
                      borderRadius: '0.5rem',
                      color: '#fed7aa',
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
                color: '#d97706',
                fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
                marginTop: '1rem',
                fontStyle: 'italic'
              }}>
                Minimum $1.00 • Your generosity supports this healing sanctuary
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
                border: '2px solid #64748b',
                color: '#cbd5e1',
                borderRadius: '9999px',
                fontWeight: '600',
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
              whileHover={{ scale: confession.trim() ? 1.05 : 1 }}
              whileTap={{ scale: confession.trim() ? 0.95 : 1 }}
              onClick={handlePayAndFindPeace}
              disabled={!confession.trim()}
              style={{
                padding: 'clamp(0.8rem, 2.5vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                borderRadius: '9999px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                minWidth: 'clamp(200px, 50vw, 220px)',
                justifyContent: 'center',
                cursor: confession.trim() ? 'pointer' : 'not-allowed',
                background: confession.trim() 
                  ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                  : '#64748b',
                color: confession.trim() ? '#0f172a' : '#94a3b8',
                border: 'none',
                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
              }}
            >
              <Send size={typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 20} />
              Share Confession for ${amount}
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
                  chamber="confession"
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
              color: '#fed7aa',
              fontSize: 'clamp(0.8rem, 2vw, 0.875rem)'
            }}
          >
            <p style={{ marginBottom: '0.5rem' }}>
              Your confession is received with compassion and understanding
            </p>
            <p>Secure anonymous sharing • Your privacy is sacred</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
