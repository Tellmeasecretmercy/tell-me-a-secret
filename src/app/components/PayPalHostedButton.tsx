'use client'

interface PayPalHostedButtonProps {
  onPaymentSuccess?: () => void
}

export default function PayPalHostedButton({ onPaymentSuccess }: PayPalHostedButtonProps) {
  // Use the onPaymentSuccess prop to avoid unused warning
  const handleSuccess = () => {
    if (onPaymentSuccess) {
      onPaymentSuccess()
    }
  }

  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(251, 191, 36, 0.2)',
      borderRadius: '1rem',
      padding: '1.5rem',
      textAlign: 'center',
      marginTop: '1rem'
    }}>
      <h3 style={{
        color: '#fef3c7',
        fontSize: '1.1rem',
        marginBottom: '1rem',
        fontFamily: 'serif'
      }}>
        Alternative Payment Method
      </h3>
      
      <p style={{
        color: '#cbd5e1',
        fontSize: '0.9rem',
        marginBottom: '1rem'
      }}>
        Quick PayPal checkout option
      </p>

      {/* PRODUCTION PayPal Button */}
      <div>
        <style jsx>{`
          .pp-TA2PVJWXSMLAN {
            text-align: center;
            border: none;
            border-radius: 0.5rem;
            min-width: 11.625rem;
            padding: 0.75rem 2rem;
            height: 2.625rem;
            font-weight: bold;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: #0f172a;
            font-family: "Helvetica Neue", Arial, sans-serif;
            font-size: 1rem;
            line-height: 1.25rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .pp-TA2PVJWXSMLAN:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 25px rgba(245, 158, 11, 0.3);
          }
          .paypal-form {
            display: inline-grid;
            justify-items: center;
            align-content: start;
            gap: 0.5rem;
          }
          .paypal-cards {
            opacity: 0.8;
            filter: brightness(1.2);
          }
          .paypal-powered {
            font-size: 0.75rem;
            color: #94a3b8;
            opacity: 0.7;
          }
          .paypal-logo {
            height: 0.875rem;
            vertical-align: middle;
            opacity: 0.8;
          }
        `}</style>
        
        <form 
          action="https://www.paypal.com/ncp/payment/TA2PVJWXSMLAN" 
          method="post" 
          target="_blank" 
          className="paypal-form"
          onSubmit={handleSuccess}
        >
          <input 
            className="pp-TA2PVJWXSMLAN" 
            type="submit" 
            value="Pay with PayPal" 
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://www.paypalobjects.com/images/Debit_Credit.svg" 
            alt="cards" 
            className="paypal-cards"
          />
          <section className="paypal-powered">
            Powered by{' '}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg" 
              alt="paypal" 
              className="paypal-logo"
            />
          </section>
        </form>
      </div>

      <p style={{
        color: '#94a3b8',
        fontSize: '0.8rem',
        marginTop: '1rem',
        fontStyle: 'italic'
      }}>
        Opens in new window • Secure payment processing
      </p>
    </div>
  )
}

