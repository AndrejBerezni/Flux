'use server'
import { sql } from '@vercel/postgres'

import GiftCardEmail from '@/components/emails/giftcard'
import { resend } from '@/components/emails/resend-config'
import { createPromotionCode } from '@/stripe/giftcards'

const checkIfAlreadySent = async (giftCardId: string) => {
  try {
    const giftCardData = await sql`
      SELECT gift_card_sent
      FROM gift_cards
      WHERE id::varchar=${giftCardId}`
    return giftCardData.rows[0].gift_card_sent
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Unknown error occured'
    )
  }
}

const updateGiftCardData = async (
  giftCardId: string,
  code: string,
  value: string
) => {
  try {
    const data = await sql`
      UPDATE gift_cards
      SET stripe_code=${code}, payment_successful=true, gift_card_sent=true
      WHERE id::varchar=${giftCardId}
      RETURNING stripe_code, recipient_email, recipient_name, sender_name, message_for_recipient;`
    const updatedGiftCard = data.rows[0]
    return {
      email: updatedGiftCard.recipient_email,
      recipient: updatedGiftCard.recipient_name,
      sender: updatedGiftCard.sender_name,
      cardValue: value,
      code: updatedGiftCard.stripe_code,
      message: updatedGiftCard.message_for_recipient,
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Unknown error occured'
    )
  }
}

const sendEmail = async (emailData: {
  email: string
  recipient: string
  sender: string
  cardValue: string
  code: string
  message: string
}) => {
  try {
    const { email, recipient, sender, cardValue, code, message } = emailData
    await resend.emails.send({
      from: 'Flux Gift Cards <giftcards@fluxecodrive.com>',
      to: email,
      subject: `${sender} has sent you a Flux Gift Card!`,
      react: GiftCardEmail({ recipient, sender, cardValue, code, message }),
    })
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Unknown error occured'
    )
  }
}

export const handlePurchasedGiftCardAction = async (
  giftCardId: string,
  couponId: string,
  value: string
) => {
  try {
    const alreadySent = await checkIfAlreadySent(giftCardId)
    if (alreadySent) {
      return 'Gift Card already sent!'
    }
    const code = await createPromotionCode(couponId)
    const emailData = await updateGiftCardData(giftCardId, code, value)
    if (emailData) {
      await sendEmail(emailData)
    } else {
      throw new Error(
        'Unable to get gift card data. Please contact our support for assitance.'
      )
    }
    return `Flux Gift Card has been sent successfully!`
  } catch (error) {
    return error instanceof Error
      ? error.message
      : 'Error occured, please contact our support for assitance. Apologies for the inconvenience.'
  }
}
