'use client'
import clsx from 'clsx'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import { IoMdSearch, IoIosArrowBack } from 'react-icons/io'
import { MdAirplanemodeActive } from 'react-icons/md'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { TbLocation } from 'react-icons/tb'
import { useSelector, useDispatch } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'

import { Location } from '@/lib/definitions'
import { hideSecondaryModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'
import {
  setSameReturn,
  setPickUpLocation,
  setReturnLocation,
} from '@/store/vehicleSearch'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

import LocationResult from './LocationResult'

export default function LocationSearchResultBox({
  variant,
  locations,
}: {
  variant: 'returnLocation' | 'pickupLocation'
  locations: Location[]
}) {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)
  const vehicleSearch = useSelector(getVehicleSearchInfo)
  const router = useRouter() // we need this for first button of pickup location - to redirect user to /locations
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handleStoreUpdate = (term: string) => {
    if (variant === 'pickupLocation') {
      dispatch(setPickUpLocation(term))
    } else if (variant === 'returnLocation') {
      dispatch(setReturnLocation(term))
    }
  }

  const handleResultClick = (location: Location) => {
    handleStoreUpdate(location.name)
    dispatch(hideSecondaryModal())
  }

  const handleClearReturn = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('returnLocation')
    replace(`${pathname}?${params.toString()}`)
  }

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set(variant, term)
    } else {
      params.delete(variant)
    }
    replace(`${pathname}?${params.toString()}`)
  }, 500)

  return (
    <div
      className={clsx(
        'fixed left-0 top-0 z-40 h-full w-full overflow-y-auto rounded-none border-[1px] border-solid border-tertiary bg-white shadow-lg md:absolute md:top-full md:mt-0.5 md:h-[400px] md:rounded-md',
        {
          hidden: modal.secondaryModal !== variant,
          'flex flex-col': modal.secondaryModal === variant,
        }
      )}
    >
      <div className="relative flex flex-col md:hidden">
        <button
          type="button"
          className="absolute left-2 top-4 text-2xl md:hidden"
          onClick={() => dispatch(hideSecondaryModal())}
        >
          <IoIosArrowBack />
        </button>
        <h2 className="py-4 text-center font-bold md:py-2">
          {vehicleSearch.sameReturn
            ? 'Pick-up & return'
            : variant === 'pickupLocation'
              ? 'Pick-up'
              : 'Return'}{' '}
          location
        </h2>
        <div className="relative flex flex-col">
          <input
            type="text"
            id={`${variant}-search-sm`}
            className="mx-2 my-4 w-auto rounded-md px-10 py-3 font-medium caret-brand outline outline-1 outline-tertiary focus:outline-2 focus:outline-brand"
            placeholder="Airport or city"
            autoComplete="off"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <IoMdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl" />
        </div>

        <hr className="-ml-2" />
      </div>
      {variant === 'pickupLocation' ? (
        <LocationResult
          locationIcon={<TbLocation />}
          locationName="See options near me"
          handleClick={() => router.push('/locations')}
        />
      ) : (
        <LocationResult
          locationIcon={<RiArrowGoBackFill />}
          locationName="Return at pick-up"
          handleClick={() => {
            dispatch(hideSecondaryModal())
            dispatch(setSameReturn())
            handleClearReturn()
          }}
        />
      )}
      {locations &&
        locations.map((location) => (
          <LocationResult
            key={location.id}
            locationIcon={
              location.airport ? (
                <MdAirplanemodeActive />
              ) : (
                <HiOutlineBuildingOffice2 />
              )
            }
            locationName={location.name}
            handleClick={() => handleResultClick(location)}
          />
        ))}
    </div>
  )
}
