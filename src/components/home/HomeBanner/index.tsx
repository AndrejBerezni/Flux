//this component should be customizable from admin portal later

import { robotoCondensed } from '@/app/fonts'

export default function HomeBanner() {
  return (
    <section
      className={`${robotoCondensed.className} bg-brand  py-8 text-center text-primary sm:px-12`}
    >
      <h1 className="text-5xl font-extrabold uppercase sm:text-6xl lg:text-7xl">
        Empower your travel.
      </h1>
      <h1 className="text-5xl font-extrabold uppercase sm:text-6xl lg:text-7xl">
        Rent electric.
      </h1>
      <p className="text-base font-bold sm:text-lg lg:text-xl">
        Sustainable mobility, unmatched experience.
      </p>
    </section>
  )
}
