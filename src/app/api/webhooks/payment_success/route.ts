import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

import { stripe } from '@/stripe/stripe-config'

import { handleGiftCard } from './handleGiftCard'
import { handleRent } from './handleRent'
import { handleSubscription } from './handleSubscription'

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
      switch (event.data.object.metadata?.productType) {
        case 'rent':
          await handleRent(
            event.id,
            event.data.object.metadata!.rentId,
            event.data.object.invoice as string,
            event.data.object.amount_total
          )
          break
        case 'gift card':
          await handleGiftCard(
            event.id,
            event.data.object.metadata!.giftCardId,
            event.data.object.metadata!.couponId,
            event.data.object.metadata!.value
          )
          break
        case 'subscription':
          await handleSubscription()
          break
        default:
          break
      }
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
