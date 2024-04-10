import { MonthYear, SubscriptionAction, VehicleType } from '@/compiler/types'

import { stripe } from './stripe-config'

export const createCheckoutSession = async (
  stripeId: string,
  subscriptionTypeId: string,
  uid: string,
  subscriptionPeriod: MonthYear,
  selectedVehicle: VehicleType | null
) => {
  try {
    const product = await stripe.products.retrieve(stripeId)
    const priceId = product.default_price
    const session = await stripe.checkout.sessions.create({
      success_url: `https://flux-nu.vercel.app/subscriptions/success`,
      line_items: [
        {
          price: priceId as string,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      mode: 'subscription',
      metadata: {
        productType: 'subscription',
        subscriptionTypeId,
        uid,
        subscriptionPeriod,
        selectedVehicle,
      },
    })
    return session.url
  } catch (error) {
    console.error(error)
  }
}

export const retrieveSubscriptionIdfromSession = async (sessionId: string) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return session.subscription
  } catch (error) {
    console.error(error)
  }
}

export const modifySubscription = async (
  subscriptionId: string,
  action: SubscriptionAction
) => {
  try {
    // if we use stripe.subscriptions.cancel, sub will be cancelled immediately.
    // Instead, we use update method to have it canceled when the current billing period ends
    // In case of renewing it, we just update the subscription not to be canceled at the end of the current billing period
    const modifiedSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        cancel_at_period_end: action === 'cancel',
      }
    )
    return modifiedSubscription
  } catch (error) {
    console.error(error)
  }
}

export const changeSubscriptionPlan = async (
  subscriptionId: string,
  productId: string
) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    const subscriptionItem = subscription.items.data[0].id

    const product = await stripe.products.retrieve(productId)
    const priceId = product.default_price
    if (priceId) {
      const modifiedItem = await stripe.subscriptionItems.update(
        subscriptionItem,
        {
          price: priceId as string,
        }
      )
      return modifiedItem
    } else {
      throw new Error('Unable to retrive subscription plan price.')
    }
  } catch (error) {
    console.error(error)
  }
}
