'use client'

import { useDispatch } from 'react-redux'

import { setMessage } from '@/store/modal'

export default function UserSubscriptionActionButtons({
  subId,
  subStripeId,
}: {
  subId: string
  subStripeId: string
}) {
  const dispatch = useDispatch()

  const handleCancelSubscription = async () => {
    try {
      const subscription = { id: subId, stripeId: subStripeId }
      const response = await fetch('/api/subscriptions', {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(subscription),
      })
      const data = await response.json()
      dispatch(setMessage({ type: 'info', text: data.message }))
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setMessage({ type: 'error', text: error.message }))
      }
    }
  }

  return (
    <div className="mt-auto flex flex-col-reverse flex-wrap items-center justify-center gap-8 lg:flex-row xl:mt-20">
      <button
        className="btn-primary w-4/5 bg-red-500 md:w-[220px]"
        onClick={handleCancelSubscription}
      >
        Cancel Subscription
      </button>
      <button className="btn-primary w-4/5 md:w-[220px]">
        Change Subscription
      </button>
    </div>
  )
}
