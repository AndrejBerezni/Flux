const { db } = require('@vercel/postgres')

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

async function main() {
  const client = await db.connect()

  await seedLocations(client)

  await client.end()
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err)
})
