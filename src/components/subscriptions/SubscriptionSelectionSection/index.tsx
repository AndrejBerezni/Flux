'use client'
import { useState } from 'react'

import Spinner from '@/components/Spinner'
import useSubscriptions from '@/hooks/useSubscriptions'

import MonthYearSwitch from './MonthYearSwitch'
import SubscriptionSelect from './SubscriptionSelect'

export default function SubscriptionSelectionSection() {
  const [subscriptionPeriod, setSubscriptionPeriod] = useState<
    'month' | 'year'
  >('month')

  const subscriptions = useSubscriptions()

  return (
    <section className="section-padding flex flex-col items-center gap-4 bg-quaternary py-8">
      <h2 className="-mb-2 self-center text-3xl font-bold text-primary">
        Subscribe Now
      </h2>
      <MonthYearSwitch
        selectPeriod={setSubscriptionPeriod}
        period={subscriptionPeriod}
      />
      {subscriptions ? (
        subscriptions.map((sub) => (
          <SubscriptionSelect
            key={`${sub.name}-sub-select`}
            subscription={sub}
            period={subscriptionPeriod}
          />
        ))
      ) : (
        <Spinner />
      )}
    </section>
  )
}
