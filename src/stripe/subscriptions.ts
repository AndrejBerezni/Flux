import Stripe from 'stripe'
const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET as string, {
  apiVersion: '2023-10-16',
})

export const createCheckoutSession = async (itemId: string, subId: string) => {
  try {
    const product = await stripe.products.retrieve(itemId)
    const priceId = product.default_price
    const session = await stripe.checkout.sessions.create({
      success_url: `https://flux-nu.vercel.app/subscriptions/success?subId=${subId}`,
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
