import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

export interface PesapalPaymentRequest {
  id: string
  currency: string
  amount: number
  description: string
  callback_url: string
  notification_id: string
  billing_address: {
    email_address: string
    phone_number: string
    country_code: string
    first_name: string
    last_name: string
    line_1?: string
    line_2?: string
    city?: string
    state?: string
    postal_code?: string
  }
}

export class PesapalService {
  private consumerKey: string
  private consumerSecret: string
  private baseUrl: string
  private token: string | null = null

  constructor() {
    this.consumerKey = process.env.PESAPAL_CONSUMER_KEY!
    this.consumerSecret = process.env.PESAPAL_CONSUMER_SECRET!
    this.baseUrl = process.env.PESAPAL_ENVIRONMENT === 'live' 
      ? 'https://pay.pesapal.com/v3/api'
      : 'https://cybqa.pesapal.com/pesapalv3/api'
  }

  async authenticate(): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/Auth/RequestToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          consumer_key: this.consumerKey,
          consumer_secret: this.consumerSecret
        })
      })

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.statusText}`)
      }

      const data = await response.json()
      this.token = data.token
      return data.token
    } catch (error) {
      console.error('Pesapal authentication error:', error)
      throw error
    }
  }

  async registerIPN(url: string): Promise<string> {
    if (!this.token) {
      await this.authenticate()
    }

    try {
      const response = await fetch(`${this.baseUrl}/URLSetup/RegisterIPN`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({
          url: url,
          ipn_notification_type: 'GET'
        })
      })

      if (!response.ok) {
        throw new Error(`IPN registration failed: ${response.statusText}`)
      }

      const data = await response.json()
      return data.ipn_id
    } catch (error) {
      console.error('IPN registration error:', error)
      throw error
    }
  }

  async submitOrderRequest(paymentData: PesapalPaymentRequest): Promise<any> {
    if (!this.token) {
      await this.authenticate()
    }

    try {
      const response = await fetch(`${this.baseUrl}/Transactions/SubmitOrderRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(paymentData)
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Payment request failed: ${response.statusText} - ${errorText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Payment request error:', error)
      throw error
    }
  }

  async getTransactionStatus(orderTrackingId: string): Promise<any> {
    if (!this.token) {
      await this.authenticate()
    }

    try {
      const response = await fetch(`${this.baseUrl}/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      })

      if (!response.ok) {
        throw new Error(`Status check failed: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Status check error:', error)
      throw error
    }
  }
}
