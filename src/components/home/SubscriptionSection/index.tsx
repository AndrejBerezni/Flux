import { robotoCondensed } from '@/app/fonts'
import Carousel from '@/components/Carousel'

import SubscriptionCard from './SubscriptionCard'

export default function SubscriptionSection() {
  // this should be stored in database later
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
    <section
      className={`${robotoCondensed.className} flex flex-col items-center gap-4 bg-tertiary px-2 pb-16 pt-8 sm:px-8 lg:px-48`}
    >
      <h2 className="text-center text-3xl font-extrabold uppercase sm:text-4xl lg:text-5xl">
        Flux Subscription
      </h2>
      <p className="text-center">
        Unlock exclusive savings on your rentals—subscribe to Flux today and
        drive both cleaner and more cost-effectively!
      </p>
      <Carousel>
        {subscriptions.map((sub) => (
          <SubscriptionCard key={sub.title} subscription={sub} />
        ))}
      </Carousel>
    </section>
  )
}