import clsx from 'clsx'

export default function MonthYearSwitch({
  period,
  selectPeriod,
}: {
  period: string
  selectPeriod: (period: 'month' | 'year') => void
}) {
  return (
    <div className="flex self-center overflow-hidden rounded-md border-2 border-tertiary">
      <button
        onClick={() => selectPeriod('month')}
        className={clsx('h-auto w-[120px] py-2 font-bold duration-200', {
          'bg-white text-lg': period === 'month',
          'bg-tertiary text-secondary hover:text-primary': period === 'year',
        })}
      >
        Monthly
      </button>
      <button
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
