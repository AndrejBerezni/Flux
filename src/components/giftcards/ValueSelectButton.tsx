'use client'
import clsx from 'clsx'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

import { robotoCondensed } from '@/app/fonts'

export default function ValueSelectButton({
  value,
  currentValue,
}: {
  value: number
  currentValue: string
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const setValue = () => {
    const params = new URLSearchParams(searchParams)
    params.set('value', value.toString())
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <button
      type="button"
      onClick={setValue}
      className={clsx(
        `h-[50px] w-[100px] rounded-full border-2 bg-white text-lg font-extrabold tracking-wide text-primary shadow-md transition-transform duration-200  md:w-[120px] md:text-xl ${robotoCondensed.className}`,
        {
          'scale-110 border-brand  ': Number(currentValue) === value,
          ' border-secondary hover:scale-110 hover:bg-white hover:shadow-lg active:scale-105 active:shadow-md active:outline active:outline-2 active:-outline-offset-4 active:outline-tertiary':
            Number(currentValue) !== value,
        }
      )}
    >
      {value.toLocaleString('de-De', { style: 'currency', currency: 'EUR' })}
    </button>
  )
}
