import { VehicleType } from '@/compiler/types'
import VehicleCard from '@/components/vehicles/VehicleCard'
import { fetchCars } from '@/lib/fetchVehicles'

export default async function Vehicles({
  searchParams,
}: {
  searchParams?: {
    pickupLocation?: string
    pickupDate?: string
    returnDate?: string
    type?: VehicleType
  }
}) {
  const pickupLocation = searchParams?.pickupLocation || ''
  const type = searchParams?.type || 'cars'
  const pickupDate = searchParams?.pickupDate
    ? new Date(searchParams?.pickupDate)
    : new Date()
  const returnDate = searchParams?.returnDate
    ? new Date(searchParams?.returnDate)
    : new Date()
  const numberOfDays =
    (returnDate.getTime() - pickupDate.getTime()) / (1000 * 3600 * 24)

  const cars = await fetchCars(pickupLocation, type)
  return (
    <main className="flex flex-1 flex-wrap gap-6">
      {cars.map((car) => (
        <VehicleCard key={`${car.id}-vc`} vehicle={car} days={numberOfDays} />
      ))}
    </main>
  )
}
