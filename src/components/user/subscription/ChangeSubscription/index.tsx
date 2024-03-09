import { IUserSubscription } from '@/compiler/interfaces'
import Spinner from '@/components/Spinner'
import useSubscriptions from '@/hooks/useSubscriptions'

import SubscriptionChangeSelect from './SubscriptionChangeSelect'
SubscriptionChangeSelect

export default function ChangeSubscription({
  closeChangeSubscription,
  currentSubscription,
}: {
  closeChangeSubscription: () => void
  currentSubscription: IUserSubscription
}) {
  const subscriptions = useSubscriptions()
  return (
    <>
      <article className="fixed left-0 top-0 z-30 flex h-full w-full flex-col gap-4 overflow-y-auto rounded-md border-2 border-tertiary bg-quaternary px-8 pb-8 pt-4 shadow-md md:left-1/2 md:top-1/2 md:h-fit md:w-[700px] md:-translate-x-1/2 md:-translate-y-1/2">
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
                />
              ))
          ) : (
            <Spinner />
          )}
        </div>
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
