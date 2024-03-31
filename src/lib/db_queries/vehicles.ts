import { sql } from '@vercel/postgres'

import { getImageURL } from '@/firebase/storage'
import { sortVehicleResults } from '@/lib/utilities/sortVehicleResults'

import { IBikeCard, ICarCard, IScooterCard } from '../../compiler/interfaces'

export const fetchCars = async (
  pickupLocation: string,
  passengers: string,
  doors: string,
  bags: string,
  sort: string,
  pickupDate: string,
  returnDate: string
): Promise<ICarCard[]> => {
  try {
    const data = await sql<ICarCard>`
          SELECT cars_details.id as id,
                  cars_details.name as name,
                  cars_details.brand as brand,
                  cars_details.price_per_day as price_per_day,
                  cars_details.gearshift as gearshift,
                  cars_details.passengers as passengers,
                  cars_details.bags as bags, cars_details.doors as doors,
                  cars_details.stripe_product_id as stripeId,
                  cars_details.stripe_full_price_id as full_price,
                  cars_details.stripe_price_id_2_off as discount_2,
                  cars_details.stripe_price_id_7_off as discount_7,
                  cars_details.stripe_price_id_10_off as discount_10,
                  MIN(vehicles.id::varchar) as available_vehicle,
                  MIN(vehicle_images.image_url) as image_url
          FROM cars_details
          JOIN vehicles
          ON vehicles.vehicle_details = cars_details.id::varchar
          JOIN vehicle_images
          ON vehicle_images.vehicle_id = cars_details.id::varchar
          LEFT JOIN 
          rents ON rents.vehicle_id = vehicles.id::varchar
            AND (
              (rents.pickup_date <= ${returnDate} AND rents.return_date >= ${pickupDate})
            OR
              (rents.pickup_date >= ${pickupDate} AND rents.pickup_date <= ${returnDate})
              )
            AND rents.cancelled = false
            AND rents.payment_successful = true
          WHERE vehicles.location =${pickupLocation}
          AND vehicles.type ='cars'
          AND cars_details.passengers >=${passengers}
          AND cars_details.doors >=${doors}
          AND cars_details.bags >=${bags}
          AND rents.id IS NULL
          GROUP BY cars_details.id
          ORDER BY cars_details.price_per_day;
          `
    const result = await Promise.all(
      data.rows.map(async (car) => {
        const imageURL = await getImageURL(car.image_url)
        return { ...car, image_url: imageURL || '' }
      })
    )

    const sortedResult = sortVehicleResults(result, sort, true)
    return sortedResult as ICarCard[]
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Failed to search location')
  }
}

export const fetchBikes = async (
  pickupLocation: string,
  top_speed: string,
  weight: string,
  range: string,
  sort: string,
  pickupDate: string,
  returnDate: string
): Promise<IBikeCard[]> => {
  try {
    const data = await sql<IBikeCard>`
          SELECT bikes_details.id as id,
                  bikes_details.name as name,
                  bikes_details.price_per_day as price_per_day,
                  bikes_details.range as range, bikes_details.top_speed as top_speed,
                  bikes_details.weight as weight,
                  bikes_details.stripe_product_id as stripeId,
                  bikes_details.stripe_full_price_id as full_price,
                  bikes_details.stripe_price_id_2_off as discount_2,
                  bikes_details.stripe_price_id_7_off as discount_7,
                  bikes_details.stripe_price_id_10_off as discount_10,
                  MIN(vehicles.id::varchar) as available_vehicle,
                  MIN(vehicle_images.image_url) as image_url
          FROM bikes_details
          JOIN vehicles
          ON vehicles.vehicle_details = bikes_details.id::varchar
          JOIN vehicle_images
          ON vehicle_images.vehicle_id = bikes_details.id::varchar
          LEFT JOIN 
          rents ON rents.vehicle_id = vehicles.id::varchar
            AND (
              (rents.pickup_date <= ${returnDate} AND rents.return_date >= ${pickupDate})
            OR
              (rents.pickup_date >= ${pickupDate} AND rents.pickup_date <= ${returnDate})
              )
            AND rents.cancelled = false
            AND rents.payment_successful = true
          WHERE vehicles.location =${pickupLocation}
          AND vehicles.type ='bikes'
          AND bikes_details.top_speed >=${top_speed}
          AND bikes_details.weight >=${weight}
          AND bikes_details.range >=${range}
          AND rents.id IS NULL
          GROUP BY bikes_details.id
          ORDER BY bikes_details.price_per_day;
          `
    const result = await Promise.all(
      data.rows.map(async (bike) => {
        const imageURL = await getImageURL(bike.image_url)
        return { ...bike, image_url: imageURL || '' }
      })
    )

    //Postgres was not accepting ORDER BY clause when assigning values dynamically, so I needed to sort results outside of sql query
    const sortedResult = sortVehicleResults(result, sort, false)
    return sortedResult as IBikeCard[]
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Failed to search location')
  }
}

export const fetchScooters = async (
  pickupLocation: string,
  top_speed: string,
  max_weight: string,
  range: string,
  sort: string,
  pickupDate: string,
  returnDate: string
): Promise<IScooterCard[]> => {
  try {
    const data = await sql<IScooterCard>`
          SELECT scooters_details.id as id,
                  scooters_details.name as name,
                  scooters_details.price_per_day as price_per_day,
                  scooters_details.top_speed as top_speed,
                  scooters_details.max_weight as max_weight,
                  scooters_details.range as range,
                  scooters_details.stripe_product_id as stripeId,
                  scooters_details.stripe_full_price_id as full_price,
                  scooters_details.stripe_price_id_2_off as discount_2,
                  scooters_details.stripe_price_id_7_off as discount_7,
                  scooters_details.stripe_price_id_10_off as discount_10,
                  MIN(vehicles.id::varchar) as available_vehicle,
                  MIN(vehicle_images.image_url) as image_url
          FROM scooters_details
          JOIN vehicles
          ON vehicles.vehicle_details = scooters_details.id::varchar
          JOIN vehicle_images
          ON vehicle_images.vehicle_id = scooters_details.id::varchar
          LEFT JOIN 
          rents ON rents.vehicle_id = vehicles.id::varchar
            AND (
              (rents.pickup_date <= ${returnDate} AND rents.return_date >= ${pickupDate})
            OR
              (rents.pickup_date >= ${pickupDate} AND rents.pickup_date <= ${returnDate})
              )
            AND rents.cancelled = false
            AND rents.payment_successful = true
          WHERE vehicles.location =${pickupLocation}
          AND vehicles.type ='scooters'
          AND scooters_details.top_speed >=${top_speed}
          AND scooters_details.max_weight >=${max_weight}
          AND scooters_details.range >=${range}
          AND rents.id IS NULL
          GROUP BY scooters_details.id
          ORDER BY scooters_details.price_per_day;
          `
    const result = await Promise.all(
      data.rows.map(async (scooter) => {
        const imageURL = await getImageURL(scooter.image_url)
        return { ...scooter, image_url: imageURL || '' }
      })
    )

    const sortedResult = sortVehicleResults(result, sort, false)
    return sortedResult as IScooterCard[]
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Failed to search location')
  }
}
