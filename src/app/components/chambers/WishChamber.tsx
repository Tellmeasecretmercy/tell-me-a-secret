'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Sparkles, ArrowLeft, Send } from 'lucide-react'

interface WishChamberProps {
  onBack: () => void
}

export default function WishChamber({ onBack }: WishChamberProps) {
  const [wish, setWish] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleSubmit = async () => {
    if (!wish.trim()) return
    
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
        background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 25%, #10b981 50%, #064e3b 75%, #0f172a 100%)',
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
          <Sparkles size={80} color="#10b981" strokeWidth={1.5} />
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#ecfdf5',
            fontFamily: 'serif'
          }}>
            Your wish travels to the stars
          </h2>
          <p style={{
            color: '#a7f3d0',
            marginBottom: '2rem',
            lineHeight: 1.6
          }}>
            The universe has received your wish and conspires to make it reality.
          </p>
          <button
            onClick={onBack}
            style={{
              padding: '0.75rem 2rem',
              background: 'linear-gradient(to right, #10b981, #059669)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '9999px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Return to Sanctuary
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 25%, #10b981 50%, #064e3b 75%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{ maxWidth: '48rem', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Sparkles size={64} color="#10b981" strokeWidth={1.5} />
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontFamily: 'serif',
            color: '#ecfdf5',
            marginBottom: '1rem'
          }}>
            Make a Wish
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#a7f3d0',
            lineHeight: 1.6
          }}>
            Cast your dreams into the cosmos. The universe listens to every wish.
          </p>
        </div>

        <textarea
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          placeholder="What hopes do you carry in your heart?"
          maxLength={500}
          style={{
            width: '100%',
            height: '16rem',
            padding: '1.5rem',
            backgroundColor: 'rgba(6, 78, 59, 0.3)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '1rem',
            color: '#ecfdf5',
            fontSize: '1.125rem',
            fontFamily: 'serif',
            lineHeight: 1.6,
            resize: 'none',
            outline: 'none',
            marginBottom: '2rem'
          }}
        />

        <div style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={onBack}
            disabled={isSubmitting}
            style={{
              padding: '1rem 2rem',
              backgroundColor: 'transparent',
              border: '1px solid #64748b',
              color: '#cbd5e1',
              borderRadius: '9999px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <ArrowLeft size={20} />
            Back
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={!wish.trim() || isSubmitting}
            style={{
              padding: '1rem 2rem',
              background: wish.trim() && !isSubmitting 
                ? 'linear-gradient(to right, #10b981, #059669)'
                : '#64748b',
              color: wish.trim() && !isSubmitting ? '#ffffff' : '#94a3b8',
              border: 'none',
              borderRadius: '9999px',
              fontWeight: '600',
              cursor: wish.trim() && !isSubmitting ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <Send size={20} />
            {isSubmitting ? 'Casting...' : 'Cast Wish'}
          </button>
        </div>
      </div>
    </div>
  )
}
