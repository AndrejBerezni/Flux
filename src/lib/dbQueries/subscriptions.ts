import { sql } from '@vercel/postgres'

import {
  SubscriptionAction,
  SubscriptionName,
  VehicleType,
} from '@/compiler/types'

export const fetchSubscriptionDetails = async (
  subName: SubscriptionName
): Promise<string[]> => {
  try {
    const data = await sql`
        SELECT text
        FROM subscription_description
        JOIN subscription_type
        ON subscription_type.id::varchar = subscription_description.subscription_id
        WHERE subscription_type.name =${subName}`
    return data.rows.map((row) => row.text)
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Failed to retrieve subscription details')
  }
}

export const checkIfUserHasActiveSubscription = async (uid: string) => {
  try {
    const todayDate = new Date().toISOString().split('T')[0]
    const data = await sql`
    SELECT *
    FROM subscriptions
    WHERE user_id=${uid}
    AND (active = true OR (active = false AND end_date > ${todayDate}))
    ORDER BY start_date DESC`
    if (data.rows[0]) {
      return { hasSubscription: true, subscription: data.rows[0] }
    } else {
      return { hasSubscription: false, subscription: null }
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Failed to retrieve subscription details')
  }
}

export const createSubscription = async (
  subId: string,
  user_id: string,
  subPeriod: string,
  selectedVehicle: string
) => {
  try {
    const newSubscription = await sql`
      INSERT INTO subscriptions(type, user_id, start_date, subscription_period, selected_vehicle, active)
      VALUES(${subId}, ${user_id}, NOW(), ${subPeriod}, ${selectedVehicle}, FALSE)
      RETURNING id`
    return newSubscription.rows[0].id
  } catch (error) {
    console.error('Error creating subscription:', error)
    throw new Error('Failed to create subscription')
  }
}

export const updateSubscriptionToActive = async (
  subId: string,
  stripeSubId: string
) => {
  try {
    await sql`
    UPDATE subscriptions
    SET active=true, subscription_stripe_id=${stripeSubId}
    WHERE id::varchar=${subId}`
  } catch (error) {
    console.error('Error updating subscription:', error)
    throw new Error('Failed to activate subscription')
  }
}

export const changeSubscriptionStatus = async (
  subId: string,
  action: SubscriptionAction,
  endDate: number
) => {
  try {
    const endDateDate = new Date(endDate * 1000)
    const endDateString = endDateDate.toISOString().split('T')[0]

    await sql`
    UPDATE subscriptions
    SET active=${action === 'renew'}, end_date=${
      action === 'cancel' ? endDateString : null
    }
    WHERE id::varchar=${subId}`
  } catch (error) {
    console.error('Error deactivating subscription:', error)
    throw new Error('Failed to deactivate subscription')
  }
}

export const changeSubscriptionType = async (
  subId: string,
  typeId: string,
  selectedVehicle: VehicleType | null
) => {
  try {
    await sql`
    UPDATE subscriptions
    SET type=${typeId}, selected_vehicle=${selectedVehicle}
    WHERE id::varchar=${subId}`
  } catch (error) {
    console.error('Error changing subscription type:', error)
    throw new Error('Failed to change subscription type')
  }
}

export const getSubscribedUserId = async (subId: string) => {
  try {
    const data = await sql`
    SELECT user_id
    FROM subscriptions
    WHERE id::varchar=${subId}
    `
    return data.rows[0].user_id
  } catch (error) {
    console.error('Error retrieving user id:', error)
    throw new Error('Failed to retrieve user id')
  }
}
