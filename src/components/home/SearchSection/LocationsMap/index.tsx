'use client'
import { Location } from '@/lib/definitions'
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api'
import { useMemo } from 'react'

export default function LocationsMap({
  locations,
  userLatitude,
  userLongitude,
}: {
  locations: Location[]
  userLatitude: number
  userLongitude: number
}) {
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

  return isLoaded ? (
    <div className="z-60 fixed left-[50px] top-[100px] h-1/3 w-1/3">
      <GoogleMap
        center={mapCenter}
        zoom={10}
        mapContainerStyle={{ width: '800px', height: '800px' }}
      ></GoogleMap>
    </div>
  ) : (
    <></>
  )
}
