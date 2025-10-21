import { NextRequest, NextResponse } from 'next/server'

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!
const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL || 'https://api-m.sandbox.paypal.com'

interface PayPalLink {
  rel: string
  href: string
}

interface PayPalOrder {
  id: string
  links?: PayPalLink[]
}

async function getAccessToken() {
  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64')
    
    console.log('Getting PayPal access token...')
    const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    })

    if (!response.ok) {
      console.error('Failed to get access token:', response.status, response.statusText)
      throw new Error('Failed to authenticate with PayPal')
    }

    const data = await response.json()
    console.log('Access token obtained successfully')
    return data.access_token
  } catch (error) {
    console.error('Access token error:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('PayPal create order request received')
    
    const { content, type, amount = '1.00' } = await request.json()
    console.log('Request data:', { type, amount, contentLength: content?.length })

    if (!content || content.trim().length === 0) {
      console.log('Content validation failed')
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    // Validate amount (minimum $1.00)
    const numAmount = parseFloat(amount)
    if (numAmount < 1.00) {
      console.log('Amount validation failed:', amount)
      return NextResponse.json(
        { error: 'Minimum amount is $1.00' },
        { status: 400 }
      )
    }

    console.log('Getting access token...')
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

    console.log('Creating PayPal order...')
    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    })

    console.log('PayPal response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('PayPal order creation failed:', response.status, errorText)
      return NextResponse.json(
        { error: 'Failed to create PayPal order' },
        { status: 500 }
      )
    }

    const order: PayPalOrder = await response.json()
    console.log('PayPal order created successfully:', order.id)

    const approvalUrl = order.links?.find((link: PayPalLink) => link.rel === 'approve')?.href

    if (!approvalUrl) {
      console.error('No approval URL found in PayPal response')
      return NextResponse.json(
        { error: 'No payment URL received from PayPal' },
        { status: 500 }
      )
    }

    console.log('Returning success response')
    return NextResponse.json({
      orderID: order.id,
      approvalUrl: approvalUrl
    })

  } catch (error) {
    console.error('PayPal API error:', error)
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    )
  }
}

