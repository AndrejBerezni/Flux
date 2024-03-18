import Link from 'next/link'

import { robotoCondensed } from '@/app/fonts'
import { handlePurchasedGiftCardAction } from '@/lib/serverActions/handlePurchasedGiftCardAction'

export const fetchCache = 'force-no-store'

export default async function GiftCardSuccessPage({
  searchParams,
}: {
  searchParams?: { gcId?: string; coupon?: string; value?: string }
}) {
  const giftCardId = searchParams?.gcId || ''
  const couponId = searchParams?.coupon || ''
  const value = searchParams?.value || ''

  const status = await handlePurchasedGiftCardAction(
    giftCardId,
    couponId,
    value
  )

  return (
    <main className="section-padding flex h-full flex-1 flex-col items-center bg-quaternary pt-16 md:min-h-[70vh] md:justify-center md:pt-0">
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
