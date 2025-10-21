import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  
})

export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json()

    if (!secret || secret.trim().length === 0) {
      return NextResponse.json(
        { error: 'Secret is required' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Tell Me a Secret',
              description: 'Digital ritual - your secret will be sealed forever'
            },
            unit_amount: 100 // $1.00 in cents
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?type=secret&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      metadata: {
        type: 'secret',
        secret: secret.substring(0, 500)
      }
    })

    return NextResponse.json({ 
      sessionId: session.id
    })

  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    )
  }
}
