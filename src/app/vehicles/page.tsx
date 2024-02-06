import { VehicleType } from '@/compiler/types'
import BikeCard from '@/components/vehicles/BikeCard'
import CarCard from '@/components/vehicles/CarCard'
import ScooterCard from '@/components/vehicles/ScooterCard'
import { IBikeCard, ICarCard, IScooterCard } from '@/lib/definitions'
import { fetchCars, fetchBikes, fetchScooters } from '@/lib/fetchVehicles'

export const fetchCache = 'force-no-store'

export default async function Vehicles({
  searchParams,
}: {
  searchParams?: {
    pickupLocation?: string
    pickupDate?: string
    returnDate?: string
    vehicleType?: VehicleType
  }
}) {
  const pickupLocation = searchParams?.pickupLocation || ''
  const vehicleType = searchParams?.vehicleType || 'cars'
  const pickupDate = searchParams?.pickupDate
    ? new Date(searchParams?.pickupDate)
    : new Date()
  const returnDate = searchParams?.returnDate
    ? new Date(searchParams?.returnDate)
    : new Date()
  const numberOfDays =
    (returnDate.getTime() - pickupDate.getTime()) / (1000 * 3600 * 24)

  const fetchVehicles = async (vehicleType: VehicleType) => {
    let vehicles
    switch (vehicleType) {
      case 'cars':
        vehicles = await fetchCars(pickupLocation)
        break
      case 'bikes':
        vehicles = await fetchBikes(pickupLocation)
        break
      case 'scooters':
        vehicles = await fetchScooters(pickupLocation)
        break
    }
    return vehicles
  }

  const vehicles = await fetchVehicles(vehicleType)
  return (
    <main className="grid flex-1 grid-cols-1 flex-wrap gap-6 md:grid-cols-2 min-[1420px]:grid-cols-3">
      {vehicles.map((vehicle) => {
        switch (vehicleType) {
          case 'cars':
            return (
              <CarCard
                key={`${vehicle.id}-vc`}
                vehicle={vehicle as ICarCard}
                days={numberOfDays}
              />
            )
          case 'bikes':
            return (
              <BikeCard
                key={`${vehicle.id}-vc`}
                vehicle={vehicle as IBikeCard}
                days={numberOfDays}
              />
            )
          case 'scooters':
            return (
              <ScooterCard
                key={`${vehicle.id}-vc`}
                vehicle={vehicle as IScooterCard}
                days={numberOfDays}
              />
            )
        }
      })}
    </main>
  )
}
