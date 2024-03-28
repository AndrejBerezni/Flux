'use server'

import { sql } from '@vercel/postgres'

import { VehicleType } from '@/compiler/types'
import {
  retrieveVehiclePrice,
  createVehicleCheckoutSession,
} from '@/stripe/vehicles'

import { checkIfUserHasActiveSubscription } from '../dbQueries/subscriptions'

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
  total_price: number,
  insurance: string
) => {
  try {
    const rentData = await sql`
    INSERT INTO rents(user_id, vehicle_id, pickup_date, return_date, pickup_location, return_location, pickup_time, return_time, total_price, insurance)
    VALUES(${uid},${vehicle_id},${pickup_date},${return_date},${pickup_location},${return_location},${pickup_time},${return_time},${total_price},${insurance})
    RETURNING id`
    return rentData.rows[0].id
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Unable to proceed to rent checkout. Please try again later')
  }
}

export const rentCheckoutAction = async (rentDetails: {
  uid: string
  vehicle_id: string
  pickupDate: string
  returnDate: string
  pickupLocation: string
  returnLocation: string
  pickupTime: string
  returnTime: string
  total_price: number
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
      rentDetails.total_price,
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
    if (error instanceof Error) {
      return error.message
    }
  }
}
