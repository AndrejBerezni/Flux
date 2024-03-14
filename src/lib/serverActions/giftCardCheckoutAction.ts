'use server'

import { sql } from '@vercel/postgres'

export const giftCardCheckoutAction = async (
  prevState: {
    uid: string
    value: string
    message: string
  },
  formData: FormData
) => {
  try {
    //get type of gift card
    const giftCardTypeIdData = await sql`
        SELECT id FROM gift_card_type
        WHERE amount=${Number(prevState.value)}
        `
    const giftCardTypeId = giftCardTypeIdData.rows[0].id
    //add new gift card to db, according to the data you have now
    const newGiftCard = await sql`
    INSERT INTO gift_cards(user_id, gift_card_type, recipient_email, recipient_name, sender_name, message_for_recipient)
    VALUES(${prevState.uid}, ${giftCardTypeId}, ${
      formData.get('gc-rec-email') as string
    }, ${formData.get('gc-rec-name') as string}, ${
      formData.get('gc-sender') as string
    }, ${formData.get('gc-message') as string})`
    console.log(newGiftCard.rows[0])
    return {
      uid: prevState.uid,
      value: prevState.value,
      message: 'Success',
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
    return {
      uid: prevState.uid,
      value: prevState.value,
      message: 'Failed',
    }
  }
}
