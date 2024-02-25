'use client'
import { useState } from 'react'

import MonthYearSwitch from './MonthYearSwitch'
import SubscriptionSelect from './SubscriptionSelect'

export default function SubscriptionSelectionSection() {
  const [subscriptionPeriod, setSubscriptionPeriod] = useState<
    'month' | 'year'
  >('month')

  //data in the future to be stored in database
  const subscriptions = [
    {
      title: 'Basic',
      benefits: [
        '7.5% discount on selected vehicle type',
        '5% discount on gift card purchases',
      ],
      prices: { month: 8.99, year: 86 },
    },
    {
      title: 'Gold',
      benefits: [
        '2% discount on all vehicles',
        '10% discount on selected vehicle type',
        'Medium insurance included in every rent',
        '7.5% discount on gift card purchases',
      ],
      prices: { month: 34.99, year: 335 },
    },
    {
      title: 'Platinum',
      benefits: [
        '10% discount on all vehicles',
        'Every 10th rent free',
        'Maximum insurance included in every rent',
        '12% discount on gift card purchases',
      ],
      prices: { month: 59.99, year: 575 },
    },
  ]
  return (
    <section className="section-padding flex flex-col items-center gap-4 bg-quaternary py-4">
      <h2 className="-mb-2 self-center text-3xl font-bold text-primary">
        Subscribe Now
      </h2>
      <MonthYearSwitch
        selectPeriod={setSubscriptionPeriod}
        period={subscriptionPeriod}
      />
      {subscriptions.map((sub) => (
        <SubscriptionSelect
          key={`${sub.title}-sub-select`}
          subscription={sub}
          period={subscriptionPeriod}
        />
      ))}
    </section>
  )
}
