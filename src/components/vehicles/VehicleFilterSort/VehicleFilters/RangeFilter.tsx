'use client'
import { useId } from 'react'

import './RangeFilter.css'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import Divider from '@/components/Divider'

export default function RangeFilter({
  labelText,
  filterValues,
  filterQuery,
}: Readonly<{
  labelText: string
  filterValues: string[] | number[]
  filterQuery: string
}>) {
  const filterId = useId()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleApplyFilter = useDebouncedCallback((filterValue: string) => {
    const params = new URLSearchParams(searchParams)
    params.set(filterQuery, filterValue)
    params.set('page', '1')
    replace(`${pathname}?${params.toString()}`)
  }, 1000)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = String(filterValues[Number(event.target.value)])
    handleApplyFilter(filterValue)
  }

  return (
    <div className="mb-6 flex w-full flex-col" aria-label="Range filter">
      <Divider />
      <label
        className="mb-2 font-semibold capitalize"
        htmlFor={filterId}
        aria-label="Filter label"
      >
        {labelText}
      </label>
      <div className="mb-4 flex w-full flex-nowrap justify-between px-1">
        {filterValues.map((filterValue) => (
          <p key={`${filterId}-${filterValue}`} className="inline">
            {filterValue}+
          </p>
        ))}
      </div>
      <input
        type="range"
        id={filterId}
        step={1}
        min={0}
        defaultValue={0}
        onChange={(e) => handleChange(e)}
        max={filterValues.length - 1}
        className="h-[5px] cursor-pointer appearance-none rounded-3xl bg-brand"
      />
    </div>
  )
}
