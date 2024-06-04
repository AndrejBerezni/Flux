import { robotoCondensed } from '@/app/fonts'
import Divider from '@/components/Divider'
import GiftCardForm from '@/components/giftcards/GiftCardForm'

export default function GiftCardCheckout({
  searchParams,
}: Readonly<{
  searchParams?: { value?: string }
}>) {
  const value = searchParams?.value || '200'
  return (
    <article className="flex h-full flex-col items-center justify-center gap-6 bg-quaternary p-6 md:p-12">
      <h2
        className={`${robotoCondensed.className} text-center text-4xl font-extrabold uppercase tracking-wide text-primary`}
      >
        Add Information
      </h2>
      <Divider />
      <GiftCardForm value={value} />
    </article>
  )
}
