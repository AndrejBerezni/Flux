import { useId, useRef } from 'react'

import clsx from 'clsx'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'

import { hideModal } from '@/store/modal'

export default function RadioSort({
  labelText,
  sortValue,
  name,
}: {
  labelText: string
  sortValue: string
  name: string
}) {
  const dispatch = useDispatch()

  const radioId = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleApplySort = useDebouncedCallback((currentValue: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', currentValue)
    replace(`${pathname}?${params.toString()}`)
  }, 1000)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value
    handleApplySort(currentValue)
  }

  return (
    <div className="my-2 flex items-center">
      <input
        id={radioId}
        ref={inputRef}
        type="radio"
        value={sortValue}
        name={name}
        className="appearance-none"
        onChange={(e) => handleChange(e)}
      />
      <label
        htmlFor={radioId}
        className={clsx(
          'text-lg font-semibold capitalize duration-200 hover:cursor-pointer hover:text-brand',
          {
            'text-primary': !inputRef.current?.checked,
            'text-brand': inputRef.current?.checked,
          }
        )}
        onClick={() => dispatch(hideModal())}
      >
        {labelText}
      </label>
    </div>
  )
}
