import clsx from 'clsx'

import VehicleFilters from './VehicleFilters'

export default function VehicleFilterSort() {
  return (
    <section className="hidden h-fit max-w-[400px] md:sticky md:top-6 md:block md:min-w-[180px] lg:w-1/4">
      <VehicleFilters />
    </section>
  )
}
