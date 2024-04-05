import { useState } from 'react'

import { useDispatch } from 'react-redux'

import {
  ISubscriptionWithDescription,
  IUserSubscription,
} from '@/compiler/interfaces'
import { VehicleType } from '@/compiler/types'
import Divider from '@/components/Divider'
import LoaderAnimation from '@/components/Loader'
import { setMessage } from '@/store/modal'

export default function SubscriptionChangeConfirmation({
  subscription,
  newSubscriptionType,
  selectedVehicle,
  closeChangeSubscription,
}: {
  subscription: IUserSubscription
  newSubscriptionType: ISubscriptionWithDescription | null
  selectedVehicle: VehicleType | ''
  closeChangeSubscription: () => void
}) {
  const dispatch = useDispatch()
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false)
  const [waiting, setWaiting] = useState<boolean>(false)
  const information = [
    "By confirming, your subscription will be immediately updated to the new plan you've selected.",
    'There will be no charges at this moment.',
    "On your next invoice, you'll either be charged the difference if you've upgraded to a more expensive plan, or you'll receive a discounted amount if you've downgraded to a cheaper plan for this billing period.",
    "Please note that changing the billing period (e.g., from monthly to yearly or vice versa) is not possible. If you wish to switch billing periods, you'll need to cancel your current subscription and subscribe again.",
  ]

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedToTerms(event.target.checked)
  }

  const handleChangeSubscription = async () => {
    try {
      const modifiedSubscription = {
        id: subscription.id,
        stripeSubId: subscription.subscription_stripe_id,
        stripeProdId:
          subscription.subscription_period === 'month'
            ? newSubscriptionType?.stripe_monthly_prod_id
            : newSubscriptionType?.stripe_yearly_prod_id,
        type: newSubscriptionType?.id,
        vehicleType: selectedVehicle,
      }
      const response = await fetch('/api/subscriptions/changeplan', {
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

  const handleClick = async () => {
    setWaiting(true)
    await handleChangeSubscription()
    setWaiting(false)
    closeChangeSubscription()
  }
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl font-bold text-primary">
        Confirm subscription change
      </h2>
      <h3 className="text-xl font-semibold text-brand">
        Before proceeding, please review the following information:
      </h3>
      <Divider />
      <ul className="flex list-disc flex-col gap-2 px-4">
        {information.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
      <h3 className="mb-2 mt-4 text-xl font-semibold text-brand">
        New Subscription Plan:{' '}
        <span className="font-bold uppercase text-primary">
          Flux {newSubscriptionType!.name}
        </span>
      </h3>
      <Divider />
      <div className="flex gap-2">
        <input
          type="checkbox"
          id="terms-conditions-subscription"
          onChange={(e) => handleCheckBox(e)}
        />
        <label htmlFor="terms-conditions-subscription">
          By checking this box, I confirm that I&apos;ve read and agreed to the
          terms above.
        </label>
      </div>
      <button
        className="btn-primary -mb-3 mt-3 flex w-[200px] justify-center self-center"
        disabled={!agreedToTerms}
        onClick={handleClick}
      >
        {waiting ? <LoaderAnimation size="small" color="white" /> : 'Confirm'}
      </button>
    </div>
  )
}
