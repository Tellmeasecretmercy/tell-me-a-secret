'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Lock, Heart, Sparkles } from 'lucide-react'
import SecretChamber from './components/chambers/SecretChamber'

type ChamberType = 'secret' | 'confession' | 'wish' | null

export default function HomePage() {
  const [selectedChamber, setSelectedChamber] = useState<ChamberType>(null)
  const [showIntro, setShowIntro] = useState(true)
  const [showDoors, setShowDoors] = useState(false)

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setShowIntro(false)
      setShowDoors(true)
    }, 3500)

    return () => clearTimeout(introTimer)
  }, [])

  const doors = [
    {
      id: 'secret' as const,
      title: 'Share a Secret',
      subtitle: 'What would you like to release?',
      icon: Lock,
      color: '#8b5cf6',
      doorColor: '#6366f1',
      description: 'A safe space to let go of what weighs on your mind',
      benefit: 'Find relief through anonymous sharing'
    },
    {
      id: 'confession' as const,
      title: 'Seek Forgiveness',
      subtitle: 'What needs healing in your heart?',
      icon: Heart,
      color: '#f59e0b',
      doorColor: '#f97316',
      description: 'A compassionate space for self-forgiveness and growth',
      benefit: 'Experience emotional healing and peace'
    },
    {
      id: 'wish' as const,
      title: 'Make a Wish',
      subtitle: 'What hopes do you carry?',
      icon: Sparkles,
      color: '#10b981',
      doorColor: '#059669',
      description: 'A hopeful space to express your dreams and aspirations',
      benefit: 'Connect with your deepest desires and goals'
    }
  ]

  if (selectedChamber === 'secret') {
    return <SecretChamber onBack={() => setSelectedChamber(null)} />
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #581c87 50%, #1e1b4b 75%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Gentle Background Particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              backgroundColor: '#fbbf24',
              borderRadius: '50%',
              opacity: 0.4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Intro Animation */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              style={{ textAlign: 'center' }}
            >
              <motion.h1
                initial={{ letterSpacing: '0.3em' }}
                animate={{ letterSpacing: '0.1em' }}
                transition={{ duration: 2 }}
                style={{
                  fontSize: 'clamp(3rem, 10vw, 7rem)',
                  fontFamily: 'serif',
                  color: '#fef3c7',
                  marginBottom: '2rem',
                  fontWeight: 300
                }}
              >
                Tell Me a Secret
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                style={{
                  fontSize: '1.25rem',
                  color: '#cbd5e1',
                  fontWeight: 300
                }}
              >
                A safe space for your thoughts
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Three Wellness Doors */}
      <AnimatePresence>
        {showDoors && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
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
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
              <h2 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontFamily: 'serif',
                color: '#fef3c7',
                marginBottom: '1rem',
                fontWeight: 300
              }}>
                Choose Your Space
              </h2>
              
              <p style={{
                fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
                color: '#cbd5e1',
                maxWidth: '36rem',
                margin: '0 auto',
                lineHeight: 1.6,
                fontWeight: 300
              }}>
                Three supportive spaces designed for your emotional wellbeing. 
                Each offers a different path to healing and growth.
              </p>
            </motion.div>

            {/* The Three Actual Doors */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '4rem',
              maxWidth: '80rem',
              width: '100%'
            }}>
              {doors.map((door, index) => {
                const IconComponent = door.icon
                return (
                  <motion.div
                    key={door.id}
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 1, 
                      delay: 0.6 + index * 0.3,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                    style={{
                      position: 'relative',
                      cursor: 'pointer',
                      perspective: '1000px'
                    }}
                    onClick={() => setSelectedChamber(door.id)}
                  >
                    {/* Actual Door Structure */}
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '400px',
                      transformStyle: 'preserve-3d'
                    }}>
                      
                      {/* Door Frame */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(145deg, #374151, #1f2937)',
                        borderRadius: '1rem',
                        padding: '8px',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                      }}>
                        
                        {/* Door Panel */}
                        <motion.div
                          whileHover={{
                            boxShadow: `0 0 30px ${door.color}40`,
                            borderColor: `${door.color}60`
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            background: `linear-gradient(145deg, ${door.doorColor}20, ${door.doorColor}10)`,
                            borderRadius: '0.75rem',
                            border: `2px solid ${door.color}30`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            transition: 'all 0.4s ease',
                            backdropFilter: 'blur(10px)'
                          }}
                        >
                          
                          {/* Door Handle Area */}
                          <div style={{
                            position: 'absolute',
                            right: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '12px',
                            height: '40px',
                            background: 'linear-gradient(145deg, #d1d5db, #9ca3af)',
                            borderRadius: '6px',
                            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
                          }} />
                          
                          {/* Door Icon */}
                          <motion.div
                            animate={{
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            style={{
                              marginBottom: '1.5rem',
                              padding: '1rem',
                              borderRadius: '50%',
                              background: `linear-gradient(135deg, ${door.color}30, ${door.color}50)`,
                              border: `1px solid ${door.color}40`
                            }}
                          >
                            <IconComponent 
                              size={40} 
                              color={door.color}
                              strokeWidth={1.5}
                            />
                          </motion.div>
                          
                          {/* Door Title */}
                          <h3 style={{
                            fontSize: '1.75rem',
                            fontFamily: 'serif',
                            color: '#fef3c7',
                            marginBottom: '0.5rem',
                            textAlign: 'center',
                            fontWeight: 400
                          }}>
                            {door.title}
                          </h3>
                          
                          {/* Door Subtitle */}
                          <p style={{
                            color: '#e2e8f0',
                            fontSize: '1rem',
                            textAlign: 'center',
                            marginBottom: '1rem',
                            fontStyle: 'italic'
                          }}>
                            {door.subtitle}
                          </p>
                          
                          {/* Description */}
                          <p style={{
                            color: '#cbd5e1',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            lineHeight: 1.5,
                            marginBottom: '1rem'
                          }}>
                            {door.description}
                          </p>
                          
                          {/* Benefit */}
                          <p style={{
                            color: door.color,
                            fontSize: '0.85rem',
                            textAlign: 'center',
                            fontWeight: '500'
                          }}>
                            {door.benefit}
                          </p>
                        </motion.div>
                      </div>
                      
                      {/* Door Shadow */}
                      <div style={{
                        position: 'absolute',
                        bottom: '-20px',
                        left: '10px',
                        right: '10px',
                        height: '20px',
                        background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.3) 0%, transparent 70%)',
                        borderRadius: '50%',
                        filter: 'blur(10px)'
                      }} />
                    </div>
                    
                    {/* Door Name Plate */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + index * 0.3 }}
                      style={{
                        position: 'absolute',
                        bottom: '-60px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '0.5rem 1.5rem',
                        background: 'rgba(30, 41, 59, 0.8)',
                        borderRadius: '1rem',
                        border: `1px solid ${door.color}30`,
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <p style={{
                        color: '#fef3c7',
                        fontSize: '0.9rem',
                        margin: 0,
                        fontWeight: '500'
                      }}>
                        Enter Here
                      </p>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              style={{
                marginTop: '6rem',
                textAlign: 'center',
                color: '#94a3b8'
              }}
            >
              <p style={{ 
                fontSize: '0.9rem',
                fontWeight: 300
              }}>
                Your privacy is protected. All submissions are anonymous and secure.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
