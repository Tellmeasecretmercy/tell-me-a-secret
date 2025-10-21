'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { Sparkles, ArrowLeft } from 'lucide-react'
import PayPalHostedButton from '../PayPalHostedButton'

interface WishChamberProps {
  onBack: () => void
}

export default function WishChamber({ onBack }: WishChamberProps) {
  const [wish, setWish] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Generate stable particle positions only on client
  const celebrationParticles = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() > 0.5 ? 6 : 3,
      color: ['#34d399', '#10b981', '#6ee7b7', '#a7f3d0'][Math.floor(Math.random() * 4)],
      xMovement: Math.random() > 0.5 ? 50 : -50,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 3
    }))
  }, [isClient])

  const cosmicParticles = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() > 0.7 ? 10 : 5,
      color: ['#34d399', '#6ee7b7', '#a7f3d0'][Math.floor(Math.random() * 3)],
      xMovement: Math.random() > 0.5 ? 40 : -40,
      duration: 8 + Math.random() * 4,
      delay: Math.random() * 5
    }))
  }, [isClient])

  const stars = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.8,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3
    }))
  }, [isClient])

  // Completion state
  if (isComplete) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 25%, #10b981 50%, #064e3b 75%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Cosmic Celebration Particles - Only render on client */}
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
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, particle.xMovement, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0],
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
          style={{ textAlign: 'center', maxWidth: '40rem', position: 'relative', zIndex: 10 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -360 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", duration: 1.2 }}
            style={{ marginBottom: '2.5rem' }}
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
                padding: '2rem',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(6, 78, 59, 0.3))',
                border: '2px solid rgba(16, 185, 129, 0.5)'
              }}
            >
              <Sparkles size={88} color="#10b981" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            style={{
              fontSize: '3rem',
              marginBottom: '1.5rem',
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
              marginBottom: '3rem',
              lineHeight: 1.8,
              fontSize: '1.3rem',
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
              padding: '1.2rem 3rem',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '2rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '1.1rem'
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
      
      {/* Cosmic Wish Particles - Only render on client */}
      {isClient && (
        <div style={{ position: 'absolute', inset: 0 }}>
          {cosmicParticles.map((particle) => (
            <motion.div
              key={particle.id}
              style={{
                position: 'absolute',
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                borderRadius: '50%',
                opacity: 0.6,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -80, 0],
                x: [0, particle.xMovement, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Starfield Effect - Only render on client */}
      {isClient && (
        <div style={{ position: 'absolute', inset: 0 }}>
          {stars.map((star) => (
            <motion.div
              key={`star-${star.id}`}
              style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                opacity: star.opacity,
                left: `${star.left}%`,
                top: `${star.top}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
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
          padding: '1rem'
        }}
      >
        <div style={{ maxWidth: '52rem', width: '100%' }}>
          
          {/* Chamber Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
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
                  padding: '2rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(6, 78, 59, 0.4))',
                  border: '2px solid rgba(16, 185, 129, 0.5)',
                  boxShadow: '0 0 50px rgba(16, 185, 129, 0.3)'
                }}
              >
                <Sparkles size={76} color="#10b981" strokeWidth={1.3} />
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
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontFamily: 'serif',
                color: '#ecfdf5',
                marginBottom: '1.5rem',
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
                fontSize: '1.4rem',
                color: '#a7f3d0',
                lineHeight: 1.8,
                maxWidth: '42rem',
                margin: '0 auto',
                fontWeight: 300
              }}
            >
              Cast your deepest dreams into the infinite cosmos. 
              The universe listens to every wish and conspires 
              to bring your heart&apos;s desires into reality.
            </motion.p>
          </motion.div>

          {/* Wish Input */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            style={{ marginBottom: '3rem' }}
          >
            <div style={{ position: 'relative' }}>
              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="What is your heart&apos;s deepest desire? What dreams do you wish to manifest?"
                maxLength={500}
                style={{
                  width: '100%',
                  height: '18rem',
                  padding: '2rem',
                  backgroundColor: 'rgba(6, 78, 59, 0.3)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '1.5rem',
                  color: '#ecfdf5',
                  fontSize: '1.2rem',
                  fontFamily: 'serif',
                  lineHeight: 1.8,
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
                bottom: '1.5rem',
                right: '1.5rem',
                fontSize: '0.9rem',
                color: '#a7f3d0',
                opacity: 0.8
              }}>
                {wish.length}/500
              </div>
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2rem'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              style={{
                padding: '1.3rem 2.5rem',
                backgroundColor: 'transparent',
                border: '2px solid #64748b',
                color: '#cbd5e1',
                borderRadius: '2rem',
                fontWeight: '600',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '1.05rem'
              }}
            >
              <ArrowLeft size={22} />
              Return to Doors
            </motion.button>
          </motion.div>

          {/* PayPal Hosted Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <PayPalHostedButton 
              onPaymentSuccess={() => setIsComplete(true)} 
            />
          </motion.div>

          {/* Chamber Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            style={{
              marginTop: '4rem',
              textAlign: 'center',
              color: '#a7f3d0',
              fontSize: '0.95rem'
            }}
          >
            <p style={{ marginBottom: '0.5rem', opacity: 0.9 }}>
              Your wish joins the cosmic dance of infinite possibilities
            </p>
            <p style={{ opacity: 0.7 }}>
              Secure payment processing by PayPal
            </p>
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}

