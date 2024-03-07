import { sql } from '@vercel/postgres'
import { NextRequest } from 'next/server'

import {
  ISubscriptionAPIPatchRequestBody,
  ISubscription,
  ISubscriptionDescription,
} from '@/compiler/interfaces'
import {
  deactivateSubscription,
  reactivateSubscription,
} from '@/lib/dbQueries/subscriptions'
import { modifySubscription } from '@/stripe/subscriptions'

export async function GET() {
  try {
    const response =
      await sql<ISubscription>`SELECT * FROM subscription_type ORDER BY name`
    const subscriptions = await response.rows
    const result = await Promise.all(
      subscriptions.map(async (subscription) => {
        const subResponse = await sql<ISubscriptionDescription>`
                    SELECT text FROM subscription_description
                    WHERE subscription_id=${subscription.id}
                `
        const description = subResponse.rows
        return { ...subscription, description }
      })
    )
    return Response.json(result)
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Error occured while fetching subscriptions details',
      }),
      {
        headers: {
          'Content-type': 'application/json',
        },
        status: 404,
      }
    )
  }
}

const handleCancelingSubscription = async (
  subscription: ISubscriptionAPIPatchRequestBody
) => {
  const canceledSubscription = await modifySubscription(
    subscription.stripeId,
    'cancel'
  )
  if (canceledSubscription) {
    await deactivateSubscription(
      subscription.id,
      canceledSubscription.current_period_end
    )
    return new Response(
      JSON.stringify({ message: 'Subscription successfully canceled' }),
      {
        headers: {
          'Content-type': 'application/json',
        },
        status: 200,
      }
    )
  } else {
    throw new Error('Unable to cancel subscription')
  }
}

const handleRenewingSubscription = async (
  subscription: ISubscriptionAPIPatchRequestBody
) => {
  const renewedSubscription = await modifySubscription(
    subscription.stripeId,
    'renew'
  )
  if (renewedSubscription) {
    await reactivateSubscription(subscription.id)
    return new Response(
      JSON.stringify({ message: 'Subscription successfully renewed' }),
      {
        headers: {
          'Content-type': 'application/json',
        },
        status: 200,
      }
    )
  } else {
    throw new Error('Unable to renew subscription')
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const subscription = await request.json()
    switch (subscription.action) {
      case 'cancel':
        const cancelResponse = await handleCancelingSubscription(subscription)
        return cancelResponse
      case 'renew':
        const renewResponse = await handleRenewingSubscription(subscription)
        return renewResponse
      default:
        throw new Error('Unable to modify subscription')
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Unable to modify subscription',
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
