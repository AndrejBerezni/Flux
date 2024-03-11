import { NextRequest } from 'next/server'

import { changeSubscriptionType } from '@/lib/dbQueries/subscriptions'
import { changeSubscriptionPlan } from '@/stripe/subscriptions'

export async function PATCH(request: NextRequest) {
  try {
    const subscription = await request.json()
    const modifiedStripeSubscription = await changeSubscriptionPlan(
      subscription.stripeSubId,
      subscription.stripeProdId
    )
    if (modifiedStripeSubscription) {
      const selectedVehicle =
        subscription.vehicleType === '' ? null : subscription.vehicleType
      await changeSubscriptionType(
        subscription.id,
        subscription.type,
        selectedVehicle
      )
      return new Response(
        JSON.stringify({
          message: 'Subscription plan changed successfully',
        }),
        {
          headers: {
            'Content-type': 'application/json',
          },
          status: 200,
        }
      )
    } else {
      throw new Error('Unable to change subscription plan')
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Unable to change subscription plan',
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
