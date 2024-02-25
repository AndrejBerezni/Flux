import VehicleFilterSort from '@/components/vehicles/VehicleFilterSort'
import VehicleFilterSortButtonsGroup from '@/components/vehicles/VehicleFilterSortButtonsGroup'

import { robotoCondensed } from '../fonts'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={`${robotoCondensed.className} section-padding flex h-full w-full max-w-full flex-col gap-6  bg-quaternary md:flex-row`}
    >
      <VehicleFilterSort />
      <VehicleFilterSortButtonsGroup />
      {children}
    </section>
  )
}
