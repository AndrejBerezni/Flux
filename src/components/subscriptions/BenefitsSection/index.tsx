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
      title: 'Seamless Insurance Coverage',
      list: [
        'Included insurance in rent',
        'No hidden fees or charges',
        'Transparent coverage details',
      ],
      img: '/benefits-insurance.png',
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
    <section className="section-padding flex flex-col gap-4 bg-white py-20">
      <h2 className="text-3xl font-bold text-primary">
        Why choose a Flux Subscription?
      </h2>
      <div className="flex w-full flex-wrap items-center justify-between">
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
