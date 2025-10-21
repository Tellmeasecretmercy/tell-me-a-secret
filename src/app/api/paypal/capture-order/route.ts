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
    const { orderID } = await request.json()

    if (!orderID) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    const accessToken = await getAccessToken()

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    const captureData = await response.json()

    if (!response.ok) {
      console.error('PayPal capture failed:', captureData)
      throw new Error(captureData.message || 'Failed to capture PayPal payment')
    }

    return NextResponse.json({
      success: true,
      captureID: captureData.id,
      status: captureData.status,
      amount: captureData.purchase_units[0]?.payments?.captures[0]?.amount
    })

  } catch (error) {
    console.error('PayPal capture error:', error)
    return NextResponse.json(
      { error: 'Payment capture failed' },
      { status: 500 }
    )
  }
}
