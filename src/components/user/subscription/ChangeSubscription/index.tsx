import { useState } from 'react'

import {
  ISubscriptionWithDescription,
  IUserSubscription,
} from '@/compiler/interfaces'
import { VehicleType } from '@/compiler/types'
import useSubscriptions from '@/hooks/useSubscriptions'

import SelectNewSubscription from './SelectNewSubscription'
import SelectNewVehicleType from './SelectNewVehicleType'
import SubscriptionChangeConfirmation from './SubscriptionChangeConfirmation'
import SubscriptionChangeSelect from './SubscriptionChangeSelect'

SubscriptionChangeSelect

export default function ChangeSubscription({
  closeChangeSubscription,
  currentSubscription,
}: {
  closeChangeSubscription: () => void
  currentSubscription: IUserSubscription
}) {
  const [currentStep, setCurrentStep] = useState<
    'selectSubscription' | 'selectVehicle' | 'confirmation'
  >('selectSubscription')
  const [newSubscription, setNewSubscription] =
    useState<ISubscriptionWithDescription | null>(null)
  const [newVehicleType, setNewVehicleType] = useState<VehicleType | ''>('')
  const subscriptions = useSubscriptions()

  return (
    <>
      <article className="fixed left-0 top-0 z-30 flex h-full w-full flex-col gap-4 overflow-y-auto rounded-md border-2 border-tertiary bg-quaternary px-8 pb-8 pt-4 shadow-md md:left-1/2 md:top-1/2 md:h-fit md:w-[700px] md:-translate-x-1/2 md:-translate-y-1/2">
        {currentStep === 'selectSubscription' && (
          <SelectNewSubscription
            subscriptions={subscriptions}
            currentSubscription={currentSubscription}
            goToNextStep={setCurrentStep}
            setNewSubscription={setNewSubscription}
          />
        )}
        {currentStep === 'selectVehicle' && (
          <SelectNewVehicleType
            goToNextStep={() => setCurrentStep('confirmation')}
            setNewVehicleType={setNewVehicleType}
          />
        )}
        {currentStep === 'confirmation' && (
          <SubscriptionChangeConfirmation
            subscription={currentSubscription}
            newSubscriptionType={newSubscription}
            selectedVehicle={newVehicleType}
            closeChangeSubscription={closeChangeSubscription}
          />
        )}
        <button
          className="btn-primary mt-4 w-[200px] self-center"
          onClick={closeChangeSubscription}
        >
          Cancel
        </button>
      </article>
      <div
        className="fixed left-0 top-0 z-20 h-screen w-screen bg-primary opacity-70"
        onClick={closeChangeSubscription}
      ></div>
    </>
  )
}
