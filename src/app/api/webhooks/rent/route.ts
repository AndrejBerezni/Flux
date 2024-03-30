import { sql } from '@vercel/postgres'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

import { stripe } from '@/stripe/stripe-config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const endpointSecret = process.env.NEXT_STRIPE_WEBHOOK_RENT!
    const signature = headers().get('stripe-signature') as string

    const event: Stripe.Event = stripe.webhooks.constructEvent(
      body,
      signature,
      endpointSecret
    )

    if (event.type === 'checkout.session.completed') {
      if (!event.data.object.metadata?.rentId) {
        throw new Error(`Missing rent id, ${event.id}`)
      }
      const invoice = await stripe.invoices.retrieve(
        event.data.object.invoice as string
      )
      const totalPrice = event.data.object.amount_total
      if (!invoice || !totalPrice) {
        throw new Error(`Missing invoice or total_price, ${event.id}`)
      }
      await sql`
        UPDATE rents
        SET payment_successful=true, invoice=${invoice.invoice_pdf}, total_price=${totalPrice}`
    }
    return NextResponse.json({ result: event, ok: true })
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Something went wrong',
        ok: false,
      },
      { status: 500 }
    )
  }
}
