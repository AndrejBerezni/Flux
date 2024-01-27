'use client'
import { Location } from '@/lib/definitions'
import { useJsApiLoader, GoogleMap, OverlayView } from '@react-google-maps/api'
import { useMemo } from 'react'
import Spinner from '@/components/Spinner'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { getModalInfo } from '@/store/modal/selectors'
import { hideSecondaryModal } from '@/store/modal'
import { robotoCondensed } from '@/app/fonts'
import { IoCloseSharp } from 'react-icons/io5'
import LocationMarker from './LocationMarker'

export default function LocationsMap({
  locations,
  userLatitude,
  userLongitude,
}: {
  locations: Location[]
  userLatitude: number
  userLongitude: number
}) {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
  })
  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  )
  const mapCenter = useMemo(
    () => ({ lat: userLatitude, lng: userLongitude }),
    []
  )

  return (
    <div
      className={clsx(
        `${robotoCondensed.className} left-0 top-0 z-40 flex h-full w-full flex-col justify-center bg-white px-6 shadow-lg md:left-1/2 md:top-1/2 md:h-[75%] md:w-[75%] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-md`,
        {
          fixed: modal.secondaryModal === 'locationSearch',
          hidden: modal.secondaryModal !== 'locationSearch',
        }
      )}
    >
      <button
        type="button"
        className="absolute right-2 top-2 text-3xl hover:drop-shadow-md md:text-4xl"
        onClick={() => dispatch(hideSecondaryModal())}
      >
        <IoCloseSharp />
      </button>
      <h2 className="mb-2 text-center text-xl font-extrabold uppercase">
        Select a pick-up location
      </h2>
      {isLoaded ? (
        <GoogleMap
          center={mapCenter}
          zoom={11.2}
          mapContainerStyle={{
            width: '100%',
            height: '90%',
            borderRadius: '0.375rem',
          }}
        >
          <LocationMarker position={mapCenter} />
        </GoogleMap>
      ) : (
        <Spinner />
      )}
    </div>
  )
}
