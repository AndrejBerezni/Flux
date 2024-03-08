'use client'
import { useState } from 'react'

import { useDispatch } from 'react-redux'

import { SubscriptionAction } from '@/compiler/types'
import { setMessage } from '@/store/modal'

import SubscriptionActionConfirmation from './SubscriptionActionConfirmation'

export default function UserSubscriptionActionButtons({
  subId,
  subStripeId,
  endDate,
}: {
  subId: string
  subStripeId: string
  endDate: Date | undefined
}) {
  const dispatch = useDispatch()
  const [confirmation, setConfirmation] = useState<'' | SubscriptionAction>('')

  const handleModifySubscription = async (action: SubscriptionAction) => {
    try {
      const subscription = {
        id: subId,
        stripeId: subStripeId,
        action,
      }
      const response = await fetch('/api/subscriptions', {
        method: 'PATCH',
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

  const handleCloseConfirmationBox = () => setConfirmation('')

  return (
    <div className="mt-auto flex flex-col-reverse flex-wrap items-center justify-center gap-8 lg:flex-row xl:mt-20">
      {endDate ? (
        <button
          className="btn-primary w-4/5 md:w-[220px]"
          onClick={async () => setConfirmation('renew')}
        >
          Renew Subscription
        </button>
      ) : (
        <>
          <button
            className="btn-primary w-4/5 bg-red-500 md:w-[220px]"
            onClick={async () => setConfirmation('cancel')}
          >
            Cancel Subscription
          </button>
          <button className="btn-primary w-4/5 md:w-[220px]">
            Change Subscription
          </button>
        </>
      )}
      {confirmation !== '' && (
        <SubscriptionActionConfirmation
          action={confirmation}
          handleAction={handleModifySubscription}
          closeConfirmation={handleCloseConfirmationBox}
        />
      )}
    </div>
  )
}