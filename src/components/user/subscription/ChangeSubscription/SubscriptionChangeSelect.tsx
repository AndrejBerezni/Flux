import Image from 'next/image'

import { ISubscriptionWithDescription } from '@/compiler/interfaces'
import { MonthYear } from '@/compiler/types'

export default function SubscriptionChangeSelect({
  subscription,
  period,
  handleSelect,
}: {
  subscription: ISubscriptionWithDescription
  period: MonthYear
  handleSelect: (subscription: ISubscriptionWithDescription) => void
}) {
  return (
    <button
      className="flex min-h-[300px] w-full flex-col justify-between gap-4 bg-white px-4 pb-6 pt-3 shadow-md duration-200 hover:-translate-y-1 active:scale-[98%] sm:w-[45%]"
      onClick={() => handleSelect(subscription)}
    >
      <div className="flex w-full items-center justify-between max-[340px]:flex-col">
        <Image
          src="/FLUX-logo-black-nobg.png"
          alt="Flux Logo"
          width={80}
          height={32}
        />
        <h3 className="text-3xl font-extrabold uppercase">
          {subscription.name}
        </h3>
      </div>
      <ul className="flex list-disc flex-col items-start justify-start pl-5">
        {subscription.description.map((desc) => (
          <li
            key={`${desc.text}-select-change-sub`}
            className="text-start font-semibold text-secondaryText"
          >
            {desc.text}
          </li>
        ))}
      </ul>
      <p className="self-center text-3xl font-bold text-brand">
        {period === 'month'
          ? Number(subscription.price_monthly).toLocaleString('de-De', {
              style: 'currency',
              currency: 'EUR',
            })
          : Number(subscription.price_yearly).toLocaleString('de-De', {
              style: 'currency',
              currency: 'EUR',
            })}{' '}
        / {period}
      </p>
    </button>
  )
}
