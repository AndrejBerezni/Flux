'use client'

import clsx from 'clsx'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import { IoIosArrowBack } from 'react-icons/io'
import { MdAirplanemodeActive } from 'react-icons/md'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { TbLocation } from 'react-icons/tb'
import { useSelector, useDispatch } from 'react-redux'

import useClearParams from '@/hooks/useClearParams'
import { Location } from '@/lib/definitions'
import { hideSecondaryModal, showSecondaryModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'
import {
  setSameReturn,
  setPickUpLocation,
  setReturnLocation,
} from '@/store/vehicleSearch'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

import LocationResult from './LocationResult'
import LocationSearchInput from './LocationSearchInput'

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
  const clearParams = useClearParams()

  const handleStoreUpdate = (location: Location) => {
    if (variant === 'pickupLocation') {
      dispatch(setPickUpLocation(location))
    } else if (variant === 'returnLocation') {
      dispatch(setReturnLocation(location))
    }
  }

  const handleResultClick = (location: Location) => {
    handleStoreUpdate(location)
    dispatch(hideSecondaryModal())
    clearParams(variant)
  }

  return (
    <div
      className={clsx(
        'fixed left-0 top-0 z-40 h-full w-full overflow-y-auto rounded-none border-[1px] border-solid border-tertiary bg-white shadow-lg md:absolute md:top-full md:mt-0.5 md:h-[500px] md:overflow-y-hidden md:rounded-md',
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
        <div className="relative my-4 px-2">
          <LocationSearchInput variant={variant} labelInvisible />
        </div>
        <hr className="-ml-2" />
      </div>
      {variant === 'pickupLocation' ? (
        <LocationResult
          locationIcon={<TbLocation />}
          locationName="See options near me"
          handleClick={() =>
            dispatch(
              showSecondaryModal({
                secondaryModal: 'locationSearch',
                outerType: 'visible',
              })
            )
          }
        />
      ) : (
        <LocationResult
          locationIcon={<RiArrowGoBackFill />}
          locationName="Return at pick-up"
          handleClick={() => {
            dispatch(hideSecondaryModal())
            dispatch(setSameReturn())
            clearParams('returnLocation')
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
            location={location}
            handleClick={() => handleResultClick(location)}
          />
        ))}
    </div>
  )
}
