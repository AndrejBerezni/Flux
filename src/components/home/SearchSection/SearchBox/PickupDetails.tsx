'use client'

import { useState } from 'react'

import clsx from 'clsx'
import { FaRegCalendar } from 'react-icons/fa'
import { IoMdSearch } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'

import { getModalInfo } from '@/store/modal/selectors'

export default function PickupDetails({
  currentVehicle,
}: {
  currentVehicle: string
}) {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)
  const [sameReturnLocation, setSameReturnLocation] = useState<boolean>(true)

  return (
    <form
      className={clsx('my-6 gap-6 md:w-full md:flex-wrap', {
        'hidden md:flex ': modal.modalType !== 'pickUp',
        'fixed left-0 top-0 z-30 flex h-screen w-screen bg-white md:static md:h-auto':
          modal.modalType === 'pickUp',
      })}
    >
      <div
        aria-label="pickup and return location inputs"
        className="flex flex-1 items-center gap-4"
      >
        <div className="relative min-w-[250px] flex-1">
          <label
            htmlFor="pickuplocation"
            className="absolute bottom-full mb-1 text-[0.8rem] font-bold"
          >
            {sameReturnLocation ? 'Pick-up & return' : 'Pick-up'}
          </label>
          <input
            type="text"
            id="pickuplocation"
            className="w-full rounded-md px-10 py-3 font-medium caret-brand outline outline-1 outline-tertiary focus:outline-2 focus:outline-brand"
            placeholder="Airport or city"
          />
          <IoMdSearch className="absolute left-2 top-1/4 text-2xl" />
        </div>
        {sameReturnLocation ? (
          <button
            type="button"
            onClick={() => setSameReturnLocation(false)}
            className="text-nowrap text-secondary hover:text-primary"
          >
            + Different return location
          </button>
        ) : (
          <div className="relative min-w-[250px] flex-1">
            <label
              htmlFor="returnlocation"
              className="absolute bottom-full mb-1 text-[0.8rem] font-bold"
            >
              Return
            </label>
            <input
              type="text"
              id="returnlocation"
              className="w-full rounded-md px-10 py-3 font-medium caret-brand outline outline-1 outline-tertiary focus:outline-2 focus:outline-brand"
              placeholder="Airport or city"
            />
            <IoMdSearch className="absolute left-2 top-1/4 text-2xl" />
          </div>
        )}
      </div>
      <div
        aria-label="pickup and return date inputs"
        className="flex flex-1 items-center justify-between gap-4"
      >
        <div
          aria-label="pickup date buttons"
          className="flex flex-1 flex-nowrap items-center"
        >
          <button
            type="button"
            className="flex items-center gap-4 text-nowrap rounded-l-lg border-[1px] border-solid border-tertiary py-3 pl-2 pr-6 hover:bg-quaternary"
          >
            <FaRegCalendar className="text-2xl" />
            11 Jan
          </button>
          <button
            type="button"
            className="flex w-1/2 items-center gap-4 rounded-r-lg border-[1px] border-solid border-tertiary px-6 py-3 hover:bg-quaternary"
          >
            12:30
          </button>
        </div>
        <div
          aria-label="return date buttons"
          className="flex flex-1 flex-nowrap items-center"
        >
          <button
            type="button"
            className="flex items-center gap-4 text-nowrap rounded-l-lg border-[1px] border-solid border-tertiary py-3 pl-2 pr-6 hover:bg-quaternary"
          >
            <FaRegCalendar className="text-2xl" />
            15 Jan
          </button>
          <button
            type="button"
            className="flex w-1/2 items-center gap-4 rounded-r-lg border-[1px] border-solid border-tertiary px-6 py-3 hover:bg-quaternary"
          >
            08:00
          </button>
        </div>
        <button type="submit" className="btn-primary h-full text-base">
          Show {currentVehicle}
        </button>
      </div>
    </form>
  )
}
