'use client'

import { useEffect, useState } from 'react'

interface BuyMeCoffeeButtonProps {
  amount?: string
  onPaymentSuccess?: () => void
  chamber?: 'secret' | 'confession' | 'wish'
}

export default function BuyMeCoffeeButton({ 
  amount = "1", 
  onPaymentSuccess,
  chamber = 'secret'
}: BuyMeCoffeeButtonProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  
  useEffect(() => {
    // Clean up any existing scripts first
    const existingScripts = document.querySelectorAll('script[src*="buymeacoffee"]')
    existingScripts.forEach(script => script.remove())

    // Remove any existing Buy Me a Coffee elements
    const existingButtons = document.querySelectorAll('[data-name="Tellmeasecret"]')
    existingButtons.forEach(button => button.remove())

    // Get chamber-specific button text and colors
    const getChamberConfig = () => {
      switch (chamber) {
        case 'secret':
          return {
            text: `Share Secret ($${amount})`,
            color: '#8b5cf6'
          }
        case 'confession':
          return {
            text: `Share Confession ($${amount})`,
            color: '#f59e0b'
          }
        case 'wish':
          return {
            text: `Cast Wish ($${amount})`,
            color: '#10b981'
          }
        default:
          return {
            text: `Share Secret ($${amount})`,
            color: '#8b5cf6'
          }
      }
    }

    const config = getChamberConfig()

    // Create and load the Buy Me a Coffee script
    const script = document.createElement('script')
    script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js'
    script.async = true
    
    // Set all the data attributes with CORRECT capitalization
    script.setAttribute('data-name', 'Tellmeasecret')  // Capital T - FIXED!
    script.setAttribute('data-size', 'default')
    script.setAttribute('data-limit', '5')
    script.setAttribute('data-page-url', 'https://www.buymeacoffee.com/Tellmeasecret')  // Capital T - FIXED!
    script.setAttribute('data-color', config.color)
    script.setAttribute('data-font', 'Cookie')
    script.setAttribute('data-text', config.text)
    script.setAttribute('data-outline-color', '#000000')
    script.setAttribute('data-font-color', '#ffffff')
    script.setAttribute('data-coffee-color', config.color)

    // Handle script load
    script.onload = () => {
      console.log('Buy Me a Coffee script loaded successfully')
      setIsLoaded(true)
      
      // Show fallback after 3 seconds if button doesn't appear
      setTimeout(() => {
        const bmcButton = document.querySelector('a[href*="buymeacoffee.com/Tellmeasecret"]')
        if (!bmcButton) {
          setShowFallback(true)
        }
      }, 3000)
    }

    script.onerror = () => {
      console.error('Failed to load Buy Me a Coffee script')
      setShowFallback(true)
    }

    // Add script to document head
    document.head.appendChild(script)

    // Set up click handler for payment simulation
    const handlePaymentClick = () => {
      // Store payment details for success page
      localStorage.setItem('lastChamberType', chamber)
      localStorage.setItem('lastAmount', amount)
      
      // Simulate payment delay
      setTimeout(() => {
        if (onPaymentSuccess) {
          onPaymentSuccess()
        }
      }, 3000) // 3 second delay to simulate payment
    }

    // Listen for clicks on Buy Me a Coffee buttons with correct URL
    const checkForButton = setInterval(() => {
      const bmcButton = document.querySelector('a[href*="buymeacoffee.com/Tellmeasecret"]')  // Capital T - FIXED!
      if (bmcButton) {
        bmcButton.addEventListener('click', handlePaymentClick)
        clearInterval(checkForButton)
        console.log('Buy Me a Coffee button found and click handler attached')
      }
    }, 500)

    // Cleanup after 10 seconds if button not found
    setTimeout(() => {
      clearInterval(checkForButton)
      if (!document.querySelector('a[href*="buymeacoffee.com/Tellmeasecret"]')) {
        setShowFallback(true)
      }
    }, 10000)

    return () => {
      // Cleanup
      clearInterval(checkForButton)
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [amount, onPaymentSuccess, chamber])

  // Get chamber-specific styling
  const getChamberStyling = () => {
    switch (chamber) {
      case 'secret':
        return {
          background: 'rgba(139, 92, 246, 0.1)',
          border: '2px solid rgba(139, 92, 246, 0.3)',
          titleColor: '#fef3c7',
          textColor: '#cbd5e1',
          buttonColor: '#8b5cf6'
        }
      case 'confession':
        return {
          background: 'rgba(245, 158, 11, 0.1)',
          border: '2px solid rgba(245, 158, 11, 0.3)',
          titleColor: '#fef3c7',
          textColor: '#fed7aa',
          buttonColor: '#f59e0b'
        }
      case 'wish':
        return {
          background: 'rgba(16, 185, 129, 0.1)',
          border: '2px solid rgba(16, 185, 129, 0.3)',
          titleColor: '#ecfdf5',
          textColor: '#a7f3d0',
          buttonColor: '#10b981'
        }
      default:
        return {
          background: 'rgba(139, 92, 246, 0.1)',
          border: '2px solid rgba(139, 92, 246, 0.3)',
          titleColor: '#fef3c7',
          textColor: '#cbd5e1',
          buttonColor: '#8b5cf6'
        }
    }
  }

  const getChamberMessage = () => {
    switch (chamber) {
      case 'secret':
        return 'Your secret will be safely sealed forever. Click below to contribute.'
      case 'confession':
        return 'Your confession will be received with compassion. Click below to contribute.'
      case 'wish':
        return 'Your wish will be cast into the cosmos. Click below to contribute.'
      default:
        return 'Your secret will be safely received. Click below to contribute.'
    }
  }

  const getChamberButtonText = () => {
    switch (chamber) {
      case 'secret':
        return `💜 Share Secret ($${amount})`
      case 'confession':
        return `💛 Share Confession ($${amount})`
      case 'wish':
        return `💚 Cast Wish ($${amount})`
      default:
        return `💜 Share Secret ($${amount})`
    }
  }

  const styling = getChamberStyling()

  const handleFallbackClick = () => {
    // Store payment details for success page
    localStorage.setItem('lastChamberType', chamber)
    localStorage.setItem('lastAmount', amount)
    
    // Open Buy Me a Coffee in new window
    window.open('https://www.buymeacoffee.com/Tellmeasecret', '_blank')
    
    // Simulate payment completion after delay
    setTimeout(() => {
      if (onPaymentSuccess) {
        onPaymentSuccess()
      }
    }, 5000) // 5 second delay for manual payment
  }

  return (
    <div style={{
      background: styling.background,
      backdropFilter: 'blur(16px)',
      border: styling.border,
      borderRadius: 'clamp(0.75rem, 2vw, 1rem)',
      padding: 'clamp(1.5rem, 4vw, 2rem)',
      textAlign: 'center',
      marginTop: '1rem'
    }}>
      <h3 style={{
        color: styling.titleColor,
        fontSize: 'clamp(1.1rem, 3vw, 1.2rem)',
        marginBottom: '1rem',
        fontFamily: 'serif'
      }}>
        Complete Your Sacred Moment
      </h3>
      
      <p style={{
        color: styling.textColor,
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
        lineHeight: 1.5
      }}>
        {getChamberMessage()}
      </p>

      {/* Buy Me a Coffee button container */}
      <div style={{ 
        marginBottom: '1rem',
        minHeight: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {!isLoaded && !showFallback && (
          <div style={{
            color: styling.textColor,
            fontSize: '0.9rem',
            opacity: 0.7
          }}>
            Loading payment button...
          </div>
        )}
        
        {/* Buy Me a Coffee button will be injected here automatically */}
        
        {/* Fallback manual button */}
        {showFallback && (
          <button
            onClick={handleFallbackClick}
            style={{
              display: 'inline-block',
              padding: 'clamp(12px, 3vw, 16px) clamp(24px, 6vw, 32px)',
              backgroundColor: styling.buttonColor,
              color: '#ffffff',
              border: 'none',
              borderRadius: '25px',
              fontWeight: 'bold',
              fontSize: 'clamp(14px, 3.5vw, 16px)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              textDecoration: 'none'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)'
            }}
          >
            {getChamberButtonText()}
          </button>
        )}
      </div>

      <p style={{
        color: '#94a3b8',
        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
        fontStyle: 'italic',
        opacity: 0.8
      }}>
        Secure • Anonymous • Opens in new window
      </p>

    
    </div>
  )
}
