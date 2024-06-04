import {
  ISubscriptionWithDescription,
  IUserSubscription,
} from '@/compiler/interfaces'
import LoaderAnimation from '@/components/Loader'

import SubscriptionChangeSelect from './SubscriptionChangeSelect'
export default function SelectNewSubscription({
  subscriptions,
  currentSubscription,
  goToNextStep,
  setNewSubscription,
}: Readonly<{
  subscriptions: ISubscriptionWithDescription[] | undefined
  currentSubscription: IUserSubscription
  goToNextStep: (
    nextStep: 'selectSubscription' | 'selectVehicle' | 'confirmation'
  ) => void
  setNewSubscription: (newSubscription: ISubscriptionWithDescription) => void
}>) {
  const handleNextStep = (newSubscription: ISubscriptionWithDescription) => {
    setNewSubscription(newSubscription)
    if (newSubscription.name === 'Platinum') {
      goToNextStep('confirmation')
    } else {
      goToNextStep('selectVehicle')
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-primary">
        Which plan would you like to change to?
      </h2>
      <div className="flex w-full flex-wrap justify-around gap-4">
        {subscriptions ? (
          // subscriptions are filtered, so that current subscription is not shown
          subscriptions
            .filter((sub) => sub.id !== currentSubscription.type)
            .map((sub) => (
              <SubscriptionChangeSelect
                key={`${sub.id}-change-sub-card`}
                subscription={sub}
                period={currentSubscription.subscription_period}
                handleSelect={handleNextStep}
              />
            ))
        ) : (
          <LoaderAnimation size="small" color="brand" />
        )}
      </div>
    </>
  )
}
