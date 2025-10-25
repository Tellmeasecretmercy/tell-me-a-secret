'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { Sparkles, ArrowLeft, Send, DollarSign } from 'lucide-react'
import BuyMeCoffeeButton from '../BuyMeCoffeeButton'
import { trackChamberEntry, trackContentStart, trackAmountSelection, trackPaymentInitiated } from '../../lib/analytics'

interface WishChamberProps {
  onBack: () => void
}

export default function WishChamber({ onBack }: WishChamberProps) {
  const [wish, setWish] = useState('')
  const [amount, setAmount] = useState('2.00')
  const [showPaymentButton, setShowPaymentButton] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [hasStartedTyping, setHasStartedTyping] = useState(false)

  useEffect(() => {
    setIsClient(true)
    trackChamberEntry('wish')
  }, [])

  // MASSIVE celebration particles for completion!
  const celebrationParticles = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 150 }, (_, i) => ({ // INCREASED from 70 to 150!
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() > 0.5 ? 8 : 4, // Bigger particles
      color: ['#34d399', '#10b981', '#6ee7b7', '#a7f3d0'][Math.floor(Math.random() * 4)],
      xMovement: Math.random() > 0.5 ? 70 : -70, // More movement
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 3
    }))
  }, [isClient])

  // MORE cosmic particles!
  const cosmicParticles = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 80 }, (_, i) => ({ // INCREASED from 45 to 80!
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() > 0.7 ? 14 : 7, // Bigger cosmic particles
      color: ['#34d399', '#6ee7b7', '#a7f3d0'][Math.floor(Math.random() * 3)],
      xMovement: Math.random() > 0.5 ? 60 : -60, // More movement
      duration: 8 + Math.random() * 4,
      delay: Math.random() * 5
    }))
  }, [isClient])

  // TONS more stars!
  const stars = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 250 }, (_, i) => ({ // INCREASED from 120 to 250!
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.9,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
      size: Math.random() > 0.8 ? 4 : 2 // Some bigger stars
    }))
  }, [isClient])

  // NEW: Shooting stars!
  const shootingStars = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 15 }, (_, i) => ({ // Shooting stars!
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 10
    }))
  }, [isClient])

  // NEW: Cosmic energy waves!
  const energyWaves = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 20 }, (_, i) => ({ // Energy waves!
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 50 + Math.random() * 100,
      duration: 6 + Math.random() * 4,
      delay: Math.random() * 8
    }))
  }, [isClient])

  const handleWishChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setWish(newValue)
    
    if (newValue.length === 1 && !hasStartedTyping) {
      trackContentStart('wish')
      setHasStartedTyping(true)
    }
  }

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '')
    const numValue = parseFloat(numericValue) || 1.00
    if (numValue < 1.00) {
      setAmount('1.00')
      trackAmountSelection('1.00', 'wish')
    } else {
      const newAmount = numValue.toFixed(2)
      setAmount(newAmount)
      trackAmountSelection(newAmount, 'wish')
    }
  }

  const handlePresetAmount = (preset: string) => {
    setAmount(preset)
    trackAmountSelection(preset, 'wish')
  }

  const handleCastWish = () => {
    if (!wish.trim()) return
    trackPaymentInitiated(amount, 'wish')
    setShowPaymentButton(true)
  }

  // Completion state with COSMIC celebration
  if (isComplete) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 25%, #10b981 50%, #064e3b 75%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 4vw, 2rem)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* MASSIVE Cosmic Celebration Particles */}
        {isClient && (
          <div style={{ position: 'absolute', inset: 0 }}>
            {celebrationParticles.map((particle) => (
              <motion.div
                key={particle.id}
                style={{
                  position: 'absolute',
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: particle.color,
                  borderRadius: '50%',
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  boxShadow: `0 0 15px ${particle.color}`,
                }}
                animate={{
                  y: [0, -150, 0],
                  x: [0, particle.xMovement, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 3, 0],
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          style={{ 
            textAlign: 'center', 
            maxWidth: 'clamp(20rem, 80vw, 40rem)', 
            position: 'relative', 
            zIndex: 10 
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -360 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", duration: 1.2 }}
            style={{ marginBottom: 'clamp(2rem, 5vw, 2.5rem)' }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                boxShadow: [
                  '0 0 40px rgba(16, 185, 129, 0.4)',
                  '0 0 80px rgba(16, 185, 129, 0.6)',
                  '0 0 40px rgba(16, 185, 129, 0.4)'
                ]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 2, repeat: Infinity }
              }}
              style={{
                display: 'inline-block',
                padding: 'clamp(1.5rem, 4vw, 2rem)',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(6, 78, 59, 0.3))',
                border: '2px solid rgba(16, 185, 129, 0.5)'
              }}
            >
              <Sparkles 
                size={typeof window !== 'undefined' && window.innerWidth < 768 ? 64 : 88} 
                color="#10b981" 
                strokeWidth={1.5} 
              />
            </motion.div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            style={{
              fontSize: 'clamp(2rem, 7vw, 3rem)',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
              color: '#ecfdf5',
              fontFamily: 'serif',
              fontWeight: 300
            }}
          >
            Your wish travels to the stars
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            style={{
              color: '#a7f3d0',
              marginBottom: 'clamp(2rem, 6vw, 3rem)',
              lineHeight: 1.6,
              fontSize: 'clamp(1rem, 3.5vw, 1.3rem)',
              fontWeight: 300
            }}
          >
            Your dream has been cast into the infinite cosmos. 
            The universe has received your wish and conspires 
            to make it reality. Trust in the magic of possibility.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 15px 40px rgba(16, 185, 129, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            style={{
              padding: 'clamp(1rem, 3vw, 1.2rem) clamp(2rem, 6vw, 3rem)',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '2rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)'
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
      background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 25%, #10b981 50%, #064e3b 75%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* COSMIC EXPLOSION of particles - Only render on client */}
      {isClient && (
        <div style={{ position: 'absolute', inset: 0 }}>
          {/* Enhanced cosmic particles */}
          {cosmicParticles.map((particle) => (
            <motion.div
              key={particle.id}
              style={{
                position: 'absolute',
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                borderRadius: '50%',
                opacity: 0.7,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                boxShadow: `0 0 20px ${particle.color}`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, particle.xMovement, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 2.5, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* TONS of twinkling stars */}
          {stars.map((star) => (
            <motion.div
              key={`star-${star.id}`}
              style={{
                position: 'absolute',
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                opacity: star.opacity,
                left: `${star.left}%`,
                top: `${star.top}%`,
                boxShadow: '0 0 8px #ffffff',
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

          {/* NEW: Shooting stars */}
          {shootingStars.map((star) => (
            <motion.div
              key={`shooting-${star.id}`}
              style={{
                position: 'absolute',
                width: '3px',
                height: '3px',
                backgroundColor: '#10b981',
                borderRadius: '50%',
                left: `${star.left}%`,
                top: `${star.top}%`,
                boxShadow: '0 0 15px #10b981',
              }}
              animate={{
                x: [0, 200],
                y: [0, 100],
                opacity: [0, 1, 0],
                scale: [1, 3, 0],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeOut"
              }}
            />
          ))}

          {/* NEW: Cosmic energy waves */}
          {energyWaves.map((wave) => (
            <motion.div
              key={`wave-${wave.id}`}
              style={{
                position: 'absolute',
                width: `${wave.size}px`,
                height: `${wave.size}px`,
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '50%',
                left: `${wave.left}%`,
                top: `${wave.top}%`,
              }}
              animate={{
                scale: [0, 2, 0],
                opacity: [0.5, 0.1, 0],
              }}
              transition={{
                duration: wave.duration,
                repeat: Infinity,
                delay: wave.delay,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Cosmic Glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
        zIndex: 1
      }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
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
        <div style={{ maxWidth: 'clamp(20rem, 90vw, 52rem)', width: '100%' }}>
          
          {/* Chamber Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 8vw, 4rem)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}>
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                  padding: 'clamp(1.5rem, 4vw, 2rem)',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(6, 78, 59, 0.4))',
                  border: '2px solid rgba(16, 185, 129, 0.5)',
                  boxShadow: '0 0 50px rgba(16, 185, 129, 0.3)'
                }}
              >
                <Sparkles 
                  size={typeof window !== 'undefined' && window.innerWidth < 768 ? 56 : 76} 
                  color="#10b981" 
                  strokeWidth={1.3} 
                />
              </motion.div>
            </div>
            
            <motion.h1
              animate={{
                textShadow: [
                  '0 0 20px rgba(16, 185, 129, 0.4)',
                  '0 0 50px rgba(16, 185, 129, 0.6)',
                  '0 0 20px rgba(16, 185, 129, 0.4)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                fontFamily: 'serif',
                color: '#ecfdf5',
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                fontWeight: 300,
                letterSpacing: '0.02em'
              }}
            >
              Cosmic Wishing Well
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                fontSize: 'clamp(1rem, 3.5vw, 1.4rem)',
                color: '#a7f3d0',
                lineHeight: 1.6,
                maxWidth: '42rem',
                margin: '0 auto',
                fontWeight: 300
              }}
            >
              Cast your deepest dreams into the infinite cosmos. 
              The universe listens to every wish and conspires 
              to bring your heart's desires into reality.
            </motion.p>
          </motion.div>

          {/* Wish Input */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            style={{ marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
          >
            <div style={{ position: 'relative' }}>
              <textarea
                value={wish}
                onChange={handleWishChange}
                placeholder="What is your heart's deepest desire? What dreams do you wish to manifest?"
                maxLength={500}
                style={{
                  width: '100%',
                  height: 'clamp(22rem, 55vh, 28rem)',
                  padding: 'clamp(1.5rem, 4vw, 2rem)',
                  backgroundColor: 'rgba(6, 78, 59, 0.3)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: 'clamp(1rem, 3vw, 1.5rem)',
                  color: '#ecfdf5',
                  fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                  fontFamily: 'serif',
                  lineHeight: 1.6,
                  resize: 'none',
                  outline: 'none',
                  transition: 'all 0.4s ease',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(16, 185, 129, 0.7)'
                  e.target.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.2), 0 10px 40px rgba(0, 0, 0, 0.3)'
                  e.target.style.backgroundColor = 'rgba(6, 78, 59, 0.5)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(16, 185, 129, 0.3)'
                  e.target.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)'
                  e.target.style.backgroundColor = 'rgba(6, 78, 59, 0.3)'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 'clamp(1rem, 3vw, 1.5rem)',
                right: 'clamp(1rem, 3vw, 1.5rem)',
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                color: '#a7f3d0',
                opacity: 0.8
              }}>
                {wish.length}/500
              </div>
            </div>
          </motion.div>

          {/* Amount Selection */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            style={{ marginBottom: 'clamp(2rem, 6vw, 3rem)' }}
          >
            <div style={{
              background: 'rgba(6, 78, 59, 0.3)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'clamp(1rem, 3vw, 1.5rem)',
              padding: 'clamp(1rem, 3vw, 1.5rem)',
              textAlign: 'center'
            }}>
              <h3 style={{
                color: '#ecfdf5',
                fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
                marginBottom: '1rem',
                fontFamily: 'serif'
              }}>
                Invest in Your Dreams
              </h3>
              
              <p style={{
                color: '#a7f3d0',
                fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                lineHeight: 1.5
              }}>
                Your wish deserves cosmic energy. Choose what feels right for manifesting your dreams.
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(0.3rem, 1vw, 0.5rem)',
                marginBottom: '1rem'
              }}>
                <DollarSign size={typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 24} color="#10b981" />
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    fontWeight: 'bold',
                    color: '#ecfdf5',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    textAlign: 'center',
                    width: 'clamp(100px, 25vw, 120px)',
                    fontFamily: 'monospace'
                  }}
                  placeholder="2.00"
                />
                <span style={{ color: '#a7f3d0', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>USD</span>
              </div>

              <div style={{
                display: 'flex',
                gap: 'clamp(0.3rem, 1vw, 0.5rem)',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                {['1.00', '2.00', '5.00', '10.00', '20.00'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePresetAmount(preset)}
                    style={{
                      padding: 'clamp(0.4rem, 1.5vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)',
                      background: amount === preset 
                        ? 'rgba(16, 185, 129, 0.3)' 
                        : 'rgba(16, 185, 129, 0.1)',
                      border: `1px solid ${amount === preset ? '#10b981' : 'rgba(16, 185, 129, 0.2)'}`,
                      borderRadius: '0.5rem',
                      color: '#a7f3d0',
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
                color: '#059669',
                fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
                marginTop: '1rem',
                fontStyle: 'italic'
              }}>
                Minimum $1.00 • Your investment in dreams supports this cosmic space
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            style={{
              display: 'flex',
              gap: 'clamp(1rem, 4vw, 2rem)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              style={{
                padding: 'clamp(1rem, 3vw, 1.3rem) clamp(2rem, 5vw, 2.5rem)',
                backgroundColor: 'transparent',
                border: '2px solid #64748b',
                color: '#cbd5e1',
                borderRadius: '2rem',
                fontWeight: '600',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.5rem, 2vw, 0.75rem)',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)'
              }}
            >
              <ArrowLeft size={typeof window !== 'undefined' && window.innerWidth < 768 ? 18 : 22} />
              Return to Doors
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: wish.trim() ? 1.05 : 1,
                boxShadow: wish.trim() ? '0 15px 40px rgba(16, 185, 129, 0.4)' : 'none'
              }}
              whileTap={{ scale: wish.trim() ? 0.95 : 1 }}
              onClick={handleCastWish}
              disabled={!wish.trim()}
              style={{
                padding: 'clamp(1rem, 3vw, 1.3rem) clamp(2.5rem, 6vw, 3rem)',
                borderRadius: '2rem',
                fontWeight: '600',
                transition: 'all 0.4s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.5rem, 2vw, 0.75rem)',
                minWidth: 'clamp(220px, 55vw, 260px)',
                justifyContent: 'center',
                cursor: wish.trim() ? 'pointer' : 'not-allowed',
                background: wish.trim() 
                  ? 'linear-gradient(135deg, #10b981, #059669)'
                  : '#64748b',
                color: wish.trim() ? '#ffffff' : '#94a3b8',
                border: 'none',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)'
              }}
            >
              <Send size={typeof window !== 'undefined' && window.innerWidth < 768 ? 18 : 22} />
              Cast Wish for ${amount}
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
                  chamber="wish"
                  onPaymentSuccess={() => setIsComplete(true)} 
                />
              </motion.div>
            )}
          </motion.div>

          {/* Chamber Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            style={{
              marginTop: 'clamp(3rem, 8vw, 4rem)',
              textAlign: 'center',
              color: '#a7f3d0',
              fontSize: 'clamp(0.8rem, 2vw, 0.95rem)'
            }}
          >
            <p style={{ marginBottom: '0.5rem', opacity: 0.9 }}>
              Your wish joins the cosmic dance of infinite possibilities
            </p>
            <p style={{ opacity: 0.7 }}>
              Secure anonymous wishing • Dreams protected by the universe
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
