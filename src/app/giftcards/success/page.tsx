import { sql } from '@vercel/postgres'
import Link from 'next/link'

import { robotoCondensed } from '@/app/fonts'
import SentGiftCard from '@/components/giftcards/SentGiftCard'
export const fetchCache = 'force-no-store'

export default async function GiftCardSuccessPage({
  searchParams,
}: {
  searchParams?: { gcId?: string }
}) {
  const giftCardId = searchParams?.gcId ?? ''

  const giftCardQuery = await sql`
    SELECT recipient_email, recipient_name, sender_name, message_for_recipient
    FROM gift_cards
    WHERE id::varchar=${giftCardId}
  `
  const giftCard = giftCardQuery.rows[0]

  return (
    <main className="section-padding flex h-full flex-1 flex-col items-center gap-10 bg-quaternary pt-16 md:min-h-[70vh] md:justify-center md:pt-0">
      <h1
        className={`${robotoCondensed.className} text-center text-2xl font-semibold md:text-3xl`}
      >
        Gift card successfully sent!
      </h1>
      <SentGiftCard
        email={giftCard.recipient_email}
        sender={giftCard.sender_name}
        recipient={giftCard.recipient_name}
        message={giftCard.message_for_recipient}
      />
      <Link className="btn-primary" href="/">
        Back to home page
      </Link>
    </main>
  )
}
