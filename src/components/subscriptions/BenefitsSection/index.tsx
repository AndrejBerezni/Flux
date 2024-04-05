import { robotoFlex } from '@/app/fonts'
import AnimationContentFadeIn from '@/components/animation/AnimationContentFadeIn'

import BenefitCard from './BenefitCard'

export default function BenefitsSection() {
  const benefits = [
    {
      title: 'Exclusive Discounts',
      list: [
        'Discounts on all vehicles',
        'Bigger discounts on selected types',
        'Discounts on gift card purchases',
      ],
      img: '/benefits-discount.png',
    },
    {
      title: 'Insurance Coverage',
      list: [
        'Included insurance in rent',
        'No hidden fees or charges',
        'Transparent coverage details',
      ],
      img: '/benefits-Insurance.png',
    },
    {
      title: 'All-Inclusive Benefits',
      list: [
        'All-inclusive subscription',
        'Flexible monthly cancellation',
        'Exceptional customer support',
      ],
      img: '/benefits-all.png',
    },
  ]
  return (
    <section className="section-padding flex flex-col gap-4 bg-white py-8 md:py-16">
      <AnimationContentFadeIn>
        <h2
          className={`${robotoFlex.className} text-3xl font-extrabold text-primary`}
        >
          Why choose a Flux Subscription?
        </h2>
      </AnimationContentFadeIn>
      <div className="flex w-full flex-col flex-wrap items-center justify-between gap-4 md:flex-row">
        {benefits.map((benefit) => (
          <BenefitCard
            key={`${benefit.title}-benefit-card`}
            benefit={benefit}
          />
        ))}
      </div>
    </section>
  )
}
