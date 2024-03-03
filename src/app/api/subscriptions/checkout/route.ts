import { type NextRequest } from 'next/server'

import {
  checkIfUserHasActiveSubscription,
  createSubscription,
} from '@/lib/fetchSubscriptions'
import { createCheckoutSession } from '@/stripe/subscriptions'

export async function POST(request: NextRequest) {
  try {
    const subscription = await request.json()
    const hasSubscription = await checkIfUserHasActiveSubscription(
      subscription.userId
    )
    if (hasSubscription.hasSubscription) {
      return new Response(
        JSON.stringify({ error: 'Active subscription already exists.' }),
        {
          headers: {
            'Content-type': 'application/json',
          },
          status: 400,
        }
      )
    }
    const newSubscription = await createSubscription(
      subscription.subId,
      subscription.userId,
      subscription.subPeriod,
      subscription.selectedVehicle
    )
    const sessionUrl = await createCheckoutSession(
      subscription.subStripeId,
      newSubscription
    )
    return new Response(JSON.stringify(sessionUrl), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 202,
    })
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: {
          'Content-type': 'application/json',
        },
        status: 400,
      })
    }
  }
}
