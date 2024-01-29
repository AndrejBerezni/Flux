import { fetchNearbyLocations } from '@/lib/fetchLocations'

import LocationsMap from '.'

export default async function MapWrapper({
  userLatitude,
  userLongitude,
}: {
  userLatitude: string
  userLongitude: string
}) {
  const locations = await fetchNearbyLocations(
    Number(userLatitude),
    Number(userLongitude)
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
