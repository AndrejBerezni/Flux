import Image from 'next/image'

import { VehicleType } from '@/compiler/types'
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

  const cars = await fetchCars(pickupLocation, type)
  return (
    <>
      <h1>Cars</h1>
      {cars.map((car) => (
        <div key={car.id}>
          <h3>
            {car.brand} {car.name}
          </h3>
          <Image
            src={car.image_url}
            alt={`${car.brand} ${car.name}`}
            width={400}
            height={200}
          />
        </div>
      ))}
    </>
  )
}
