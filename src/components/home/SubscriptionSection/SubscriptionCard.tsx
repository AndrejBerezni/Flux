import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'

import { inter } from '@/app/fonts'

interface ISubscriptionPrices {
  month: number
  year: number
}

interface ISubscription {
  title: string
  benefits: string[]
  prices: ISubscriptionPrices
}

export default function SubscriptionCard({
  subscription,
}: {
  subscription: ISubscription
}) {
  return (
    <div className="relative z-0 h-[500px] w-[300px] overflow-hidden rounded-lg bg-primary p-6 shadow-lg max-[320px]:w-[240px] md:w-[240px] md:max-w-[30%] md:duration-300 md:hover:scale-105 md:hover:shadow-2xl lg:w-[300px]">
      {/* Subscription name and details */}
      <div className="mb-6 flex items-end gap-2">
        <Image
          src="/FLUX-logo-white-nobg.png"
          alt="flux logo"
          width={80}
          height={32}
        />
        <h3 className="text-[32px] font-bold leading-[30px] text-white md:text-xl lg:text-[32px]">
          {subscription.title}
        </h3>
      </div>
      <ul className="list-disc pl-4">
        {subscription.benefits.map((benefit) => (
          <li key={benefit} className="mb-2 font-semibold text-tertiary">
            {benefit}
          </li>
        ))}
      </ul>
      {/* Subscription prices visible on >md screen only: */}
      <div className="absolute bottom-6 right-2 hidden w-auto flex-col items-end md:flex">
        <p
          className={`${inter.className} mb-2 font-extrabold text-brand md:text-base lg:text-xl`}
        >
          {subscription.prices.month.toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
          })}{' '}
          / month
        </p>
        <p
          className={`${inter.className} mb-2 font-extrabold text-brand md:text-base lg:text-xl`}
        >
          <span className="mr-2 text-secondary line-through">
            {(subscription.prices.month * 12).toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
            })}
          </span>
          {subscription.prices.year.toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
          })}{' '}
          / year
        </p>
      </div>
      {/* Button with link to subscriptions page visible on small screen only:*/}
      <button className="btn-primary absolute bottom-5 right-5 flex items-center gap-2 md:hidden">
        Learn more
        <FaArrowRight />
      </button>
      <div className="absolute left-0 top-2/3 z-[-1] h-full w-[150%] -rotate-[15deg] bg-white"></div>
    </div>
  )
}
