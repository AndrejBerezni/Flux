'use server'

import { sql } from '@vercel/postgres'

import { IRent } from '@/compiler/interfaces'
import { VehicleType } from '@/compiler/types'
import {
  retrieveVehiclePrice,
  createVehicleCheckoutSession,
} from '@/stripe/vehicles'

import { checkIfUserHasActiveSubscription } from '../db_queries/subscriptions'

//This action is used to check if user has active subscription,  to handle effect that subscription will have on renting - apply discounts on rent
// Data from this function is stored in vehicleRent.subscription state
//It affects also what insurance options will be available on VehicleRent modal and what will be their price
export const subscriptionDetailsAction = async (uid: string) => {
  try {
    const subscription = await checkIfUserHasActiveSubscription(uid)
    if (subscription.hasSubscription) {
      const data = await sql`
        SELECT subscriptions.selected_vehicle,
        subscription_type.selected_vehicle_discount,
        subscription_type.all_vehicles_discount,
        subscription_type.insurance,
        subscription_type.name
        FROM subscriptions
        LEFT JOIN subscription_type ON subscriptions.type=subscription_type.id::varchar
        WHERE user_id=${uid}
        AND (active=true OR (active=false AND end_date > CURRENT_DATE))
        ORDER BY subscriptions.start_date DESC`
      return data.rows[0]
    } else {
      return null
    }
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Unknown error occured. Please try again later!'
    )
  }
}

//This action utilizes function written with stripe API to get numeric price and later display it in UI
export const getRentPriceAction = async (priceId: string) => {
  try {
    const price = await retrieveVehiclePrice(priceId)
    return price
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Unknown error occured. Please try again later!'
    )
  }
}

//This action is used to display all insurances we have in the UI
export const fetchInsurances = async (vehicle: VehicleType) => {
  try {
    const insurances = await sql`
    SELECT * FROM insurance
    WHERE vehicle=${vehicle}
    ORDER BY coverage_name ASC`
    return insurances.rows
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Unknown error occured. Please try again later!'
    )
  }
}

const createRentInDB = async (
  uid: string,
  vehicle_id: string,
  pickup_date: string,
  return_date: string,
  pickup_location: string,
  return_location: string,
  pickup_time: string,
  return_time: string,
  rent_price: number,
  insurance: string
) => {
  try {
    const rentData = await sql`
    INSERT INTO rents(user_id, vehicle_id, pickup_date, return_date, pickup_location, return_location, pickup_time, return_time, rent_price, insurance)
    VALUES(${uid},${vehicle_id},${pickup_date},${return_date},${pickup_location},${return_location},${pickup_time},${return_time},${rent_price},${insurance})
    RETURNING id`
    return rentData.rows[0].id
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Unable to proceed to rent checkout. Please try again later'
    )
  }
}

//On checkout, new rent is created in db (and later updated with webhook if session is successful) and checkout session URL is retrieved
export const rentCheckoutAction = async (rentDetails: {
  uid: string
  vehicle_id: string
  pickupDate: string
  returnDate: string
  pickupLocation: string
  returnLocation: string
  pickupTime: string
  returnTime: string
  rent_price: number
  insurance: string
  priceId: string
  days: number
  insuranceStripeId?: string
}) => {
  try {
    const newRent = await createRentInDB(
      rentDetails.uid,
      rentDetails.vehicle_id,
      rentDetails.pickupDate,
      rentDetails.returnDate,
      rentDetails.pickupLocation,
      rentDetails.returnLocation,
      rentDetails.pickupTime,
      rentDetails.returnTime,
      rentDetails.rent_price,
      rentDetails.insurance
    )
    const checkoutUrl = await createVehicleCheckoutSession(
      newRent,
      rentDetails.priceId,
      rentDetails.days,
      rentDetails.insuranceStripeId
    )
    return checkoutUrl
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Unknown error occurred.'
    )
  }
}

