import { type NextRequest } from 'next/server'

import {
  checkIfUserHasActiveSubscription,
  createSubscription,
} from '@/lib/db_queries/subscriptions'
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
          status: 409, //https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
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
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        headers: {
          'Content-type': 'application/json',
        },
        status: 400,
      }
    )
  }
}
