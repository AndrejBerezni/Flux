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
      success_url: `https://flux-nu.vercel.app/rent/success?rentId=${rentId}`,
      line_items,
      allow_promotion_codes: true,
      mode: 'payment',
      invoice_creation: {
        enabled: true,
      },
      metadata: {
        productType: 'rent',
        rentId,
      },
    })
    return session.url
  } catch (error) {
    console.error(error)
  }
}
