'use client'
import { useState, useId } from 'react'

export default function RangeFilter({
  labelText,
  filterValues,
}: {
  labelText: string
  filterValues: string[] | number[]
}) {
  const filterId = useId()
  const [currentPosition, setCurrentPosition] = useState<number>(2)

  const leftPosition = `${(currentPosition / (filterValues.length - 1)) * 100}%`

  const leftSideLenght = `${
    currentPosition === filterValues.length - 1
      ? 90
      : (currentPosition / (filterValues.length - 1)) * 100 - 5
  }%`
  const rightSideLength = `${
    100 - (currentPosition / (filterValues.length - 1)) * 100 - 5
  }%`

  const handleDrag = (event: React.DragEvent) => {
    console.log(event)
  }

  return (
    <div
      className="mb-6 flex w-full flex-col"
      aria-label="Range filter"
      id={filterId}
    >
      <div className="my-3 h-[1px] w-full bg-tertiary"></div>
      <p className="mb-2 font-semibold capitalize" aria-label="Filter label">
        {labelText}
      </p>
      <div className="mb-1 flex w-full flex-nowrap justify-between px-1">
        {filterValues.map((filterValue) => (
          <p key={`${filterId}-value`} className="inline">
            {filterValue}+
          </p>
        ))}
      </div>
      <div className="relative h-[40px] px-[5%]">
        <div
          className="absolute left-[5%] top-1/2 h-1 rounded-xl bg-brand"
          style={{ width: leftSideLenght }}
        ></div>
        <div
          aria-label="Range filter cursor"
          className="absolute top-0 z-10 h-full w-[20px] rounded-3xl border-2 border-brand bg-white shadow-lg hover:cursor-pointer"
          style={{
            left: leftPosition,
            transform: `translateX(-${leftPosition})`,
          }}
          onDrag={(e) => handleDrag(e)}
        ></div>
        <div
          className="absolute right-[5%] top-1/2 h-1 rounded-xl bg-tertiary"
          style={{ width: rightSideLength }}
        ></div>
      </div>
    </div>
  )
}
