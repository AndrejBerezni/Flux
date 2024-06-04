import { robotoCondensed } from '@/app/fonts'
import { MonthYear, SubscriptionName } from '@/compiler/types'

export default function ReviewSubscription({
  subName,
  subPeriod,
  subDetails,
  subPrice,
}: Readonly<{
  subName: SubscriptionName
  subPeriod: MonthYear
  subDetails: string[]
  subPrice: string
}>) {
  return (
    <div className={`${robotoCondensed.className} flex flex-col gap-3`}>
      <h2 className="my-2 text-center text-3xl font-bold text-primary">
        Review Details
      </h2>
      <p className="text-xl">
        Selected subscription:{' '}
        <span className="font-semibold capitalize">Flux {subName}</span>
      </p>
      <ul>
        <h3 className="text-xl">Included benefits:</h3>
        {subDetails.map((detail) => (
          <li key={`${detail}-sub-detail`} className="text-lg font-semibold">
            {detail}
          </li>
        ))}
      </ul>
      <p className="text-xl">
        Subscription period:{' '}
        <span className="font-semibold capitalize">{subPeriod}</span>
      </p>
      <p className="text-xl">
        Price per subscription period:{' '}
        <span className="font-semibold capitalize">
          {Number(subPrice).toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
          })}
        </span>
      </p>
    </div>
  )
}
