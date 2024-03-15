import { sql } from '@vercel/postgres'
import Link from 'next/link'

import { robotoCondensed } from '@/app/fonts'
import { createPromotionCode } from '@/stripe/giftcards'

export default async function GiftCardSuccessPage({
  searchParams,
}: {
  searchParams?: { gcId?: string; coupon?: string }
}) {
  const giftCardId = searchParams?.gcId || ''
  const couponId = searchParams?.coupon || ''

  const updateGiftCardData = async () => {
    try {
      const giftCardCode = await createPromotionCode(couponId)
      await sql`
      UPDATE gift_cards
      SET stripe_code=${giftCardCode}, payment_successful=true
      WHERE id::varchar=${giftCardId}`
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
