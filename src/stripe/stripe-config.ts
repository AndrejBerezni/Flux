import Stripe from 'stripe'

export const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET as string, {
  apiVersion: '2023-10-16',
})
