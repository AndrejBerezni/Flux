import { useState } from 'react'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

import { inter, robotoCondensed } from '@/app/fonts'
import { ISubscriptionWithDescription } from '@/compiler/interfaces'
import { MonthYear } from '@/compiler/types'

export default function SubscriptionSelect({
  subscription,
  period,
}: Readonly<{
  subscription: ISubscriptionWithDescription
  period: MonthYear
}>) {
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false)

  return (
    <article
      className={`${robotoCondensed.className} relative flex w-full flex-col items-center gap-2 rounded-md bg-white px-10 py-6 shadow-lg duration-300 md:flex-row xl:w-3/4`}
    >
      <div>
        <h2 className="mb-2 flex items-center justify-center gap-3 text-center text-4xl font-extrabold leading-[30px] tracking-wide text-primary  md:justify-start md:text-start">
          <Image
            src="/FLUX-logo-black-nobg.png"
            alt="flux logo"
            width={80}
            height={32}
          />
          {subscription.name}
        </h2>
        <button
          className="hidden items-center gap-2 rounded-full bg-brand pl-2 pr-4 font-semibold text-white md:flex"
          onClick={() => setDetailsVisible((prev) => !prev)}
        >
          {detailsVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}Details
        </button>
        <ul
          className={clsx(
            'my-4 flex list-disc flex-col gap-2 overflow-hidden pl-8 transition-all duration-300',
            {
              'h-auto md:h-0': !detailsVisible,
              'h-auto md:h-[120px]': detailsVisible,
            }
          )}
          style={{ transitionProperty: 'height' }}
        >
          {subscription.description.map((desc) => (
            <li key={`${desc.text}-sub-ben`} className="font-semibold">
              {desc.text}
            </li>
          ))}
        </ul>
      </div>
      <Link
        className={`${inter.className} btn-primary py-3 text-lg font-semibold tracking-wider md:ml-auto md:min-w-[300px] md:text-xl`}
        href={`/subscriptions/subscribe?name=${
          subscription.name
        }&period=${period}&subId=${subscription.id}&subStripeId=${
          period === 'month'
            ? subscription.stripe_monthly_prod_id
            : subscription.stripe_yearly_prod_id
        }&price=${
          period === 'month'
            ? subscription.price_monthly
            : subscription.price_yearly
        }`}
      >
        Subscribe for{' '}
        {period === 'month'
          ? Number(subscription.price_monthly).toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
            })
          : Number(subscription.price_yearly).toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
            })}
      </Link>
    </article>
  )
}
