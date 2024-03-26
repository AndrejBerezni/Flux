import { stripe } from './stripe-config'

export const retrieveVehiclePrice = async (priceId: string) => {
  try {
    const price = await stripe.prices.retrieve(priceId)
    return price.unit_amount
  } catch (error) {
    console.error(error)
  }
}
