import Link from 'next/link'

import { robotoCondensed } from '@/app/fonts'

export default async function GiftCardSuccessPage({
  searchParams,
}: {
  searchParams?: { gcId?: string; sessionId?: string }
}) {
  const giftCardId = searchParams?.gcId || ''
  const sessionId = searchParams?.sessionId || ''
  return (
    <main className="section-padding flex min-h-[70vh] flex-1 flex-col items-center justify-center">
      <h1
        className={`${robotoCondensed.className} mb-10 text-center text-2xl font-semibold md:text-3xl`}
      >
        Gift card has been sent.
      </h1>
      <p>{giftCardId}</p>
      <p>{sessionId}</p>
      <Link className="btn-primary" href="/">
        Back to home page
      </Link>
    </main>
  )
}
