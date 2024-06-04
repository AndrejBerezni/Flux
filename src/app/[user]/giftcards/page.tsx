import { sql } from '@vercel/postgres'

export const fetchCache = 'force-no-store'
import { IGiftCard } from '@/compiler/interfaces'
import Divider from '@/components/Divider'
import GiftCardDetails from '@/components/user/giftcards/GiftCardDetails'
import NoUserContent from '@/components/user/NoUserContent'
import UserPageHeading from '@/components/user/UserPageHeading'

export default async function AccountGiftCardsPage({
  params,
}: Readonly<{
  params: { user: string }
}>) {
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
      <UserPageHeading
        title="Gift card purchase history"
        subtitle="Spreading joy, one gift at a time"
      />
      <Divider />
      <div className=" flex-1 overflow-y-auto">
        {giftCards.length > 0 ? (
          giftCards.map((giftCard) => (
            <GiftCardDetails
              key={giftCard.id}
              giftCard={giftCard as IGiftCard}
            />
          ))
        ) : (
          <NoUserContent
            contentText="purchased gift cards"
            linkHref="/giftcards"
            linkText="Purchase now"
          />
        )}
      </div>
    </section>
  )
}
