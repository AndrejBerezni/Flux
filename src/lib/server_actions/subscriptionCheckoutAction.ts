'use server'

import { MonthYear, VehicleType } from '@/compiler/types'
import { checkIfUserHasActiveSubscription } from '@/lib/db_queries/subscriptions'
import { createCheckoutSession } from '@/stripe/subscriptions'

export const subscriptionCheckoutAction = async (
  uid: string,
  subStripeId: string,
  subId: string,
  subscriptionPeriod: MonthYear,
  selectedVehicle: VehicleType | null
) => {
  try {
    const userSubscriptionStatus = await checkIfUserHasActiveSubscription(uid)
    if (userSubscriptionStatus.hasSubscription) {
      throw new Error(
        'Active subscription already exists. If you wish to change it, you may do that from your account page.'
      )
    }
    const sessionUrl = await createCheckoutSession(
      subStripeId,
      subId,
      uid,
      subscriptionPeriod,
      selectedVehicle
    )
    return sessionUrl
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Unknown error occurred. Please try again later.'
    )
  }
}
