'use client'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

import { robotoCondensed } from '@/app/fonts'
import AnimationContentFadeIn from '@/components/animation/AnimationContentFadeIn'
import Carousel from '@/components/Carousel'
import Spinner from '@/components/Spinner'
import useSubscriptions from '@/hooks/useSubscriptions'

import SubscriptionCard from './SubscriptionCard'

export default function SubscriptionSection() {
  const subscriptions = useSubscriptions()

  return (
    <div className="bg-tertiary">
      <AnimationContentFadeIn>
        <section
          className={`${robotoCondensed.className} flex flex-col items-center gap-4  px-2 pb-16 pt-8 sm:px-0 lg:px-32 2xl:px-48`}
        >
          <h2 className="text-center text-3xl font-extrabold uppercase sm:text-4xl lg:text-5xl">
            Flux Subscription
          </h2>
          <p className="px-2 text-center">
            Unlock exclusive savings on your rentals—subscribe to Flux today and
            drive both cleaner and more cost-effectively!
          </p>
          {/* On <md screen show Carousel, on md+ screen show card for each subscription: */}
          {subscriptions ? (
            <>
              <div className="block md:hidden">
                <Carousel>
                  {subscriptions.map((sub) => (
                    <SubscriptionCard
                      key={`${sub.name}-home-sub-card-carousel`}
                      subscription={sub}
                    />
                  ))}
                </Carousel>
              </div>
              <div className="mt-6 hidden w-full items-center gap-6 md:flex md:flex-col">
                <div className="mb-4 flex justify-between lg:gap-12 xl:w-auto xl:gap-24">
                  {subscriptions.map((sub) => (
                    <SubscriptionCard
                      key={`${sub.name}-home-sub-card`}
                      subscription={sub}
                    />
                  ))}
                </div>
                <Link
                  href="/subscriptions"
                  className="btn-primary flex w-[200px] items-center justify-center gap-2 shadow-lg"
                >
                  Learn more
                  <FaArrowRight />
                </Link>
              </div>
            </>
          ) : (
            <Spinner />
          )}
        </section>
      </AnimationContentFadeIn>
    </div>
  )
}
