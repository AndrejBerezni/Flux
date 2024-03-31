'use server'

import { sql } from '@vercel/postgres'

import { createCheckoutSession } from '@/stripe/giftcards'

import { checkIfUserHasActiveSubscription } from '../db_queries/subscriptions'

const createGiftCardInDB = async (
  uid: string,
  value: string,
  formData: FormData
) => {
  try {
    //get type of gift card
    const giftCardTypeIdData = await sql`
                SELECT id FROM gift_card_type
                WHERE amount=${Number(value)}
                `
    const giftCardTypeId = giftCardTypeIdData.rows[0].id
    //add new gift card to db, according to the data you have now
    const newGiftCard = await sql`
            INSERT INTO gift_cards(user_id, gift_card_type, recipient_email, recipient_name, sender_name, message_for_recipient)
            VALUES(${uid}, ${giftCardTypeId}, ${
              formData.get('gc-rec-email') as string
            }, ${formData.get('gc-rec-name') as string}, ${
              formData.get('gc-sender') as string
            }, ${formData.get('gc-message') as string})
            RETURNING id`
    return newGiftCard.rows[0].id
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Unable to create gift card')
  }
}

const retrievePriceAndCoupon = async (uid: string, value: string) => {
  try {
    //get gift card details
    const data = await sql`
        SELECT * FROM gift_card_type
        WHERE amount=${Number(value)}
        `
    const giftCard = data.rows[0]
    const coupon = giftCard.stripe_coupon_id
    //we are checking if user has subscription, to know which price for gift card to apply (user might have discount)
    const userSubscription = await checkIfUserHasActiveSubscription(uid)
    if (!userSubscription.hasSubscription) {
      return { price: giftCard.stripe_full_price_id, coupon }
    } else {
      const discountData = await sql`
          SELECT gift_card_discount FROM subscription_type
          WHERE id::varchar=${userSubscription.subscription!.type as string}`
      const discount = discountData.rows[0].gift_card_discount
      switch (discount) {
        case '5':
          return { price: giftCard.stripe_price_id_5_off, coupon }
        case '7.5':
          return { price: giftCard.stripe_price_id_7_off, coupon }
        case '12':
          return { price: giftCard.stripe_price_id_12_off, coupon }
        default:
          return { price: giftCard.stripe_full_price_id, coupon }
      }
    }
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Unable to retrieve gift card information')
  }
}

export const giftCardCheckoutAction = async (
  uid: string,
  value: string,
  formData: FormData
) => {
  try {
    const newGiftCard = await createGiftCardInDB(uid, value, formData)
    const { price, coupon } = await retrievePriceAndCoupon(uid, value)
    const checkoutUrl = await createCheckoutSession(
      price,
      coupon,
      newGiftCard,
      value
    )
    return checkoutUrl
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }
  }
}
