import { fetchNearbyLocations } from '@/lib/fetchLocations'

import LocationsMap from '.'

export default async function MapWrapper({
  userLatitude,
  userLongitude,
}: {
  userLatitude: number
  userLongitude: number
}) {
  const locations = await fetchNearbyLocations(
    38.76606361988597,
    -9.220650360015423
  )
  return (
    <>
      <LocationsMap
        locations={locations}
        userLatitude={userLatitude}
        userLongitude={userLongitude}
      />
    </>
  )
}
