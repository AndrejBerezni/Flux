import { ISubscription, IUserSubscription } from '@/compiler/interfaces'
import Divider from '@/components/Divider'

import UserSubscriptionActionButtons from './UserSubscriptionActionButtons'

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
    <div className="mt-4 flex flex-1 flex-col gap-8">
      <div className="flex flex-wrap justify-between gap-4">
        <ul className="w-full xl:w-1/2">
          <h3 className="text-2xl font-bold md:text-3xl">Details:</h3>
          {textRows.map((row) => (
            <li
              key={`${row.title}-user-sub-row`}
              className="my-2 flex items-end text-base text-secondaryText md:text-xl"
            >
              <p className="leading-4">{row.title}</p>
              <div className="mx-[2px] h-full flex-1 border-b-[1px] border-dotted border-b-secondary"></div>
              <p className="font-bold capitalize leading-4 text-brand">
                {row.value}
              </p>
            </li>
          ))}
        </ul>
        <ul>
          <h3 className="text-2xl font-bold md:text-3xl">Includes:</h3>
          {subscriptionDetails.map((detail) => (
            <li
              key={`${detail}-user-page-sub-detail`}
              className="text-base text-secondaryText md:text-xl"
            >
              {subscription.selected_vehicle
                ? detail.replace(
                    'selected vehicle type',
                    subscription.selected_vehicle
                  )
                : detail}
            </li>
          ))}
        </ul>
      </div>
      <Divider />
      <UserSubscriptionActionButtons
      // subId={subscription.id}
      // subStripeId={subscription.subscription_stripe_id as string}
      />
    </div>
  )
}
