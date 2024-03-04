import { VehicleType } from '@/compiler/types'
import VehicleCard from '@/components/vehicles/VehicleCard'
import { fetchCars, fetchBikes, fetchScooters } from '@/lib/dbQueries/vehicles'

export const fetchCache = 'force-no-store'

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams?: {
    pickupLocation?: string
    pickupDate?: string
    returnDate?: string
    vehicleType?: VehicleType
    passengers?: string
    doors?: string
    bags?: string
    top_speed?: string
    range?: string
    weight?: string
    max_weight?: string
    sort?: string
  }
}) {
  const pickupLocation = searchParams?.pickupLocation || ''
  const vehicleType = searchParams?.vehicleType || 'cars'

  const passengers = searchParams?.passengers || '2'
  const doors = searchParams?.doors || '2'
  const bags = searchParams?.bags || '1'
  const top_speed = searchParams?.top_speed || '50'
  const range = searchParams?.range || '50'
  const weight = searchParams?.weight || '100'
  const max_weight = searchParams?.max_weight || '80'

  const pickupDate = searchParams?.pickupDate
    ? new Date(searchParams?.pickupDate)
    : new Date()
  const returnDate = searchParams?.returnDate
    ? new Date(searchParams?.returnDate)
    : new Date()
  const numberOfDays =
    (returnDate.getTime() - pickupDate.getTime()) / (1000 * 3600 * 24)

  const sort = searchParams?.sort || 'name-asc'

  const fetchVehicles = async (vehicleType: VehicleType) => {
    let vehicles
    switch (vehicleType) {
      case 'cars':
        vehicles = await fetchCars(
          pickupLocation,
          passengers,
          doors,
          bags,
          sort
        )
        break
      case 'bikes':
        vehicles = await fetchBikes(
          pickupLocation,
          top_speed,
          weight,
          range,
          sort
        )
        break
      case 'scooters':
        vehicles = await fetchScooters(
          pickupLocation,
          top_speed,
          max_weight,
          range,
          sort
        )
        break
    }
    return vehicles
  }

  const vehicles = await fetchVehicles(vehicleType)
  return (
    <main className="grid flex-1 grid-cols-1 flex-wrap gap-8 min-[840px]:grid-cols-2 lg:gap-4 xl:gap-8 min-[1420px]:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={`${vehicle.id}-vc`}
          vehicle={vehicle}
          vehicleType={vehicleType}
          days={numberOfDays}
        />
      ))}
    </main>
  )
}
