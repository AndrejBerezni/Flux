import { VehicleType } from '@/compiler/types'
import Pagination from '@/components/Pagination'
import VehicleCard from '@/components/vehicles/VehicleCard'
import VehicleRent from '@/components/vehicles/VehicleRent'
import RentTimeDateLocation from '@/components/vehicles/VehicleRent/RentTimeDateLocation'
import { fetchCars, fetchBikes, fetchScooters } from '@/lib/db_queries/vehicles'
export const fetchCache = 'force-no-store'

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams?: {
    pickupLocation?: string
    returnLocation?: string
    pickupDate?: string
    returnDate?: string
    pickupTime?: string
    returnTime?: string
    vehicleType?: VehicleType
    passengers?: string
    doors?: string
    bags?: string
    top_speed?: string
    range?: string
    weight?: string
    max_weight?: string
    sort?: string
    page?: string
  }
}) {
  const pickupLocation = searchParams?.pickupLocation || ''
  const returnLocation = searchParams?.returnLocation || ''
  const pickupTime = searchParams?.pickupTime || ''
  const returnTime = searchParams?.returnTime || ''
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
  const formattedPickup = pickupDate.toISOString().split('T')[0]

  const returnDate = searchParams?.returnDate
    ? new Date(searchParams?.returnDate)
    : new Date()
  const formattedReturn = returnDate.toISOString().split('T')[0]

  const numberOfDays = Math.ceil(
    (returnDate.getTime() - pickupDate.getTime()) / (1000 * 3600 * 24)
  )

  const sort = searchParams?.sort || 'name-asc'

  const currentPage = Number(searchParams?.page) ?? 1

  const fetchVehicles = async (vehicleType: VehicleType) => {
    let vehicles
    switch (vehicleType) {
      case 'cars':
        vehicles = await fetchCars(
          pickupLocation,
          passengers,
          doors,
          bags,
          sort,
          formattedPickup,
          formattedReturn
        )
        break
      case 'bikes':
        vehicles = await fetchBikes(
          pickupLocation,
          top_speed,
          weight,
          range,
          sort,
          formattedPickup,
          formattedReturn
        )
        break
      case 'scooters':
        vehicles = await fetchScooters(
          pickupLocation,
          top_speed,
          max_weight,
          range,
          sort,
          formattedPickup,
          formattedReturn
        )
        break
    }
    return vehicles
  }

  const vehicles = await fetchVehicles(vehicleType)
  const numberOfPages = Math.ceil(vehicles.length / 6)

  return (
    <div className="flex flex-1 flex-col items-center gap-8">
      <section className="grid w-full flex-1 grid-cols-1 flex-wrap gap-8 min-[840px]:grid-cols-2 lg:gap-4 xl:gap-8 min-[1420px]:grid-cols-3">
        {vehicles
          .slice((currentPage - 1) * 6, currentPage * 6)
          .map((vehicle) => (
            <VehicleCard
              key={`${vehicle.id}-vc`}
              vehicle={vehicle}
              vehicleType={vehicleType}
              days={numberOfDays}
            />
          ))}
        <VehicleRent days={numberOfDays}>
          <RentTimeDateLocation
            timeDateLocation={{
              pickupLocation,
              returnLocation,
              pickupDate: formattedPickup,
              returnDate: formattedReturn,
              pickupTime,
              returnTime,
            }}
          />
        </VehicleRent>
      </section>
      {numberOfPages > 1 && (
        <Pagination numberOfPages={numberOfPages} currentPage={currentPage} />
      )}
    </div>
  )
}
