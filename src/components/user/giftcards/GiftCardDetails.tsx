import { IGiftCard } from '@/compiler/interfaces'

function GCDetail({
  detail,
}: Readonly<{ detail: { title: string; value: string } }>) {
  return (
    <div className="flex flex-col lg:w-1/4">
      <h2 className="text-sm font-semibold text-brand md:text-base">
        {detail.title}:
      </h2>
      <p className="text-base md:text-lg">{detail.value}</p>
    </div>
  )
}

export default function GiftCardDetails({ giftCard }: { giftCard: IGiftCard }) {
  const details = [
    {
      title: 'From',
      value: giftCard.sender_name,
    },
    {
      title: 'To',
      value: `${giftCard.recipient_name} (${giftCard.recipient_email})`,
    },
    {
      title: 'Message',
      value: giftCard.message_for_recipient
        ? `"${giftCard.message_for_recipient}"`
        : 'No message sent with gift card.',
    },
    {
      title: 'Date',
      value: giftCard.date_created.toISOString().split('T')[0],
    },
  ]
  return (
    <article className="my-2 mr-2 flex flex-col justify-between gap-4 rounded-md border-2 p-4 shadow-md lg:flex-row">
      {details.map((detail) => (
        <GCDetail key={`${detail.title}-gc-detail`} detail={detail} />
      ))}
    </article>
  )
}
