import { sql } from '@vercel/postgres'

import { VehicleType } from '@/compiler/types'
import { getImageURL } from '@/firebase/storage'

import { CarCard } from './definitions'

export const fetchCars = async (
  pickupLocation: string,
  type: VehicleType
): Promise<CarCard[]> => {
  try {
    const data = await sql<CarCard>`
          SELECT cars_details.id as id, cars_details.name as name, cars_details.brand as brand, cars_details.price_per_day as price_per_day, cars_details.gearshift as gearshift, cars_details.passengers as passengers, cars_details.bags as bags, cars_details.doors as doors, vehicle_images.image_url as image_url
          FROM cars_details
          JOIN vehicles
          ON vehicles.vehicle_details = cars_details.id::varchar
          JOIN vehicle_images
          ON vehicle_images.vehicle_id = cars_details.id::varchar
          WHERE vehicles.location =${pickupLocation}
          AND vehicles.type =${type}
          GROUP BY cars_details.id,
          vehicle_images.image_url;
          `
    const result = await Promise.all(
      data.rows.map(async (car) => {
        const imageURL = await getImageURL(car.image_url)
        return { ...car, image_url: imageURL || '' }
      })
    )
    return result
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Failed to search location')
  }
}
