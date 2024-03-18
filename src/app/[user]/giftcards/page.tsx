import { sql } from '@vercel/postgres'

export const fetchCache = 'force-no-store'
import { IGiftCard } from '@/compiler/interfaces'
import Divider from '@/components/Divider'
import GiftCardDetails from '@/components/user/giftcards/GiftCardDetails'

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
    <section className="flex max-h-[80vh] max-w-full flex-1 flex-col rounded-md bg-white p-6 shadow-md lg:max-h-[70vh]">
      <h1 className="text-2xl font-bold uppercase md:text-3xl">
        Gift card purchase history
      </h1>
      <p className=" my-1 text-base md:my-2 md:text-xl">
        Spreading Joy, One Gift at a Time
      </p>
      <Divider />
      <div className=" flex-1 overflow-y-auto">
        {giftCards ? (
          giftCards.map((giftCard) => (
            <GiftCardDetails
              key={giftCard.id}
              giftCard={giftCard as IGiftCard}
            />
          ))
        ) : (
          <p>No gift cards purchased yet</p>
        )}
      </div>
    </section>
  )
}
