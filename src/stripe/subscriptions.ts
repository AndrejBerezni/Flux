import Stripe from 'stripe'

import { SubscriptionAction } from '@/compiler/types'
const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET as string, {
  apiVersion: '2023-10-16',
})

export const createCheckoutSession = async (itemId: string, subId: string) => {
  try {
    const product = await stripe.products.retrieve(itemId)
    const priceId = product.default_price
    const session = await stripe.checkout.sessions.create({
      success_url: `https://flux-nu.vercel.app/subscriptions/success?subId=${subId}&sessionId={CHECKOUT_SESSION_ID}`,
      line_items: [
        {
          price: priceId as string,
          quantity: 1,
        },
      ],
      mode: 'subscription',
    })
    return session.url
  } catch (error) {
    console.error(error)
  }
}

export const retrieveSubscriptionIdfromSession = async (sessiondId: string) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessiondId)
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
