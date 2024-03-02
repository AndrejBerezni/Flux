import { type NextRequest } from 'next/server'

import { createCheckoutSession } from '@/stripe/subscriptions'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const subscriptionId = searchParams.get('subId')
    if (!subscriptionId) {
      return Response.json(
        { message: 'Missing subscription id' },
        { status: 400 }
      )
    }
    const sessionUrl = await createCheckoutSession(subscriptionId as string)
    return Response.json(sessionUrl)
  } catch (error) {
    throw error
  }
}
