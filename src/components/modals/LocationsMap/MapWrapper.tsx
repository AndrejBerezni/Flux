import { fetchNearbyLocations } from '@/lib/fetchLocations'

import LocationsMap from '.'

export default async function MapWrapper({
  userLatitude,
  userLongitude,
}: {
  userLatitude: string
  userLongitude: string
}) {
  const lat = Number(userLatitude)
  const lon = Number(userLongitude)
  const locations = await fetchNearbyLocations(lat, lon)
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
