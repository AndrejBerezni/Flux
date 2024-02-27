import Link from 'next/link'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

import { robotoCondensed } from '@/app/fonts'
import ValueSelectButton from '@/components/giftcards/ValueSelectButton'

export default function SelectGiftCard({
  searchParams,
}: {
  searchParams?: {
    value?: string
  }
}) {
  const values = [20, 50, 100, 200, 500, 1000]
  const selectedValue = searchParams?.value || '200'
  return (
    <article className="flex h-full flex-col items-center justify-center gap-6 bg-quaternary p-6 md:gap-12 md:p-12">
      <h2
        className={`${robotoCondensed.className} text-center text-4xl font-extrabold uppercase tracking-wide text-primary`}
      >
        Select Gift Card Value
      </h2>
      <div className="h-[1px] w-full bg-tertiary"></div>
      <div className="grid grid-cols-2 gap-8 ">
        {values.map((value) => (
          <ValueSelectButton
            value={value}
            key={`${value}-gift-card-select-button`}
            currentValue={selectedValue}
          />
        ))}
      </div>
      <div className="my-3 h-[1px] w-full bg-tertiary"></div>
      <div className="flex gap-8">
        <Link
          href="/giftcards"
          className="btn-primary flex items-center gap-2 shadow-md"
        >
          <IoIosArrowBack />
          Back
        </Link>
        <Link
          href="/giftcards"
          className="btn-primary flex items-center gap-2 shadow-md"
        >
          Next
          <IoIosArrowForward />
        </Link>
      </div>
    </article>
  )
}
