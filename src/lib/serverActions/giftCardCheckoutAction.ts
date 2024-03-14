'use server'

import { sql } from '@vercel/postgres'

import { checkIfUserHasActiveSubscription } from '../dbQueries/subscriptions'

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
    if (error instanceof Error) {
      return error.message
    }
  }
}

const retrievePriceId = async (uid: string, value: string) => {
  try {
    //get gift card details
    const data = await sql`
        SELECT * FROM gift_card_type
        WHERE amount=${Number(value)}
        `
    const giftCard = data.rows[0]

    //we are checking if user has subscription, to know which price for gift card to apply (user might have discount)
    const userSubscription = await checkIfUserHasActiveSubscription(uid)
    if (!userSubscription.hasSubscription) {
      return giftCard.stripe_full_price_id
    } else {
      const discountData = await sql`
          SELECT gift_card_discount FROM subscription_type
          WHERE id::varchar=${userSubscription.subscription!.type as string}`
      const discount = discountData.rows[0].gift_card_discount
      switch (discount) {
        case '5':
          return giftCard.stripe_price_id_5_off
        case '7.5':
          return giftCard.stripe_price_id_7_off
        case '12':
          return giftCard.stripe_price_id_12_off
        default:
          return giftCard.stripe_full_price_id
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }
  }
}

export const giftCardCheckoutAction = async (
  uid: string,
  value: string,
  formData: FormData
) => {
  try {
    const newGiftCard = await createGiftCardInDB(uid, value, formData)
    const priceId = await retrievePriceId(uid, value)
    console.log(priceId, newGiftCard)
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }
  }
}
