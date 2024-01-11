'use client'

import { useState } from 'react'

import clsx from 'clsx'
import { FaRegCalendar, FaRegClock } from 'react-icons/fa'
import { IoMdSearch } from 'react-icons/io'
import { IoCloseSharp } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'

import { roboto } from '@/app/fonts'
import { hideModal, showModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'

import LocationSearch from './LocationSearch'
import SearchBoxDivider from './SearchBoxDivider'

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
      className={clsx('gap-8 px-4 md:w-full md:flex-wrap md:pb-8 md:pt-10', {
        'hidden md:flex ': modal.modalType !== 'pickUp',
        'fixed left-0 top-0 z-30 flex h-screen w-screen flex-col bg-white py-4 md:static md:h-auto md:flex-row':
          modal.modalType === 'pickUp',
      })}
    >
      <div className="mb-6 flex items-center md:hidden">
        <button type="button" onClick={() => dispatch(hideModal())}>
          <IoCloseSharp className="text-2xl" />
        </button>

        <h1
          className={`${roboto.className} flex-1 text-center text-lg font-bold`}
        >
          Your rental details
        </h1>
      </div>
      <div
        aria-label="pickup and return location inputs"
        className="flex flex-col items-center gap-12 md:flex-1 md:flex-row md:gap-8"
      >
        <div className="relative w-full min-w-[250px] md:w-auto md:flex-1">
          <label
            htmlFor="pickuplocation"
            className="absolute bottom-full mb-1 text-base font-bold md:text-[0.8rem]"
          >
            {sameReturnLocation ? 'Pick-up & return' : 'Pick-up'}
          </label>
          <input
            type="text"
            id="pickuplocation"
            className="w-full rounded-md px-10 py-3 font-medium caret-brand outline outline-1 outline-tertiary focus:outline-2 focus:outline-brand"
            placeholder="Airport or city"
            onFocus={() =>
              dispatch(
                showModal({
                  modalType: 'pickupLocation',
                  outerType: 'invisible',
                })
              )
            }
          />
          <IoMdSearch className="absolute left-2 top-1/4 text-2xl" />
          <LocationSearch variant="pickupLocation" />
        </div>
        {sameReturnLocation ? (
          <button
            type="button"
            onClick={() => setSameReturnLocation(false)}
            className="self-start text-nowrap text-secondary hover:text-primary md:self-auto"
          >
            + Different return location
          </button>
        ) : (
          <div className="relative w-full min-w-[250px] md:w-auto md:flex-1">
            <label
              htmlFor="returnlocation"
              className="absolute bottom-full mb-1 text-base font-bold md:text-[0.8rem]"
            >
              Return
            </label>
            <input
              type="text"
              id="returnlocation"
              className="w-full rounded-md px-10 py-3 font-medium caret-brand outline outline-1 outline-tertiary focus:outline-2 focus:outline-brand"
              placeholder="Airport or city"
              onFocus={() =>
                dispatch(
                  showModal({
                    modalType: 'returnLocation',
                    outerType: 'invisible',
                  })
                )
              }
            />
            <IoMdSearch className="absolute left-2 top-1/4 text-2xl" />
            <LocationSearch variant="returnLocation" />
          </div>
        )}
      </div>
      <SearchBoxDivider />
      <div
        aria-label="pickup and return date inputs"
        className="flex flex-col items-center justify-between gap-12 md:flex-1 md:flex-row md:gap-8"
      >
        <div
          aria-label="pickup date buttons"
          className="relative flex w-full flex-nowrap items-center md:w-auto md:flex-1"
        >
          <p className="absolute bottom-full mb-1 text-base font-bold md:text-[0.8rem]">
            Pick-up date
          </p>
          <button
            type="button"
            className="flex flex-1 items-center gap-4 text-nowrap rounded-l-lg border-[1px] border-solid border-tertiary py-3 pl-2 pr-6 hover:bg-quaternary"
          >
            <FaRegCalendar className="text-2xl" />
            11 Jan
          </button>
          <button
            type="button"
            className="flex flex-1 items-center gap-4 rounded-r-lg border-[1px] border-solid border-tertiary px-3 py-3 hover:bg-quaternary"
          >
            <FaRegClock className="text-2xl md:hidden" />
            12:30
          </button>
        </div>
        <div
          aria-label="return date buttons"
          className="relative flex w-full flex-nowrap items-center md:w-auto md:flex-1"
        >
          <p className="absolute bottom-full mb-1 text-base font-bold md:text-[0.8rem]">
            Return date
          </p>
          <button
            type="button"
            className="flex flex-1 items-center gap-4 text-nowrap rounded-l-lg border-[1px] border-solid border-tertiary py-3 pl-2 pr-6 hover:bg-quaternary"
          >
            <FaRegCalendar className="text-2xl" />
            15 Jan
          </button>
          <button
            type="button"
            className="flex flex-1 items-center gap-4 rounded-r-lg border-[1px] border-solid border-tertiary px-3 py-3 hover:bg-quaternary"
          >
            <FaRegClock className="text-2xl md:hidden" />
            08:00
          </button>
        </div>
        <SearchBoxDivider />
        <button
          type="submit"
          className={clsx(
            'btn-primary -mt-6 h-full w-full text-nowrap py-4 text-base md:m-auto md:w-auto md:py-2',
            {
              'px-4': currentVehicle === 'scooters',
            }
          )}
        >
          Show {currentVehicle}
        </button>
      </div>
    </form>
  )
}
