import { sql } from '@vercel/postgres'
export default async function AccountGiftCardsPage({
  params,
}: {
  params: { user: string }
}) {
  const uid = params.user || ''
  const getGiftCards = async () => {
    try {
      const data = await sql`
      SELECT *
      FROM gift_cards
      WHERE user_id=${uid}
      AND gift_card_sent=true`
      return data.rows
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Unknown error occured'
      )
    }
  }

  const giftCards = await getGiftCards()

  return (
    <section className=" flex max-w-full flex-1 flex-col rounded-md bg-white p-6 shadow-md">
      <h1 className="text-3xl font-bold uppercase">
        Gift card purchase history
      </h1>
      <p className="my-2 text-xl">Spreading Joy, One Gift at a Time</p>
      {giftCards ? (
        giftCards.map((giftCard) => (
          <p key={giftCard.id}>
            {giftCard.sender_name}-{giftCard.recipient_name}:{' '}
            {giftCard.message_for_recipient}
          </p>
        ))
      ) : (
        <p>No gift cards purchased yet</p>
      )}
    </section>
  )
}
