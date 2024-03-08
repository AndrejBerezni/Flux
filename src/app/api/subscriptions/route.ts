import { sql } from '@vercel/postgres'
import { NextRequest } from 'next/server'

import {
  ISubscriptionAPIPatchRequestBody,
  ISubscription,
  ISubscriptionDescription,
} from '@/compiler/interfaces'
import { changeSubscriptionStatus } from '@/lib/dbQueries/subscriptions'
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

const handleChangingSubscriptionStatus = async (
  subscription: ISubscriptionAPIPatchRequestBody
) => {
  const modifiedSubscription = await modifySubscription(
    subscription.stripeId,
    subscription.action
  )
  if (modifiedSubscription) {
    await changeSubscriptionStatus(
      subscription.id,
      subscription.action,
      modifiedSubscription.current_period_end
    )
    return new Response(
      JSON.stringify({
        message: `Subscription successfully ${subscription.action}ed`,
      }),
      {
        headers: {
          'Content-type': 'application/json',
        },
        status: 200,
      }
    )
  } else {
    throw new Error(`Unable to ${subscription.action} subscription`)
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const subscription = await request.json()
    const actionResponse = await handleChangingSubscriptionStatus(subscription)
    return actionResponse
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
