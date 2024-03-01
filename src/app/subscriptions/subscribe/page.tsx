import { MonthYear, SubscriptionName } from '@/compiler/types'
import Divider from '@/components/Divider'
import CheckoutRedirect from '@/components/subscriptions/CheckoutRedirect'
import ReviewSubscription from '@/components/subscriptions/ReviewSubscription'
import SelectVehicleType from '@/components/subscriptions/SelectVehicleType'
import { fetchSubscriptionDetails } from '@/lib/fetchSubscriptions'

export default async function SubscribePage({
  searchParams,
}: {
  searchParams?: {
    name?: SubscriptionName
    period?: MonthYear
    subId?: string
    price?: string
  }
}) {
  const name = searchParams?.name || 'Basic'
  const period = searchParams?.period || 'month'
  const subId = searchParams?.subId || ''
  const price = searchParams?.price || ''
  const details = await fetchSubscriptionDetails(name)

  return (
    <main className="section-padding flex flex-1 flex-col items-center gap-4 bg-quaternary">
      <h1 className="mb-4 text-3xl font-bold text-primary">
        Finalize Subscription
      </h1>
      {(name === 'Basic' || name === 'Gold') && <SelectVehicleType />}
      <ReviewSubscription
        subName={name}
        subPeriod={period}
        subDetails={details}
        subPrice={price}
      />
      <Divider />
      <CheckoutRedirect subId={subId} />
    </main>
  )
}
