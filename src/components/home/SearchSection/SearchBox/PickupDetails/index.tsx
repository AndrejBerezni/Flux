'use client'

import clsx from 'clsx'
import { IoCloseSharp } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'

import { roboto } from '@/app/fonts'
import { hideModal, showModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'
import { setDifferentReturn } from '@/store/vehicleSearch'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

import DateTimeButtons from './DateTimeButtons'
import LocationSearch from './LocationSearch'
import SearchBoxDivider from './SearchBoxDivider'

export default function PickupDetails() {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)
  const vehicleSearch = useSelector(getVehicleSearchInfo)

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
        <LocationSearch variant="pickupLocation" />
        {vehicleSearch.sameReturn ? (
          <button
            type="button"
            onClick={() => dispatch(setDifferentReturn())}
            className="self-start text-nowrap text-secondary hover:text-primary md:self-auto"
          >
            + Different return location
          </button>
        ) : (
          <LocationSearch variant="returnLocation" />
        )}
      </div>
      <SearchBoxDivider />
      <div
        aria-label="pickup and return date inputs"
        className="flex flex-col items-center justify-between gap-12 md:flex-1 md:flex-row md:gap-8"
      >
        <DateTimeButtons variant="Pick-up date" />
        <DateTimeButtons variant="Return date" />
        <SearchBoxDivider />
        <button
          type="submit"
          className={clsx(
            'btn-primary -mt-6 h-full w-full text-nowrap py-4 text-base md:m-auto md:w-auto md:py-2',
            {
              'px-4': vehicleSearch.vehicle === 'scooters',
            }
          )}
        >
          Show {vehicleSearch.vehicle}
        </button>
      </div>
    </form>
  )
}
