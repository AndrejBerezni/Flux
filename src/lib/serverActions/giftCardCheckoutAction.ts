'use server'

import { sql } from '@vercel/postgres'

export const giftCardCheckoutAction = async (
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
    }, ${formData.get('gc-message') as string})`
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }
  }
}
