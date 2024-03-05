import { sql } from '@vercel/postgres'

import { robotoCondensed } from '@/app/fonts'
import { ISubscription, IUserSubscription } from '@/compiler/interfaces'
import NoActiveSubscription from '@/components/user/subscription/NoActiveSubscription'
import UserSubscriptionDetails from '@/components/user/subscription/UserSubscriptionDetails'
import {
  checkIfUserHasActiveSubscription,
  fetchSubscriptionDetails,
} from '@/lib/dbQueries/subscriptions'
export default async function AccountSubscriptionsPage({
  params,
}: {
  params: { user: string }
}) {
  const uid = params.user || ''

  // We check if user has active subscription and if yes, we retrieve that row from db.
  // Then in the next function we gather general details about the type of subscription user is subscribed to.
  // In the end, all that is passed to component that displays this information.
  const sub = await checkIfUserHasActiveSubscription(uid)

  const getSubscriptionInformation = async (sub: {
    hasSubscription: boolean
    subscription: IUserSubscription | null
  }) => {
    if (!sub.hasSubscription || !sub.subscription) {
      return
    }
    const data = await sql`
    SELECT *
    FROM subscription_type
    WHERE id::varchar=${sub.subscription.type}`
    const details = await fetchSubscriptionDetails(data.rows[0].name)

    return { info: data.rows[0], details }
  }

  const subInfo = await getSubscriptionInformation(
    sub as {
      hasSubscription: boolean
      subscription: IUserSubscription | null
    }
  )

  return (
    <section
      className={`${robotoCondensed.className} max-w-full flex-1 rounded-md bg-white p-6 shadow-md`}
    >
      <h1 className="text-3xl font-bold uppercase">Your subscription</h1>
      {!sub.hasSubscription && <NoActiveSubscription />}
      {subInfo && sub.subscription && (
        <UserSubscriptionDetails
          subscription={sub.subscription as IUserSubscription}
          subscriptionInfo={subInfo.info as ISubscription}
          subscriptionDetails={subInfo.details}
        />
      )}
    </section>
  )
}
