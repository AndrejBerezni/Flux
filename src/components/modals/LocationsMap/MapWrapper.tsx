import { fetchNearbyLocations } from '@/lib/db_queries/locations'

import LocationsMap from '.'

export default async function MapWrapper({
  userLatitude,
  userLongitude,
}: Readonly<{
  userLatitude: string
  userLongitude: string
}>) {
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