//This action is used to display rent in the UI
export const fetchRent = async (id: string) => {
  try {
    const data = await sql<IRent>`
    SELECT
    rents.pickup_date AS pickup_date,
    rents.return_date AS return_date,
    location_pickup.name AS pickup_location,
    location_return.name AS return_location,
    rents.pickup_time AS pickup_time,
    rents.return_time AS return_time,
    rents.rent_price AS rent_price,
    rents.total_price AS total_price,
    rents.invoice AS rent_invoice,
    insurance.coverage_name as insurance_name,
    CASE
      WHEN vehicles.type = 'cars' THEN CONCAT(cars_details.brand, ' ', cars_details.name)
      WHEN vehicles.type = 'bikes' THEN bikes_details.name
      WHEN vehicles.type = 'scooters' THEN scooters_details.name
    END AS vehicle_name,
    vehicle_images.image_url AS image_url
    FROM rents
    INNER JOIN vehicles ON vehicles.id::varchar = rents.vehicle_id
    LEFT JOIN cars_details ON vehicles.type = 'cars' AND vehicles.vehicle_details = cars_details.id::varchar
    LEFT JOIN bikes_details ON vehicles.type = 'bikes' AND vehicles.vehicle_details = bikes_details.id::varchar
    LEFT JOIN scooters_details ON vehicles.type = 'scooters' AND vehicles.vehicle_details = scooters_details.id::varchar
    LEFT JOIN locations location_pickup ON rents.pickup_location = location_pickup.id::varchar
    LEFT JOIN locations location_return ON rents.return_location = location_return.id::varchar
    LEFT JOIN insurance ON rents.insurance = insurance.id::varchar
    LEFT JOIN vehicle_images ON (CASE
      WHEN vehicles.type = 'cars' THEN cars_details.id
      WHEN vehicles.type = 'bikes' THEN bikes_details.id
      WHEN vehicles.type = 'scooters' THEN scooters_details.id
      END)::varchar = vehicle_images.vehicle_id AND vehicle_images.main_image = TRUE
    WHERE rents.id::varchar =${id}
    `
    return data.rows[0]
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Unknown error occurred.'
    )
  }
}

export const fetchRentsForUser = async (uid: string) => {
  try {
    const data = await sql<IRent>`
    SELECT
    rents.pickup_date AS pickup_date,
    rents.return_date AS return_date,
    location_pickup.name AS pickup_location,
    location_return.name AS return_location,
    rents.pickup_time AS pickup_time,
    rents.return_time AS return_time,
    rents.rent_price AS rent_price,
    rents.total_price AS total_price,
    rents.invoice AS rent_invoice,
    insurance.coverage_name as insurance_name,
    CASE
      WHEN vehicles.type = 'cars' THEN CONCAT(cars_details.brand, ' ', cars_details.name)
      WHEN vehicles.type = 'bikes' THEN bikes_details.name
      WHEN vehicles.type = 'scooters' THEN scooters_details.name
    END AS vehicle_name,
    vehicle_images.image_url AS image_url
    FROM rents
    INNER JOIN vehicles ON vehicles.id::varchar = rents.vehicle_id
    LEFT JOIN cars_details ON vehicles.type = 'cars' AND vehicles.vehicle_details = cars_details.id::varchar
    LEFT JOIN bikes_details ON vehicles.type = 'bikes' AND vehicles.vehicle_details = bikes_details.id::varchar
    LEFT JOIN scooters_details ON vehicles.type = 'scooters' AND vehicles.vehicle_details = scooters_details.id::varchar
    LEFT JOIN locations location_pickup ON rents.pickup_location = location_pickup.id::varchar
    LEFT JOIN locations location_return ON rents.return_location = location_return.id::varchar
    LEFT JOIN insurance ON rents.insurance = insurance.id::varchar
    LEFT JOIN vehicle_images ON (CASE
      WHEN vehicles.type = 'cars' THEN cars_details.id
      WHEN vehicles.type = 'bikes' THEN bikes_details.id
      WHEN vehicles.type = 'scooters' THEN scooters_details.id
      END)::varchar = vehicle_images.vehicle_id AND vehicle_images.main_image = TRUE
    WHERE rents.user_id::varchar =${uid}
    `
    return data.rows
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Unknown error occurred.'
    )
  }
}
