import { sql } from '@vercel/postgres'

import { getImageURL } from '@/firebase/storage'

import { IBikeCard, ICarCard, IScooterCard } from './definitions'

export const fetchCars = async (
  pickupLocation: string
): Promise<ICarCard[]> => {
  try {
    const data = await sql<ICarCard>`
          SELECT cars_details.id as id, cars_details.name as name, cars_details.brand as brand, cars_details.price_per_day as price_per_day, cars_details.gearshift as gearshift, cars_details.passengers as passengers, cars_details.bags as bags, cars_details.doors as doors, vehicle_images.image_url as image_url
          FROM cars_details
          JOIN vehicles
          ON vehicles.vehicle_details = cars_details.id::varchar
          JOIN vehicle_images
          ON vehicle_images.vehicle_id = cars_details.id::varchar
          WHERE vehicles.location =${pickupLocation}
          AND vehicles.type ='cars'
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

export const fetchBikes = async (
  pickupLocation: string
): Promise<IBikeCard[]> => {
  try {
    const data = await sql<IBikeCard>`
          SELECT bikes_details.id as id, bikes_details.name as name, bikes_details.price_per_day as price_per_day, bikes_details.range as range, bikes_details.top_speed as top_speed, bikes_details.weight as weight, vehicle_images.image_url as image_url
          FROM bikes_details
          JOIN vehicles
          ON vehicles.vehicle_details = bikes_details.id::varchar
          JOIN vehicle_images
          ON vehicle_images.vehicle_id = bikes_details.id::varchar
          WHERE vehicles.location =${pickupLocation}
          AND vehicles.type ='bikes'
          GROUP BY bikes_details.id,
          vehicle_images.image_url;
          `
    const result = await Promise.all(
      data.rows.map(async (bike) => {
        const imageURL = await getImageURL(bike.image_url)
        return { ...bike, image_url: imageURL || '' }
      })
    )
    return result
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Failed to search location')
  }
}

export const fetchScooters = async (
  pickupLocation: string
): Promise<IScooterCard[]> => {
  try {
    const data = await sql<IScooterCard>`
          SELECT scooters_details.id as id, scooters_details.name as name, scooters_details.price_per_day as price_per_day, scooters_details.top_speed as top_speed, scooters_details.max_weight as max_weight, scooters_details.range as range, vehicle_images.image_url as image_url
          FROM scooters_details
          JOIN vehicles
          ON vehicles.vehicle_details = scooters_details.id::varchar
          JOIN vehicle_images
          ON vehicle_images.vehicle_id = scooters_details.id::varchar
          WHERE vehicles.location =${pickupLocation}
          AND vehicles.type ='scooters'
          GROUP BY scooters_details.id,
          vehicle_images.image_url;
          `
    const result = await Promise.all(
      data.rows.map(async (scooter) => {
        const imageURL = await getImageURL(scooter.image_url)
        return { ...scooter, image_url: imageURL || '' }
      })
    )
    return result
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Failed to search location')
  }
}
