import { sql } from '@vercel/postgres'

import { ISubscription, ISubscriptionDescription } from '@/compiler/interfaces'

export async function GET() {
  try {
    const response = await sql<ISubscription>`SELECT * FROM subscription_type`
    const subscriptions = await response.rows
    const result = await Promise.all(
      subscriptions.map(async (subscription) => {
        const subResponse = await sql<ISubscriptionDescription>`
                    SELECT text FROM subscription_description
                    WHERE subscription_id=${subscription.id}
                `
        const description = subResponse.rows
        return { ...subscription, description }
      })
    )
    return Response.json(result)
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Error occured while fetching subscriptions details',
      }),
      {
        headers: {
          'Content-type': 'application/json',
        },
        status: 404,
      }
    )
  }
}
