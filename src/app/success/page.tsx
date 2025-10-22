'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Sparkles, Heart, Lock } from 'lucide-react'
import { trackPaymentCompleted } from '../lib/analytics'

interface PaymentDetails {
  type: string
  amount: string
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('processing')
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
  
  useEffect(() => {
    const capturePayment = async () => {
      const token = searchParams.get('token')
      const type = searchParams.get('type') || 'secret'
      const amount = searchParams.get('amount') || '1.00'
      
      if (token) {
        try {
          const response = await fetch('/api/paypal/capture-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderID: token })
          })
          
          const data = await response.json()
          
          if (response.ok && data.success) {
            setStatus('success')
            const finalAmount = data.amount?.value || amount
            setPaymentDetails({ type, amount: finalAmount })
            
            // Track successful payment completion
            trackPaymentCompleted(finalAmount, type as 'secret' | 'confession' | 'wish')
          } else {
            setStatus('error')
          }
        } catch (error) {
          console.error('Capture error:', error)
          setStatus('error')
        }
      } else {
        setStatus('error')
      }
    }
    
    capturePayment()
  }, [searchParams])

  const getIcon = () => {
    const type = paymentDetails?.type || 'secret'
    switch (type) {
      case 'secret': return <Lock size={80} color="#8b5cf6" />
      case 'confession': return <Heart size={80} color="#f59e0b" />
      case 'wish': return <Sparkles size={80} color="#10b981" />
      default: return <CheckCircle size={80} color="#10b981" />
    }
  }

  const getMessage = () => {
    const type = paymentDetails?.type || 'secret'
    switch (type) {
      case 'secret': return {
        title: 'Your secret is sealed forever',
        message: 'It has been released into the digital void, never to be seen again. You are free from its weight.'
      }
      case 'confession': return {
        title: 'You are forgiven',
        message: 'Your confession has been received with compassion. The weight you carried is now lifted.'
      }
      case 'wish': return {
        title: 'Your wish travels to the stars',
        message: 'The universe has received your wish and conspires to make it reality.'
      }
      default: return {
        title: 'Payment Successful',
        message: 'Thank you for your contribution.'
      }
    }
  }

  const getBackground = () => {
    const type = paymentDetails?.type || 'secret'
    switch (type) {
      case 'secret': 
        return 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #581c87 50%, #1e1b4b 75%, #0f172a 100%)'
      case 'confession': 
        return 'linear-gradient(135deg, #0f172a 0%, #92400e 25%, #f59e0b 50%, #92400e 75%, #0f172a 100%)'
      case 'wish': 
        return 'linear-gradient(135deg, #0f172a 0%, #064e3b 25%, #10b981 50%, #064e3b 75%, #0f172a 100%)'
      default: 
        return 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #581c87 50%, #1e1b4b 75%, #0f172a 100%)'
    }
  }

  const getParticleColors = () => {
    const type = paymentDetails?.type || 'secret'
    switch (type) {
      case 'secret': return ['#8b5cf6', '#a855f7', '#c084fc']
      case 'confession': return ['#f59e0b', '#fbbf24', '#fcd34d']
      case 'wish': return ['#10b981', '#34d399', '#6ee7b7']
      default: return ['#8b5cf6', '#f59e0b', '#10b981']
    }
  }

  if (status === 'processing') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #581c87 50%, #1e1b4b 75%, #0f172a 100%)'
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ textAlign: 'center' }}
        >
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(139, 92, 246, 0.3)',
            borderTop: '4px solid #8b5cf6',
            borderRadius: '50%',
            margin: '0 auto 1rem'
          }} />
          <p style={{ color: '#cbd5e1', fontSize: '1.125rem' }}>
            Processing your payment...
          </p>
        </motion.div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #581c87 50%, #1e1b4b 75%, #0f172a 100%)'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', maxWidth: '32rem', padding: '2rem' }}
        >
          <div style={{ marginBottom: '2rem', color: '#ef4444', fontSize: '4rem' }}>
            ✕
          </div>
          <h1 style={{ 
            fontSize: '2rem', 
            color: '#fef3c7', 
            marginBottom: '1rem',
            fontFamily: 'serif'
          }}>
            Payment Failed
          </h1>
          <p style={{ color: '#cbd5e1', marginBottom: '2rem' }}>
            Something went wrong with your payment. Please try again.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              padding: '0.75rem 2rem',
              background: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '9999px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Return Home
          </button>
        </motion.div>
      </div>
    )
  }

  const { title, message } = getMessage()
  const particleColors = getParticleColors()

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: getBackground(),
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Themed Celebration Particles */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: `${4 + Math.random() * 4}px`,
              height: `${4 + Math.random() * 4}px`,
              backgroundColor: particleColors[i % particleColors.length],
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
        transition={{ duration: 1.2 }}
        style={{ 
          textAlign: 'center', 
          maxWidth: '40rem', 
          padding: '2rem',
          position: 'relative',
          zIndex: 10
        }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
          style={{ marginBottom: '2rem' }}
        >
          {getIcon()}
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ 
            fontSize: '2.5rem', 
            color: '#fef3c7', 
            marginBottom: '1rem',
            fontFamily: 'serif',
            fontWeight: 300
          }}
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          style={{ 
            color: '#cbd5e1', 
            marginBottom: '2rem',
            fontSize: '1.125rem',
            lineHeight: 1.6
          }}
        >
          {message}
        </motion.p>

        {paymentDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              background: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '1rem',
              padding: '1.5rem',
              marginBottom: '2rem',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              backdropFilter: 'blur(16px)'
            }}
          >
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Payment Completed Successfully
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Amount: <span style={{ color: '#fef3c7', fontWeight: '600', fontSize: '1.1rem' }}>
                ${paymentDetails.amount} USD
              </span>
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.8 }}>
              Transaction processed securely by PayPal
            </p>
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/'}
          style={{
            padding: '1rem 2.5rem',
            background: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease'
          }}
        >
          Return to Sanctuary
        </motion.button>
      </motion.div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #581c87 50%, #1e1b4b 75%, #0f172a 100%)'
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ textAlign: 'center' }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(139, 92, 246, 0.3)',
            borderTop: '3px solid #8b5cf6',
            borderRadius: '50%',
            margin: '0 auto 1rem'
          }} />
          <p style={{ color: '#cbd5e1' }}>Loading...</p>
        </motion.div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
