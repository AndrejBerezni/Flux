'use client'
import { useState } from 'react'

import { useDispatch } from 'react-redux'

import { IUserSubscription } from '@/compiler/interfaces'
import { SubscriptionAction } from '@/compiler/types'
import { setMessage } from '@/store/modal'

import ChangeSubscription from './ChangeSubscription'
import SubscriptionActionConfirmation from './SubscriptionActionConfirmation'

export default function UserSubscriptionActionButtons({
  subscription,
}: {
  subscription: IUserSubscription
}) {
  const dispatch = useDispatch()
  const [confirmation, setConfirmation] = useState<'' | SubscriptionAction>('')
  const [showChangeSubscription, setShowChangeSubscription] =
    useState<boolean>(false)

  const handleModifySubscription = async (action: SubscriptionAction) => {
    try {
      const modifiedSubscription = {
        id: subscription.id,
        stripeId: subscription.subscription_stripe_id,
        action,
      }
      const response = await fetch('/api/subscriptions', {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(modifiedSubscription),
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
  const handleCloseChangeSubscription = () => setShowChangeSubscription(false)

  return (
    <div className="mt-auto flex flex-col-reverse flex-wrap items-center justify-center gap-8 lg:flex-row xl:mt-20">
      {subscription.end_date ? (
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
          <button
            className="btn-primary w-4/5 md:w-[220px]"
            onClick={() => setShowChangeSubscription(true)}
          >
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
      {showChangeSubscription && (
        <ChangeSubscription
          closeChangeSubscription={handleCloseChangeSubscription}
          currentSubscription={subscription}
        />
      )}
    </div>
  )
}
