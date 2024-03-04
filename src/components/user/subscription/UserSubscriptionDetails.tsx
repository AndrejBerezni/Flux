import { ISubscription, IUserSubscription } from '@/compiler/interfaces'

export default function UserSubscriptionDetails({
  subscription,
  subscriptionInfo,
  subscriptionDetails,
}: {
  subscription: IUserSubscription
  subscriptionInfo: ISubscription
  subscriptionDetails: string[]
}) {
  const textRows = [
    { title: 'Subscription name', value: `Flux ${subscriptionInfo.name}` },
    {
      title: 'Started on',
      value: `${subscription.start_date.toDateString()}`,
    },
    { title: 'Billed', value: `${subscription.subscription_period}ly` },
    {
      title: 'Price',
      value: `${Number(
        subscription.subscription_period == 'month'
          ? subscriptionInfo.price_monthly
          : subscriptionInfo.price_yearly
      ).toLocaleString('de-De', { style: 'currency', currency: 'EUR' })} / ${
        subscription.subscription_period
      }`,
    },
  ]
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
      <ul>
        <h3 className="text-xl font-bold">Details:</h3>
        {textRows.map((row) => (
          <li
            key={`${row.title}-user-sub-row`}
            className="text-lg text-secondaryText"
          >
            {row.title}:{' '}
            <span className="font-bold capitalize text-brand">{row.value}</span>
          </li>
        ))}
      </ul>
      <ul>
        <h3 className="text-xl font-bold">Subscription includes:</h3>
        {subscriptionDetails.map((detail) => (
          <li
            key={`${detail}-user-page-sub-detail`}
            className="text-lg text-primary"
          >
            {detail}
          </li>
        ))}
      </ul>
    </div>
  )
}
