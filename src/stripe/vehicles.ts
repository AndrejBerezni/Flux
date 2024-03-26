import { stripe } from './stripe-config'

export const retrieveVehiclePrice = async (priceId: string) => {
  try {
    const price = await stripe.prices.retrieve(priceId)
    return price.unit_amount
  } catch (error) {
    console.error(error)
  }
}

export const createVehicleCheckoutSession = async (
  priceId: string,
  days: number
) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `https://flux-nu.vercel.app/vehicles/success?sessionId={CHECKOUT_SESSION_ID}`,
      line_items: [
        {
          price: priceId as string,
          quantity: days,
        },
      ],
      allow_promotion_codes: true,
      mode: 'payment',
    })
    return session.url
  } catch (error) {
    console.error(error)
  }
}
