import Link from 'next/link'

import { robotoCondensed } from '@/app/fonts'
import { updateSubscriptionToActive } from '@/lib/db_queries/subscriptions'
import { retrieveSubscriptionIdfromSession } from '@/stripe/subscriptions'

export default async function SubscriptionSuccessfulPage({
  searchParams,
}: {
  searchParams?: { subId?: string; sessionId?: string }
}) {
  const subscriptionId = searchParams?.subId || ''
  const sessionId = searchParams?.sessionId || ''

  try {
    const stripeSubId = await retrieveSubscriptionIdfromSession(sessionId)
    await updateSubscriptionToActive(subscriptionId, stripeSubId as string)
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error:', error.message)
    }
  }

  return (
    <main className="section-padding flex min-h-[70vh] flex-1 flex-col items-center justify-center bg-quaternary">
      <h1
        className={`${robotoCondensed.className} mb-10 text-center text-2xl font-semibold md:text-3xl`}
      >
        Congratulations, you have successfully subscribed to Flux!
      </h1>
      <Link className="btn-primary" href="/">
        Back to home page
      </Link>
    </main>
  )
}
