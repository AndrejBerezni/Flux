import { stripe } from './stripe-config'

export const createCheckoutSession = async (
  priceId: string,
  couponId: string,
  giftCardId: string,
  value: string
) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `https://flux-nu.vercel.app/giftcards/success?gcId=${giftCardId}&coupon=${couponId}&value=${value}`,
      line_items: [
        {
          price: priceId as string,
          quantity: 1,
        },
      ],
      allow_promotion_codes: false,
      mode: 'payment',
    })
    return session.url
  } catch (error) {
    console.error(error)
  }
}

export const createPromotionCode = async (coupon: string): Promise<string> => {
  try {
    const promotionCode = await stripe.promotionCodes.create({
      coupon,
    })
    return promotionCode.code
  } catch (error) {
    return error instanceof Error
      ? error.message
      : 'Unable to create gift card code'
  }
}
