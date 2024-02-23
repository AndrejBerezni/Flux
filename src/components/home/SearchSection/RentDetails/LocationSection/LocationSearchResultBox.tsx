'use client'
import clsx from 'clsx'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import { IoIosArrowBack } from 'react-icons/io'
import { MdAirplanemodeActive } from 'react-icons/md'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { TbLocation } from 'react-icons/tb'
import { useSelector, useDispatch } from 'react-redux'

import { ILocation } from '@/compiler/interfaces'
import useClearParams from '@/hooks/useClearParams'
import {
  hideSecondaryModal,
  showSecondaryModal,
  setMessage,
} from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'
import { setSameReturn, setLocation } from '@/store/vehicleSearch'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

import LocationResult from './LocationResult'
import LocationSearchInput from './LocationSearchInput'

export default function LocationSearchResultBox({
  variant,
  locations,
}: {
  variant: 'pickupLocation' | 'returnLocation'
  locations: ILocation[] | null
}) {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)
  const vehicleSearch = useSelector(getVehicleSearchInfo)
  const clearParams = useClearParams()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleStoreUpdate = (location: ILocation) => {
    //prevent having same value in two input fields - rather set sameReturn to true and have only 'Pick-up & return' input field displayed
    if (
      variant === 'returnLocation' &&
      vehicleSearch.pickupLocation &&
      location.id === vehicleSearch.pickupLocation.id
    ) {
      dispatch(setSameReturn())
      return
    }
    if (
      variant === 'pickupLocation' &&
      vehicleSearch.returnLocation &&
      location.id === vehicleSearch.returnLocation.id
    ) {
      dispatch(setSameReturn())
    }
    dispatch(setLocation({ location, variant }))
  }

  const handleResultClick = (location: ILocation) => {
    handleStoreUpdate(location)
    dispatch(hideSecondaryModal())
    clearParams(variant)
  }

  const getUserLocation = async () => {
    return new Promise<[number, number]>((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            resolve([latitude, longitude])
          },
          (error) => {
            dispatch(setMessage({ type: 'error', text: error.message }))
            reject(error)
          }
        )
      } else {
        dispatch(
          setMessage({ type: 'error', text: 'Geolocation not available' })
        )
        reject(new Error('Geolocation not available'))
      }
    })
  }

  const handleShowMap = async () => {
    const params = new URLSearchParams(searchParams)
    const [latitude, longitude] = await getUserLocation()
    if (latitude && longitude) {
      params.set('latitude', latitude.toString())
      params.set('longitude', longitude.toString())
      params.set('loadMap', 'true')
      replace(`${pathname}?${params.toString()}`)
      dispatch(
        showSecondaryModal({
          secondaryModal: 'locationSearch',
          outerType: 'visible',
        })
      )
    }
  }
  return (
    <div
      className={clsx(
        'fixed left-0 top-0 z-40 flex h-full w-full flex-col overflow-y-auto rounded-none border-[1px] border-solid border-tertiary bg-white shadow-lg md:absolute md:top-full md:mt-0.5 md:h-[500px] md:overflow-y-hidden md:rounded-md',
        {
          fixed: modal.secondaryModal === variant,
          hidden: modal.secondaryModal !== variant,
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
          handleClick={handleShowMap}
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
      {locations && locations.length > 0 ? (
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
        ))
      ) : locations && locations.length === 0 ? (
        <p className="absolute left-1/2 top-1/4 -translate-x-1/2 text-center font-semibold">
          No locations found that match your criteria
        </p>
      ) : null}
    </div>
  )
}
