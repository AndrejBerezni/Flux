import LocationsMap from '.'

export default function MapWrapper({
  userLatitude,
  userLongitude,
}: {
  userLatitude: number
  userLongitude: number
}) {
  return (
    <>
      <LocationsMap
        locations={[]}
        userLatitude={userLatitude}
        userLongitude={userLongitude}
      />
    </>
  )
}
