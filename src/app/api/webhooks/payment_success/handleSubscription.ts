import { createSubscription } from '@/lib/db_queries/subscriptions'

export const handleSubscription = async (
  eventId: string,
  subscriptionTypeId: string,
  uid: string,
  subscriptionPeriod: string,
  selectedVehicle: string | null,
  subscriptionStripeId: string
) => {
  try {
    await createSubscription(
      subscriptionTypeId,
      uid,
      subscriptionPeriod,
      selectedVehicle,
      subscriptionStripeId
    )
  } catch (error) {
    throw new Error(`Unable to create subscription, ${eventId}`)
  }
}
