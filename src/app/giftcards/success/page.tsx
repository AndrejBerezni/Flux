import { sql } from '@vercel/postgres'
import Link from 'next/link'

import { robotoCondensed } from '@/app/fonts'
import { createPromotionCode } from '@/stripe/giftcards'

export default async function GiftCardSuccessPage({
  searchParams,
}: {
  searchParams?: { gcId?: string; coupon?: string; value?: string }
}) {
  const giftCardId = searchParams?.gcId || ''
  const couponId = searchParams?.coupon || ''
  const value = searchParams?.value || ''

  const updateGiftCardData = async () => {
    try {
      //create code to be sent
      const giftCardCode = await createPromotionCode(couponId)

      //update db
      const data = await sql`
      UPDATE gift_cards
      SET stripe_code=${giftCardCode}, payment_successful=true
      WHERE id::varchar=${giftCardId}
      RETURNING stripe_code, recipient_email, recipient_name, sender_name, message_for_recipient;`
      const updatedGiftCard = data.rows[0]
      const requestBody = {
        email: updatedGiftCard.recipient_email,
        recipient: updatedGiftCard.recipient_name,
        sender: updatedGiftCard.sender_email,
        cardValue: value,
        code: updatedGiftCard.stripe_code,
        message: updatedGiftCard.message_for_recipient,
      }

      //send email using Route Handler
      const response = await fetch('/api/giftcards/send', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(requestBody),
      })
      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(
          errorResponse.error || 'Error occurred, please try later.'
        )
      }

      //display success text
      return 'Flux Gift Card has been sent successfully!'
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error('Unknown error occured')
      }
      return 'Error occured, please contact our support for assitance. Apologies for the inconvenience.'
    }
  }

  const status = await updateGiftCardData()

  return (
    <main className="section-padding flex min-h-[70vh] flex-1 flex-col items-center justify-center">
      <h1
        className={`${robotoCondensed.className} mb-10 text-center text-2xl font-semibold md:text-3xl`}
      >
        {status}
      </h1>
      <Link className="btn-primary" href="/">
        Back to home page
      </Link>
    </main>
  )
}
