import { ISubscription, IUserSubscription } from '@/compiler/interfaces'
import Divider from '@/components/Divider'

import UserSubscriptionActionButtons from './UserSubscriptionActionButtons'

function DetailTextRow({
  detail,
}: {
  detail: { title: string; value: string }
}) {
  return (
    <li className="my-4 flex items-end text-base text-secondaryText md:text-xl">
      <p className="leading-4">{detail.title}</p>
      <div className="mx-[2px] h-full flex-1 border-b-[1px] border-dotted border-b-secondary"></div>
      <p className="font-bold capitalize leading-4 text-brand">
        {detail.value}
      </p>
    </li>
  )
}

export default function UserSubscriptionDetails({
  subscription,
  subscriptionInfo,
  subscriptionBenefits,
}: {
  subscription: IUserSubscription
  subscriptionInfo: ISubscription
  subscriptionBenefits: string[]
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
            <DetailTextRow detail={row} key={`${row.title}-user-sub-detail`} />
          ))}
          {/* If subscription has been canceled, show ending date */}
          {subscription.end_date ? (
            <>
              <DetailTextRow
                detail={{
                  title: 'Status',
                  value: 'Cancelled',
                }}
              />
              <DetailTextRow
                detail={{
                  title: 'Ends on',
                  value: `${subscription.end_date.toDateString()}`,
                }}
              />
            </>
          ) : (
            <DetailTextRow
              detail={{
                title: 'Status',
                value: 'Active',
              }}
            />
          )}
        </ul>
        <ul>
          <h3 className="text-2xl font-bold md:text-3xl">Includes:</h3>
          {subscriptionBenefits.map((benefit) => (
            <li
              key={`${benefit}-user-page-sub-benefit`}
              className="my-2 text-base text-secondaryText md:text-xl"
            >
              {subscription.selected_vehicle
                ? benefit.replace(
                    'selected vehicle type',
                    subscription.selected_vehicle
                  )
                : benefit}
            </li>
          ))}
        </ul>
      </div>
      <Divider />
      <UserSubscriptionActionButtons subscription={subscription} />
    </div>
  )
}
