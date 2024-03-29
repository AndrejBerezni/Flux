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
  rentId: string,
  priceId: string,
  days: number,
  insuranceId?: string
) => {
  try {
    const line_items = [
      {
        price: priceId as string,
        quantity: days,
      },
    ]
    if (insuranceId) {
      line_items.push({
        price: insuranceId as string,
        quantity: days,
      })
    }
    const session = await stripe.checkout.sessions.create({
      success_url: `https://flux-nu.vercel.app/rent/success?rentId=${rentId}&sessionId={CHECKOUT_SESSION_ID}`,
      line_items,
      allow_promotion_codes: true,
      mode: 'payment',
    })
    return session.url
  } catch (error) {
    console.error(error)
  }
}

export const retrieveTotalPriceFromCheckoutSession = async (
  sessionId: string
) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return session.amount_total
  } catch (error) {
    console.error(error)
  }
}
