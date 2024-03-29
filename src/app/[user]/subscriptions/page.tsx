import { sql } from '@vercel/postgres'

import { ISubscription, IUserSubscription } from '@/compiler/interfaces'
import Divider from '@/components/Divider'
import NoUserContent from '@/components/user/NoUserContent'
import UserSubscriptionDetails from '@/components/user/subscription/UserSubscriptionDetails'
import {
  checkIfUserHasActiveSubscription,
  fetchSubscriptionDetails,
} from '@/lib/dbQueries/subscriptions'

export const fetchCache = 'force-no-store'

export default async function AccountSubscriptionsPage({
  params,
}: {
  params: { user: string }
}) {
  const uid = params.user || ''

  // We check if user has active subscription and if yes, we retrieve that row from db.
  // Then in the next function we gather benefits from the type of subscription user is subscribed to.
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
    const benefits = await fetchSubscriptionDetails(data.rows[0].name)

    return { info: data.rows[0], benefits }
  }

  const subInfo = await getSubscriptionInformation(
    sub as {
      hasSubscription: boolean
      subscription: IUserSubscription | null
    }
  )

  return (
    <section className="flex max-w-full flex-1 flex-col rounded-md bg-white p-6 shadow-md">
      <h1 className="text-2xl font-bold uppercase md:text-3xl">
        Your subscription
      </h1>
      <h2 className="my-1 text-base md:my-2 md:text-xl">
        Power up your ride, manage your subscriptions here
      </h2>
      <Divider />
      {!sub.hasSubscription && (
        <NoUserContent
          contentText="an active Flux subscription"
          linkHref="/subscriptions"
          linkText="Subscribe now"
        />
      )}
      {subInfo && sub.subscription && (
        <UserSubscriptionDetails
          subscription={sub.subscription as IUserSubscription}
          subscriptionInfo={subInfo.info as ISubscription}
          subscriptionBenefits={subInfo.benefits}
        />
      )}
    </section>
  )
}
