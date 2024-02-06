const { db } = require('@vercel/postgres')

const { bikesDetails } = require('./data/bikesDetails.js')
const { carsDetails } = require('./data/carsDetails.js')
const { carImages, bikeImages, scooterImages } = require('./data/images.js')
const { locations } = require('./data/locations.js')
const { scootersDetails } = require('./data/scootersDetails.js')
const {
  carDetailsIds,
  bikeDetailsIds,
  scooterDetailsIds,
  locationIds,
} = require('./data/vehicles.js')

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
          VALUES ('cars', ${car}, ${location})
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

async function seedBikesDetails(client) {
  try {
    const insertedBikesDetails = await Promise.all(
      bikesDetails.map(
        (bike) => client.sql`
            INSERT INTO bikes_details (name, price_per_day, range, top_speed, weight)
            VALUES (${bike.name}, ${bike.price_per_day}, ${bike.range}, ${bike.top_speed}, ${bike.weight})
            ON CONFLICT (id) DO NOTHING;
            `
      )
    )

    console.log(`Seeded ${insertedBikesDetails.length} bike details`)

    return insertedBikesDetails
  } catch (error) {
    console.error('Error seeding bike details:', error)
    throw error
  }
}

async function seedVehiclesBikes(client) {
  try {
    const insertedBikes = await Promise.all(
      locationIds.flatMap((location) =>
        bikeDetailsIds.map(
          (bike) => client.sql`
          INSERT INTO vehicles (type, vehicle_details, location)
          VALUES ('bikes', ${bike}, ${location})
          ON CONFLICT (id) DO NOTHING;
          `
        )
      )
    )

    console.log(`Seeded ${insertedBikes.length} bikes`)

    return insertedBikes
  } catch (error) {
    console.error('Error seeding bikes:', error)
    throw error
  }
}

async function seedBikeImages(client) {
  try {
    const insertedBikeImages = await Promise.all(
      bikeImages.map(
        (img) => client.sql`
            INSERT INTO vehicle_images (vehicle_id, image_url, main_image)
            VALUES (${img.vehicle_id}, ${img.image_url}, ${img.main_image})
            ON CONFLICT (id) DO NOTHING;
            `
      )
    )

    console.log(`Seeded ${insertedBikeImages.length} bike images`)

    return insertedBikeImages
  } catch (error) {
    console.error('Error seeding bike images:', error)
    throw error
  }
}

async function seedScootersDetails(client) {
  try {
    const insertedScootersDetails = await Promise.all(
      scootersDetails.map(
        (scooter) => client.sql`
            INSERT INTO scooters_details (name, price_per_day, top_speed, max_weight, range)
            VALUES (${scooter.name}, ${scooter.price_per_day}, ${scooter.top_speed}, ${scooter.max_weight}, ${scooter.range})
            ON CONFLICT (id) DO NOTHING;
            `
      )
    )

    console.log(`Seeded ${insertedScootersDetails.length} scooter details`)

    return insertedScootersDetails
  } catch (error) {
    console.error('Error seeding scooter details:', error)
    throw error
  }
}

async function seedVehiclesScooters(client) {
  try {
    const insertedScooters = await Promise.all(
      locationIds.flatMap((location) =>
        scooterDetailsIds.map(
          (scooter) => client.sql`
          INSERT INTO vehicles (type, vehicle_details, location)
          VALUES ('scooters', ${scooter}, ${location})
          ON CONFLICT (id) DO NOTHING;
          `
        )
      )
    )

    console.log(`Seeded ${insertedScooters.length} scooters`)

    return insertedScooters
  } catch (error) {
    console.error('Error seeding scooters:', error)
    throw error
  }
}

async function seedScooterImages(client) {
  try {
    const insertedScooterImages = await Promise.all(
      scooterImages.map(
        (img) => client.sql`
            INSERT INTO vehicle_images (vehicle_id, image_url, main_image)
            VALUES (${img.vehicle_id}, ${img.image_url}, ${img.main_image})
            ON CONFLICT (id) DO NOTHING;
            `
      )
    )

    console.log(`Seeded ${insertedScooterImages.length} scooter images`)

    return insertedScooterImages
  } catch (error) {
    console.error('Error seeding scooter images:', error)
    throw error
  }
}

async function main() {
  const client = await db.connect()

  await seedLocations(client)
  await seedCarsDetails(client)
  await seedVehiclesCars(client)
  await seedCarImages(client)
  await seedBikesDetails(client)
  await seedScootersDetails(client)
  await seedVehiclesBikes(client)
  await seedVehiclesScooters(client)
  await seedBikeImages(client)
  await seedScooterImages(client)

  await client.end()
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err)
})
