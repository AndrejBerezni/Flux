import { createSubscription } from '@/lib/db_queries/subscriptions'

export const handleSubscription = async (
  eventId: string,
  subscriptionTypeId: string,
  uid: string,
  subscriptionPeriod: string,
  selectedVehicle: string | null
) => {
  try {
    await createSubscription(
      subscriptionTypeId,
      uid,
      subscriptionPeriod,
      selectedVehicle
    )
  } catch (error) {
    throw new Error(`Unable to create subscription, ${eventId}`)
  }
}
