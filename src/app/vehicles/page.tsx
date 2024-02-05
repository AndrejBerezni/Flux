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
    <main className="grid flex-1 grid-cols-1 flex-wrap gap-6 md:grid-cols-2 min-[1420px]:grid-cols-3">
      {cars.map((car) => (
        <VehicleCard key={`${car.id}-vc`} vehicle={car} days={numberOfDays} />
      ))}
    </main>
  )
}
