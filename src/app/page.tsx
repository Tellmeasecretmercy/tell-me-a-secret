'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Lock, Heart, Sparkles } from 'lucide-react'
import SecretRitual from './components/rituals/SecretRitual'

type RitualType = 'secret' | 'confession' | 'wish' | null

export default function HomePage() {
  const [selectedRitual, setSelectedRitual] = useState<RitualType>(null)

  const rituals = [
    {
      id: 'secret' as const,
      title: 'Tell Me a Secret',
      description: 'Release what weighs on your soul',
      price: '$1',
      icon: Lock,
      color: '#8b5cf6'
    },
    {
      id: 'confession' as const,
      title: 'Confession',
      description: 'Seek forgiveness and healing',
      price: 'Name your price',
      icon: Heart,
      color: '#f59e0b'
    },
    {
      id: 'wish' as const,
      title: 'Wishing Well',
      description: 'Cast your hopes into the universe',
      price: 'Name your price',
      icon: Sparkles,
      color: '#10b981'
    }
  ]

  // Show ritual page if one is selected
  if (selectedRitual === 'secret') {
    return (
      <div style={{
        background: 'linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)',
        minHeight: '100vh'
      }}>
        <SecretRitual onBack={() => setSelectedRitual(null)} />
      </div>
    )
  }

  // Show main landing page
  return (
    <div style={{
      background: 'linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Animated background particles */}
      <div style={{position: 'absolute', inset: 0}}>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              backgroundColor: '#fbbf24',
              borderRadius: '50%',
              opacity: 0.6,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '1rem'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{textAlign: 'center', marginBottom: '4rem'}}
        >
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            color: '#fef3c7',
            marginBottom: '1.5rem',
            fontFamily: 'serif'
          }}>
            Tell Me a Secret
          </h1>
          <p style={{
            fontSize: 'clamp(1.125rem, 4vw, 1.5rem)',
            color: '#cbd5e1',
            maxWidth: '42rem',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            A sacred digital space for your deepest thoughts, 
            confessions, and wishes
          </p>
        </motion.div>

        {/* Ritual Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: '72rem',
          width: '100%'
        }}>
          {rituals.map((ritual, index) => {
            const IconComponent = ritual.icon
            return (
              <motion.div
                key={ritual.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                style={{
                  position: 'relative',
                  padding: '2rem',
                  borderRadius: '1rem',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(251, 191, 36, 0.1)',
                  backgroundColor: 'rgba(30, 41, 59, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setSelectedRitual(ritual.id)}
              >
                <div style={{textAlign: 'center'}}>
                  <motion.div 
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '1.5rem'
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent 
                      size={64} 
                      color={ritual.color}
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    marginBottom: '0.75rem',
                    color: '#fef3c7',
                    fontFamily: 'serif'
                  }}>
                    {ritual.title}
                  </h3>
                  <p style={{
                    color: '#cbd5e1',
                    marginBottom: '1rem',
                    lineHeight: 1.6
                  }}>
                    {ritual.description}
                  </p>
                  <div style={{
                    color: '#fbbf24',
                    fontWeight: '600',
                    fontSize: '1.125rem'
                  }}>
                    {ritual.price}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          style={{marginTop: '4rem', textAlign: 'center', color: '#94a3b8'}}
        >
          <p style={{fontSize: '0.875rem'}}>
            Your secrets are safe. All submissions are encrypted and anonymous.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
