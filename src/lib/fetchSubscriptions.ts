import { sql } from '@vercel/postgres'

import { SubscriptionName } from '@/compiler/types'

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
