'use client'
import { useEffect, useMemo, useState } from 'react'

import { useJsApiLoader, GoogleMap } from '@react-google-maps/api'
import clsx from 'clsx'
import { IoCloseSharp } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'

import { robotoCondensed } from '@/app/fonts'
import Spinner from '@/components/Spinner'
import { Location } from '@/lib/definitions'
import { hideSecondaryModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'

import LocationMarker from './LocationMarker'
import UserLocationmarker from './UserLocationMarker'

export default function LocationsMap({ locations }: { locations: Location[] }) {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)
  //coordinates are set to Lisbon center, in case geolocation is not available or user denies it
  const [userLatitude, setUserLatitude] = useState<number>(38.725497783077515)
  const [userLongitude, setUserLongitude] = useState<number>(-9.150110143472197)

  //Get user location
  useEffect(() => {
    const getUserLocation = async () => {
      return new Promise<[number, number]>((resolve, reject) => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords
              resolve([latitude, longitude])
            },
            (error) => {
              reject(error)
            }
          )
        } else {
          reject(new Error('Geolocation not available'))
        }
      })
    }
    const setUserLocation = async () => {
      try {
        const [latitude, longitude] = await getUserLocation()
        setUserLatitude(latitude)
        setUserLongitude(longitude)
      } catch (error) {
        if (error instanceof Error) console.error(error.message)
      }
    }
    setUserLocation()
  }, [])

  // handling Google map options and display
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
    [userLatitude, userLongitude]
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
          options={mapOptions}
          center={mapCenter}
          zoom={12}
          mapContainerStyle={{
            width: '100%',
            height: '90%',
            borderRadius: '0.375rem',
          }}
        >
          <UserLocationmarker position={mapCenter} />
          {locations.map((location) => (
            <LocationMarker
              key={`${location.id}-location-marker`}
              position={{ lat: location.latitude, lng: location.longitude }}
              location={location}
            />
          ))}
        </GoogleMap>
      ) : (
        <Spinner />
      )}
    </div>
  )
}
