'use server'

import { sql } from '@vercel/postgres'

import { retrieveVehiclePrice } from '@/stripe/vehicles'

import { checkIfUserHasActiveSubscription } from '../dbQueries/subscriptions'

export const subscriptionDetailsAction = async (uid: string) => {
  try {
    const subscription = await checkIfUserHasActiveSubscription(uid)
    if (subscription.hasSubscription) {
      const data = await sql`
        SELECT subscriptions.selected_vehicle,
        subscription_type.selected_vehicle_discount,
        subscription_type.all_vehicles_discount,
        subscription_type.insurance,
        subscription_type.name
        FROM subscriptions
        LEFT JOIN subscription_type ON subscriptions.type=subscription_type.id::varchar
        WHERE user_id=${uid}
        AND (active=true OR (active=false AND end_date > CURRENT_DATE))
        ORDER BY subscriptions.start_date DESC`
      return data.rows[0]
    } else {
      return null
    }
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Unknown error occured. Please try again later!'
    )
  }
}

export const getRentPriceAction = async (priceId: string) => {
  try {
    const price = await retrieveVehiclePrice(priceId)
    return price
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Unknown error occured. Please try again later!'
    )
  }
}
