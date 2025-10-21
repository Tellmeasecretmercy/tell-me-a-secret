import { NextRequest, NextResponse } from 'next/server'

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!
const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL || 'https://api-m.sandbox.paypal.com'

async function getAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64')
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })

  const data = await response.json()
  return data.access_token
}

export async function POST(request: NextRequest) {
  try {
    const { content, type, amount = '1.00' } = await request.json()

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    // Validate amount (minimum $1.00)
    const numAmount = parseFloat(amount)
    if (numAmount < 1.00) {
      return NextResponse.json(
        { error: 'Minimum amount is $1.00' },
        { status: 400 }
      )
    }

    const accessToken = await getAccessToken()

    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: amount
        },
        description: `Tell Me a Secret - ${type.charAt(0).toUpperCase() + type.slice(1)}`,
        custom_id: `${type}-${Date.now()}`
      }],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?type=${type}&amount=${amount}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
        brand_name: 'Tell Me a Secret',
        user_action: 'PAY_NOW',
        shipping_preference: 'NO_SHIPPING'
      }
    }

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    })

    const order = await response.json()

    if (!response.ok) {
      console.error('PayPal order creation failed:', order)
      throw new Error(order.message || 'Failed to create PayPal order')
    }

    return NextResponse.json({
      orderID: order.id,
      approvalUrl: order.links.find((link: any) => link.rel === 'approve')?.href
    })

  } catch (error) {
    console.error('PayPal error:', error)
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    )
  }
}
