import { NextRequest, NextResponse } from 'next/server'
import { PesapalService } from '../../../lib/pesapal'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json()

    if (!secret || secret.trim().length === 0) {
      return NextResponse.json(
        { error: 'Secret is required' },
        { status: 400 }
      )
    }

    // Generate unique IDs
    const orderId = uuidv4()
    const notificationId = uuidv4()

    const pesapal = new PesapalService()

    // Prepare payment request
    const paymentRequest = {
      id: orderId,
      currency: 'USD',
      amount: 1.00,
      description: 'Tell Me a Secret - Digital Ritual',
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?type=secret&order=${orderId}`,
      notification_id: notificationId,
      billing_address: {
        email_address: 'anonymous@tellmeasecret.com',
        phone_number: '+1234567890',
        country_code: 'US',
        first_name: 'Anonymous',
        last_name: 'User',
        line_1: 'Digital Realm',
        city: 'Cyberspace',
        state: 'Virtual',
        postal_code: '00000'
      }
    }

    // Submit order to Pesapal
    const paymentResponse = await pesapal.submitOrderRequest(paymentRequest)

    // Store the secret temporarily (you'll want to encrypt this and store in a database)
    // For now, we'll just return the payment URL
    
    return NextResponse.json({
      success: true,
      order_tracking_id: paymentResponse.order_tracking_id,
      merchant_reference: paymentResponse.merchant_reference,
      redirect_url: paymentResponse.redirect_url,
      orderId: orderId
    })

  } catch (error) {
    console.error('Pesapal payment error:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Payment processing failed',
        details: 'Please check your Pesapal credentials and try again'
      },
      { status: 500 }
    )
  }
}
