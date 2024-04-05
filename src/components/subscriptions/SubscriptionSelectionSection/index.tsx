'use client'
import { useState } from 'react'

import { MonthYear } from '@/compiler/types'
import AnimationContentFadeIn from '@/components/animation/AnimationContentFadeIn'
import Spinner from '@/components/Spinner'
import useSubscriptions from '@/hooks/useSubscriptions'

import MonthYearSwitch from './MonthYearSwitch'
import SubscriptionSelect from './SubscriptionSelect'

export default function SubscriptionSelectionSection() {
  const [subscriptionPeriod, setSubscriptionPeriod] =
    useState<MonthYear>('month')

  const subscriptions = useSubscriptions()

  return (
    <section className="section-padding bg-quaternary py-8">
      <AnimationContentFadeIn>
        <div className="flex flex-col items-center gap-4">
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
        </div>
      </AnimationContentFadeIn>
    </section>
  )
}
