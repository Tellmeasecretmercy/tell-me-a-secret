'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Lock, ArrowLeft, Send } from 'lucide-react'

interface SecretChamberProps {
  onBack: () => void
}

export default function SecretChamber({ onBack }: SecretChamberProps) {
  const [secret, setSecret] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleSubmit = async () => {
    if (!secret.trim()) return
    
    setIsSubmitting(true)
    
    // Simulate the submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)
    }, 2000)
  }

  // Completion state
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
            Your secret has been safely shared
          </h2>
          
          <p style={{
            color: '#cbd5e1',
            marginBottom: '2rem',
            lineHeight: 1.6,
            fontSize: '1.125rem'
          }}>
            Thank you for trusting this space with your thoughts. 
            Sometimes sharing what we carry can bring relief and healing.
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
            Return to Wellness Doors
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
      
      {/* Gentle Particles */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '6px',
              height: '6px',
              backgroundColor: '#a855f7',
              borderRadius: '50%',
              opacity: 0.3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

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
              This is a safe, anonymous space to release what's been weighing on your mind. 
              Sometimes sharing our burdens can bring unexpected relief.
            </p>
          </motion.div>

          {/* Input Area */}
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
                {secret.length}/5000
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
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
                minWidth: '180px',
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
                'Sharing Safely...'
              ) : (
                <>
                  <Send size={20} />
                  Share Anonymously
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
              Your submission is completely anonymous and secure
            </p>
            <p>This space is designed to support your emotional wellbeing</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
