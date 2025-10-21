'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Heart, ArrowLeft, Send } from 'lucide-react'

interface ConfessionChamberProps {
  onBack: () => void
}

export default function ConfessionChamber({ onBack }: ConfessionChamberProps) {
  const [confession, setConfession] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleSubmit = async () => {
    if (!confession.trim()) return
    
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)
    }, 2000)
  }

  if (isComplete) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #92400e 25%, #f59e0b 50%, #92400e 75%, #0f172a 100%)',
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
          <div style={{ marginBottom: '2rem' }}>
            <Heart size={80} color="#f59e0b" strokeWidth={1.5} />
          </div>
          
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#fef3c7',
            fontFamily: 'serif'
          }}>
            You are forgiven
          </h2>
          
          <p style={{
            color: '#cbd5e1',
            marginBottom: '2rem',
            lineHeight: 1.6,
            fontSize: '1.125rem'
          }}>
            Your confession has been received with compassion. 
            You are free to heal and move forward.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            style={{
              padding: '0.75rem 2rem',
              background: 'linear-gradient(to right, #f59e0b, #d97706)',
              color: '#0f172a',
              border: 'none',
              borderRadius: '9999px',
              fontWeight: '600',
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
      background: 'linear-gradient(135deg, #0f172a 0%, #92400e 25%, #f59e0b 50%, #92400e 75%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Golden particles */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '6px',
              height: '6px',
              backgroundColor: '#fbbf24',
              borderRadius: '50%',
              opacity: 0.5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
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
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  padding: '1.5rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(217, 119, 6, 0.3))',
                  border: '1px solid rgba(245, 158, 11, 0.3)'
                }}
              >
                <Heart size={64} color="#f59e0b" strokeWidth={1.5} />
              </motion.div>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontFamily: 'serif',
              color: '#fef3c7',
              marginBottom: '1rem'
            }}>
              Seek Forgiveness
            </h1>
            
            <p style={{
              fontSize: '1.25rem',
              color: '#fed7aa',
              lineHeight: 1.6,
              maxWidth: '32rem',
              margin: '0 auto'
            }}>
              Share what needs healing in your heart. 
              Find peace through compassion and self-forgiveness.
            </p>
          </motion.div>

          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ marginBottom: '2rem' }}
          >
            <textarea
              value={confession}
              onChange={(e) => setConfession(e.target.value)}
              placeholder="What seeks forgiveness and healing in your heart?"
              maxLength={500}
              style={{
                width: '100%',
                height: '16rem',
                padding: '1.5rem',
                backgroundColor: 'rgba(30, 41, 59, 0.4)',
                backdropFilter: 'blur(16px)',
                border: '2px solid rgba(245, 158, 11, 0.2)',
                borderRadius: '1rem',
                color: '#fef3c7',
                fontSize: '1.125rem',
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
              textAlign: 'right',
              fontSize: '0.875rem',
              color: '#fed7aa',
              marginTop: '0.5rem'
            }}>
              {confession.length}/5000
            </div>
          </motion.div>

          {/* Buttons */}
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
                border: '2px solid #64748b',
                color: '#cbd5e1',
                borderRadius: '9999px',
                fontWeight: '600',
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
              whileHover={{ 
                scale: confession.trim() && !isSubmitting ? 1.05 : 1
              }}
              whileTap={{ scale: confession.trim() && !isSubmitting ? 0.95 : 1 }}
              onClick={handleSubmit}
              disabled={!confession.trim() || isSubmitting}
              style={{
                padding: '1rem 2rem',
                borderRadius: '9999px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                minWidth: '180px',
                justifyContent: 'center',
                cursor: confession.trim() && !isSubmitting ? 'pointer' : 'not-allowed',
                background: confession.trim() && !isSubmitting 
                  ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                  : '#64748b',
                color: confession.trim() && !isSubmitting ? '#0f172a' : '#94a3b8',
                border: 'none'
              }}
            >
              {isSubmitting ? (
                'Finding Peace...'
              ) : (
                <>
                  <Send size={20} />
                  Find Peace
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
              color: '#fed7aa',
              fontSize: '0.875rem'
            }}
          >
            <p style={{ marginBottom: '0.5rem' }}>
              Your confession is received with compassion and understanding
            </p>
            <p>This is a judgment-free space for healing</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
