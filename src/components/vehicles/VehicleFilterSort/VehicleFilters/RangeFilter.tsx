'use client'
import { useId } from 'react'
import './RangeFilter.css'

export default function RangeFilter({
  labelText,
  filterValues,
}: {
  labelText: string
  filterValues: string[] | number[]
}) {
  const filterId = useId()

  return (
    <div className="mb-6 flex w-full flex-col" aria-label="Range filter">
      <div className="my-3 h-[1px] w-full bg-tertiary"></div>
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
        max={filterValues.length - 1}
        className="h-[5px] cursor-pointer appearance-none rounded-3xl bg-brand"
      />
    </div>
  )
}
