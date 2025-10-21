'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { Lock, Heart, Sparkles } from 'lucide-react'
import SecretChamber from './components/chambers/SecretChamber'
import ConfessionChamber from './components/chambers/ConfessionChamber'
import WishChamber from './components/chambers/WishChamber'

type ChamberType = 'secret' | 'confession' | 'wish' | null

export default function HomePage() {
  const [selectedChamber, setSelectedChamber] = useState<ChamberType>(null)
  const [showIntro, setShowIntro] = useState(true)
  const [showDoors, setShowDoors] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Fix hydration by only showing particles on client
  useEffect(() => {
    setIsClient(true)
    const introTimer = setTimeout(() => {
      setShowIntro(false)
      setShowDoors(true)
    }, 4000)

    return () => clearTimeout(introTimer)
  }, [])

  // Generate stable particle positions
  const particles = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() > 0.7 ? 6 : 3,
      color: Math.random() > 0.5 ? '#fbbf24' : '#a855f7',
      duration: 6 + Math.random() * 4,
      delay: Math.random() * 4,
      xMovement: Math.random() > 0.5 ? 20 : -20
    }))
  }, [isClient])

  const chambers = [
    {
      id: 'secret' as const,
      title: 'Secrets',
      subtitle: 'What burdens your soul in silence?',
      icon: Lock,
      color: '#8b5cf6',
      particleColor: '#a855f7',
      description: 'Enter the chamber of hidden truths',
      atmosphere: 'Dark and intimate, where shadows hold your deepest thoughts'
    },
    {
      id: 'confession' as const,
      title: 'Confessions',
      subtitle: 'What seeks forgiveness and healing?',
      icon: Heart,
      color: '#f59e0b',
      particleColor: '#fbbf24',
      description: 'Step into the sanctuary of redemption',
      atmosphere: 'Warm and forgiving, bathed in golden light of absolution'
    },
    {
      id: 'wish' as const,
      title: 'Wishes',
      subtitle: 'What dreams call to the universe?',
      icon: Sparkles,
      color: '#10b981',
      particleColor: '#34d399',
      description: 'Open the gateway to infinite possibilities',
      atmosphere: 'Cosmic and hopeful, where starlight carries your dreams'
    }
  ]

  // Show selected chamber
  if (selectedChamber === 'secret') {
    return <SecretChamber onBack={() => setSelectedChamber(null)} />
  }
  if (selectedChamber === 'confession') {
    return <ConfessionChamber onBack={() => setSelectedChamber(null)} />
  }
  if (selectedChamber === 'wish') {
    return <WishChamber onBack={() => setSelectedChamber(null)} />
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #581c87 50%, #1e1b4b 75%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Mystical Background Particles - Only render on client */}
      {isClient && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          {particles.map((particle) => (
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
                y: [0, -50, 0],
                x: [0, particle.xMovement, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
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

      {/* Ambient Glow Effects */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)',
        zIndex: 1
      }} />

      {/* Cinematic Intro */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#000000',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 3, ease: "easeOut" }}
              style={{ textAlign: 'center' }}
            >
              <motion.h1
                initial={{ letterSpacing: '0.5em' }}
                animate={{ letterSpacing: '0.1em' }}
                transition={{ duration: 2, delay: 0.5 }}
                style={{
                  fontSize: 'clamp(3rem, 12vw, 8rem)',
                  fontFamily: 'serif',
                  color: '#fef3c7',
                  marginBottom: '2rem',
                  fontWeight: 300
                }}
              >
                Tell Me a Secret
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1.5 }}
                style={{
                  fontSize: '1.5rem',
                  color: '#cbd5e1',
                  fontStyle: 'italic',
                  fontWeight: 300
                }}
              >
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Choose your path to liberation...
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - The Three Sacred Doors */}
      <AnimatePresence>
        {showDoors && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              padding: '2rem 1rem'
            }}
          >
            
            {/* Sacred Title */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              style={{ textAlign: 'center', marginBottom: '5rem' }}
            >
              <motion.h2
                animate={{ 
                  textShadow: [
                    '0 0 20px rgba(251, 191, 36, 0.3)',
                    '0 0 30px rgba(251, 191, 36, 0.5)',
                    '0 0 20px rgba(251, 191, 36, 0.3)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  fontFamily: 'serif',
                  color: '#fef3c7',
                  marginBottom: '1.5rem',
                  fontWeight: 300,
                  letterSpacing: '0.05em'
                }}
              >
                Three Sacred Doors
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                style={{
                  fontSize: 'clamp(1.125rem, 4vw, 1.5rem)',
                  color: '#cbd5e1',
                  maxWidth: '42rem',
                  margin: '0 auto',
                  lineHeight: 1.8,
                  fontWeight: 300
                }}
              >
                Each door leads to a different ritual of release. 
                Choose the path that calls to your soul, and find liberation 
                in the sacred act of letting go.
              </motion.p>
            </motion.div>

            {/* The Three Mystical Doors */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              maxWidth: '90rem',
              width: '100%'
            }}>
              {chambers.map((chamber, index) => {
                const IconComponent = chamber.icon
                return (
                  <motion.div
                    key={chamber.id}
                    initial={{ opacity: 0, y: 100, rotateX: -15 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 1 + index * 0.4,
                      type: "spring",
                      stiffness: 80
                    }}
                    whileHover={{ 
                      scale: 1.03, 
                      y: -15,
                      rotateY: 2,
                      transition: { duration: 0.4 }
                    }}
                    style={{
                      position: 'relative',
                      padding: '2.5rem',
                      borderRadius: '2rem',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(251, 191, 36, 0.15)',
                      background: `linear-gradient(135deg, 
                        rgba(30, 41, 59, 0.4) 0%, 
                        rgba(30, 41, 59, 0.2) 50%, 
                        rgba(30, 41, 59, 0.4) 100%)`,
                      cursor: 'pointer',
                      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      transformStyle: 'preserve-3d',
                      perspective: '1000px'
                    }}
                    onClick={() => {
                      console.log(`Clicking ${chamber.id}`) // Debug log
                      setSelectedChamber(chamber.id)
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${chamber.color}40`
                      e.currentTarget.style.boxShadow = `0 25px 50px -12px ${chamber.color}30, 0 0 0 1px ${chamber.color}20`
                      e.currentTarget.style.background = `linear-gradient(135deg, 
                        rgba(30, 41, 59, 0.6) 0%, 
                        ${chamber.color}10 50%, 
                        rgba(30, 41, 59, 0.6) 100%)`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.15)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.background = `linear-gradient(135deg, 
                        rgba(30, 41, 59, 0.4) 0%, 
                        rgba(30, 41, 59, 0.2) 50%, 
                        rgba(30, 41, 59, 0.4) 100%)`
                    }}
                  >
                    {/* Door Content */}
                    <div style={{ position: 'relative', textAlign: 'center' }}>
                      
                      {/* Sacred Icon */}
                      <motion.div 
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'center', 
                          marginBottom: '2rem' 
                        }}
                        whileHover={{ 
                          scale: 1.15, 
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.6 }
                        }}
                      >
                        <motion.div
                          animate={{
                            boxShadow: [
                              `0 0 20px ${chamber.color}30`,
                              `0 0 40px ${chamber.color}50`,
                              `0 0 20px ${chamber.color}30`
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          style={{
                            padding: '1.5rem',
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${chamber.color}20, ${chamber.color}40)`,
                            border: `2px solid ${chamber.color}30`,
                            backdropFilter: 'blur(10px)'
                          }}
                        >
                          <IconComponent 
                            size={56} 
                            color={chamber.color}
                            strokeWidth={1.2}
                          />
                        </motion.div>
                      </motion.div>

                      {/* Chamber Title */}
                      <motion.h3
                        whileHover={{ scale: 1.05 }}
                        style={{
                          fontSize: '2.25rem',
                          fontFamily: 'serif',
                          marginBottom: '1rem',
                          color: '#fef3c7',
                          fontWeight: 300,
                          letterSpacing: '0.02em'
                        }}
                      >
                        {chamber.title}
                      </motion.h3>

                      {/* Sacred Question */}
                      <p style={{
                        color: '#e2e8f0',
                        marginBottom: '1.5rem',
                        lineHeight: 1.7,
                        fontStyle: 'italic',
                        fontSize: '1.125rem',
                        fontWeight: 300
                      }}>
                        {chamber.subtitle}
                      </p>

                      {/* Mystical Description */}
                      <p style={{
                        fontSize: '0.95rem',
                        color: '#94a3b8',
                        marginBottom: '1rem',
                        lineHeight: 1.6
                      }}>
                        {chamber.description}
                      </p>

                      {/* Atmosphere Description */}
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#64748b',
                        marginBottom: '2rem',
                        lineHeight: 1.5,
                        fontStyle: 'italic'
                      }}>
                        {chamber.atmosphere}
                      </p>

                      {/* Enter Sacred Space Button */}
                      <motion.div
                        whileHover={{ 
                          scale: 1.08,
                          boxShadow: `0 10px 30px ${chamber.color}40`
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          display: 'inline-block',
                          padding: '1rem 2.5rem',
                          background: `linear-gradient(135deg, ${chamber.color}, ${chamber.color}dd)`,
                          color: chamber.color === '#f59e0b' ? '#0f172a' : '#ffffff',
                          fontWeight: '500',
                          borderRadius: '2rem',
                          transition: 'all 0.4s ease',
                          cursor: 'pointer',
                          border: `1px solid ${chamber.color}50`,
                          fontSize: '1rem',
                          letterSpacing: '0.02em'
                        }}
                      >
                        Enter Sacred Chamber
                      </motion.div>
                    </div>

                    {/* Floating Particles for Each Door - Only render on client */}
                    {isClient && (
                      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                        {Array.from({ length: 8 }, (_, i) => (
                          <motion.div
                            key={i}
                            style={{
                              position: 'absolute',
                              width: '3px',
                              height: '3px',
                              backgroundColor: chamber.particleColor,
                              borderRadius: '50%',
                              opacity: 0.4,
                              left: `${20 + (i * 7.5)}%`,
                              top: `${20 + (i * 7.5)}%`,
                            }}
                            animate={{
                              y: [0, -20, 0],
                              opacity: [0.2, 0.8, 0.2],
                              scale: [1, 1.3, 1],
                            }}
                            transition={{
                              duration: 4 + (i * 0.3),
                              repeat: Infinity,
                              delay: i * 0.5,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Sacred Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 2.5 }}
              style={{
                marginTop: '5rem',
                textAlign: 'center',
                color: '#64748b'
              }}
            >
              <motion.p
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ 
                  fontSize: '0.95rem',
                  fontStyle: 'italic',
                  letterSpacing: '0.02em'
                }}
              >
                Your words are sacred. All submissions are encrypted and anonymous.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
