import { stripe } from './stripe-config'

export const createCheckoutSession = async (
  priceId: string,
  giftCardId: string
) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `https://flux-nu.vercel.app/giftcards/success?gcId=${giftCardId}&sessionId={CHECKOUT_SESSION_ID}`,
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
