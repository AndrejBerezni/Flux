import { useState } from 'react'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

import { inter, robotoCondensed } from '@/app/fonts'

export default function SubscriptionSelect({
  subscription,
  period,
}: {
  subscription: {
    title: string
    benefits: string[]
    prices: { month: number; year: number }
  }
  period: 'month' | 'year'
}) {
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false)
  return (
    <article
      className={`${robotoCondensed.className} relative flex w-full flex-col items-center gap-2 rounded-md bg-white  px-10 py-6 shadow-lg duration-300 md:flex-row xl:w-3/4`}
    >
      <div>
        <h2 className="mb-2 flex items-center justify-center gap-3 text-center text-4xl font-extrabold leading-[30px] tracking-wide text-primary  md:justify-start md:text-start">
          <Image
            src="/FLUX-logo-black-nobg.png"
            alt="flux logo"
            width={80}
            height={32}
          />
          {subscription.title}
        </h2>
        <button
          className="hidden items-center gap-2 rounded-full bg-brand pl-2 pr-4 font-semibold text-white md:flex"
          onClick={() => setDetailsVisible((prev) => !prev)}
        >
          {detailsVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}Details
        </button>
        <ul
          className={clsx(
            'flex list-disc flex-col gap-2 overflow-hidden pl-8',
            {
              'my-4 h-auto md:my-0 md:h-0': !detailsVisible,
              'my-4 h-auto': detailsVisible,
            }
          )}
          style={{ transitionProperty: 'height' }}
        >
          {subscription.benefits.map((benefit) => (
            <li key={`${benefit}-sub-ben`} className="font-semibold">
              {benefit}
            </li>
          ))}
        </ul>
      </div>
      <button
        className={`${inter.className} btn-primary py-3 text-lg font-semibold tracking-wide md:ml-auto md:min-w-[300px] md:text-xl`}
      >
        <Link href="/">
          Subscribe for{' '}
          {period === 'month'
            ? subscription.prices.month.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })
            : subscription.prices.year.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })}
        </Link>
      </button>
    </article>
  )
}
