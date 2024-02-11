import { useId } from 'react'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function RadioSort({
  labelText,
  sortValue,
  name,
}: {
  labelText: string
  sortValue: string
  name: string
}) {
  const radioId = useId()
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
    <div className="my-2 flex items-center gap-4">
      <input
        id={radioId}
        type="radio"
        value={sortValue}
        name={name}
        defaultChecked
        className="peer hover:cursor-pointer"
        onChange={(e) => handleChange(e)}
      />
      <label
        htmlFor={radioId}
        className="text-lg font-semibold capitalize duration-200 hover:cursor-pointer hover:text-brand peer-hover:text-brand"
      >
        {labelText}
      </label>
    </div>
  )
}
