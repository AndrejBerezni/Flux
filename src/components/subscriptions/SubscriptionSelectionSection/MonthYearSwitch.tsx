import clsx from 'clsx'

import { MonthYear } from '@/compiler/types'

export default function MonthYearSwitch({
  period,
  selectPeriod,
}: Readonly<{
  period: string
  selectPeriod: (period: MonthYear) => void
}>) {
  return (
    <div className="mb-4 flex self-center overflow-hidden rounded-md border-2 border-tertiary">
      <button
        type="button"
        onClick={() => selectPeriod('month')}
        className={clsx('h-auto w-[120px] py-2 font-bold duration-200', {
          'bg-white text-lg': period === 'month',
          'bg-tertiary text-secondary hover:text-primary': period === 'year',
        })}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => selectPeriod('year')}
        className={clsx('h-auto w-[120px] py-2 font-bold duration-200', {
          'bg-white text-lg': period === 'year',
          'bg-tertiary text-secondary hover:text-primary': period === 'month',
        })}
      >
        Yearly
      </button>
    </div>
  )
}
