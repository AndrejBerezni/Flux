const { db } = require('@vercel/postgres')

const { carImages } = require('./data/carImages.js')
const { carDetailsIds, locationIds } = require('./data/cars.js')
const { carsDetails } = require('./data/carsDetails.js')
const { locations } = require('./data/locations.js')

async function seedLocations(client) {
  try {
    const insertedLocations = await Promise.all(
      locations.map(
        (location) => client.sql`
            INSERT INTO locations (name, street, street_number, city, zip_code, country, latitude, longitude, always_open, opening_hour_working_day, opening_hour_weekend, closing_hour_working_day, closing_hour_weekend, airport)
            VALUES (${location.name}, ${location.street}, ${location.street_number}, ${location.city}, ${location.zip_code}, ${location.country}, ${location.latitude}, ${location.longitude}, ${location.always_open}, ${location.opening_hour_working_day}, ${location.opening_hour_weekend}, ${location.closing_hour_working_day}, ${location.closing_hour_weekend}, ${location.airport})
            ON CONFLICT (id) DO NOTHING;
            `
      )
    )

    console.log(`Seeded ${insertedLocations.length} locations`)

    return insertedLocations
  } catch (error) {
    console.error('Error seeding locations:', error)
    throw error
  }
}

async function seedCarsDetails(client) {
  try {
    const insertedCarsDetails = await Promise.all(
      carsDetails.map(
        (car) => client.sql`
            INSERT INTO cars_details (name, brand, price_per_day, gearshift, passengers, bags, doors)
            VALUES (${car.name}, ${car.brand}, ${car.price_per_day}, ${car.gearshift}, ${car.passengers}, ${car.bags}, ${car.doors} )
            ON CONFLICT (id) DO NOTHING;
            `
      )
    )

    console.log(`Seeded ${insertedCarsDetails.length} car details`)

    return insertedCarsDetails
  } catch (error) {
    console.error('Error seeding car details:', error)
    throw error
  }
}

async function seedVehiclesCars(client) {
  try {
    const insertedCars = await Promise.all(
      locationIds.flatMap((location) =>
        carDetailsIds.map(
          (car) => client.sql`
          INSERT INTO vehicles (type, vehicle_details, location)
          VALUES ('car', ${car}, ${location})
          ON CONFLICT (id) DO NOTHING;
          `
        )
      )
    )

    console.log(`Seeded ${insertedCars.length} cars`)

    return insertedCars
  } catch (error) {
    console.error('Error seeding cars:', error)
    throw error
  }
}

async function seedCarImages(client) {
  try {
    const insertedCarImages = await Promise.all(
      carImages.map(
        (img) => client.sql`
            INSERT INTO vehicle_images (vehicle_id, image_url, main_image)
            VALUES (${img.vehicle_id}, ${img.image_url}, ${img.main_image})
            ON CONFLICT (id) DO NOTHING;
            `
      )
    )

    console.log(`Seeded ${insertedCarImages.length} car images`)

    return insertedCarImages
  } catch (error) {
    console.error('Error seeding car images:', error)
    throw error
  }
}

async function main() {
  const client = await db.connect()

  await seedLocations(client)
  await seedCarsDetails(client)
  await seedVehiclesCars(client)
  await seedCarImages(client)

  await client.end()
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err)
})
