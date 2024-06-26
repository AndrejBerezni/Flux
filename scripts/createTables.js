const { db } = require('@vercel/postgres')

async function createUsersTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255),
                email VARCHAR(255) NOT NULL UNIQUE,
                country_code INTEGER,
                phone_number INTEGER,
                street VARCHAR(255),
                street_number INTEGER,
                additional_address_line VARCHAR(255),
                zip_code VARCHAR(255),
                city VARCHAR(255),
                country VARCHAR(255)
            )`

    return createTable
  } catch (error) {
    throw error
  }
}

async function createRentsTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS rents (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id VARCHAR(255) NOT NULL,
                vehicle_id VARCHAR(255) NOT NULL,
                pickup_date DATE NOT NULL,
                return_date DATE NOT NULL,
                pickup_location VARCHAR(255) NOT NULL,
                return_location VARCHAR(255) NOT NULL,
                pickup_time TIME NOT NULL,
                return_time TIME NOT NULL,
                total_price NUMERIC NOT NULL,
                insurance VARCHAR(255),
                payment_successful BOOLEAN DEFAULT false NOT NULL,
                cancelled BOOLEAN DEFAULT false NOT NULL,
                invoice VARCHAR(255)
            );`

    return createTable
  } catch (error) {
    throw error
  }
}

async function createSubscriptionsTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS subscriptions (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                type VARCHAR(255) NOT NULL,
                user_id VARCHAR(255) NOT NULL,
                start_date DATE NOT NULL,
                subscription_period VARCHAR(255) NOT NULL,
                selected_vehicle VARCHAR(255),
                subscription_stripe_id VARCHAR(255),
                active BOOLEAN NOT NULL
            );`

    return createTable
  } catch (error) {
    throw error
  }
}

async function createSubscriptionTypeTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS subscription_type (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                selected_vehicle_discount NUMERIC,
                all_vehicles_discount NUMERIC,
                gift_card_discount NUMERIC,
                insurance VARCHAR(255),
                price_monthly NUMERIC NOT NULL,
                stripe_monthly_prod_id VARCHAR(255) NOT NULL,
                price_yearly NUMERIC NOT NULL,
                stripe_yearly_prod_id VARCHAR(255) NOT NULL
            );`
    return createTable
  } catch (error) {
    throw error
  }
}

async function createSubscriptionDescriptionTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS subscription_description (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                subscription_id VARCHAR(255) NOT NULL,
                text TEXT NOT NULL
            );`

    return createTable
  } catch (error) {
    throw error
  }
}

async function createCarsDetailsTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS cars_details (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                brand VARCHAR(255) NOT NULL,
                price_per_day NUMERIC NOT NULL,
                gearshift VARCHAR(255) NOT NULL,
                passengers NUMERIC NOT NULL,
                bags NUMERIC NOT NULL,
                doors NUMERIC NOT NULL
            );`

    return createTable
  } catch (error) {
    throw error
  }
}

async function createBikesDetailsTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS bikes_details (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price_per_day NUMERIC NOT NULL,
                range NUMERIC NOT NULL,
                top_speed NUMERIC NOT NULL,
                weight NUMERIC NOT NULL
            );`

    return createTable
  } catch (error) {
    throw error
  }
}

async function createScootersDetailsTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS scooters_details (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price_per_day NUMERIC NOT NULL,
                top_speed NUMERIC NOT NULL,
                max_weight NUMERIC NOT NULL,
                range NUMERIC NOT NULL
            );`

    return createTable
  } catch (error) {
    throw error
  }
}

async function createVehiclesTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS vehicles (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                type VARCHAR(255) NOT NULL,
                vehicle_details VARCHAR(255) NOT NULL,
                location VARCHAR(255) NOT NULL
            );`

    return createTable
  } catch (error) {
    throw error
  }
}

async function createLocationsTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS locations (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                street VARCHAR(255) NOT NULL,
                street_number VARCHAR(255) NOT NULL,
                city VARCHAR(255) NOT NULL,
                zip_code VARCHAR(255) NOT NULL,
                country VARCHAR(255) NOT NULL,
                latitude NUMERIC NOT NULL,
                longitude NUMERIC NOT NULL,
                always_open BOOLEAN NOT NULL,
                opening_hour_working_day INT,
                opening_hour_weekend INT,
                closing_hour_working_day INT,
                closing_hour_weekend INT,
                airport BOOLEAN NOT NULL
            );`

    return createTable
  } catch (error) {
    throw error
  }
}

async function createGiftCardsTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    const createTable = await client.sql`
              CREATE TABLE IF NOT EXISTS gift_cards (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id VARCHAR(255) NOT NULL,
                gift_card_type VARCHAR(255) NOT NULL,
                stripe_code VARCHAR(255),
                payment_successful BOOLEAN NOT NULL DEFAULT false,
                gift_card_sent BOOLEAN NOT NULL DEFAULT false,
                recipient_email VARCHAR(255) NOT NULL,
                recipient_name VARCHAR(255) NOT NULL,
                sender_name VARCHAR(255) NOT NULL,
                message_for_recipient VARCHAR(255),
                date_created DATE NOT NULL
              );`

    return createTable
  } catch (error) {
    throw error
  }
}

async function createGiftCardsDetailsTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    const createTable = await client.sql`
              CREATE TABLE IF NOT EXISTS gift_card_type (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                amount NUMERIC NOT NULL,
                stripe_coupon_id VARCHAR(255) NOT NULL,
                stripe_full_price_id VARCHAR(255) NOT NULL,
                stripe_price_id_5_off VARCHAR(255) NOT NULL,
                stripe_price_id_7_off VARCHAR(255) NOT NULL,
                stripe_price_id_12_off VARCHAR(255) NOT NULL,
              );`

    return createTable
  } catch (error) {
    throw error
  }
}

async function createVehicleImagesTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    const createTable = await client.sql`
              CREATE TABLE IF NOT EXISTS vehicle_images (
                  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                  vehicle_id VARCHAR(255) NOT NULL,
                  image_url TEXT NOT NULL,
                  main_image BOOLEAN NOT NULL
              );`

    return createTable
  } catch (error) {
    throw error
  }
}

async function main() {
  const client = await db.connect()
  await createUsersTable(client)
  await createRentsTable(client)
  await createSubscriptionsTable(client)
  await createSubscriptionTypeTable(client)
  await createSubscriptionDescriptionTable(client)
  await createCarsDetailsTable(client)
  await createBikesDetailsTable(client)
  await createScootersDetailsTable(client)
  await createVehiclesTable(client)
  await createLocationsTable(client)
  await createGiftCardsTable(client)
  await createGiftCardsDetailsTable(client)
  await createVehicleImagesTable(client)
  await client.end()
}

main().catch((err) =>
  console.error('error occured while creating tables:', err)
)

// async function deleteTable() {
//   const client = await db.connect()
//   await client.sql`
//               DROP TABLE IF EXISTS users
//               `
//   await client.end()
// }

// deleteTable().catch((err) =>
//   console.error('error occured while deleting tables:', err)
// )
