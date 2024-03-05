import { sql } from '@vercel/postgres'
import { NextRequest } from 'next/server'

import { ISubscription, ISubscriptionDescription } from '@/compiler/interfaces'
import { deactivateSubscription } from '@/lib/dbQueries/subscriptions'
import { cancelSubscription } from '@/stripe/subscriptions'

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

export async function DELETE(request: NextRequest) {
  try {
    const subscription = await request.json()
    const canceledSubscription = await cancelSubscription(subscription.stripeId)
    if (canceledSubscription) {
      await deactivateSubscription(
        subscription.id,
        canceledSubscription.current_period_end
      )
      return new Response(
        JSON.stringify({ message: 'Subscription successfully canceled.' }),
        {
          headers: {
            'Content-type': 'application/json',
          },
          status: 200,
        }
      )
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Unable to remove subscription',
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
