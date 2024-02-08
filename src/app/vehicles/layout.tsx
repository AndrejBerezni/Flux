import VehicleFilterSort from '@/components/vehicles/VehicleFilterSort'
import VehicleFilterSortButtonsGroup from '@/components/vehicles/VehicleFilterSortButtonsGroup'

import { robotoCondensed } from '../fonts'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={`${robotoCondensed.className} flex h-full w-full max-w-full flex-col gap-6 bg-quaternary py-10 pl-4 pr-6 md:flex-row lg:px-32 2xl:px-48`}
    >
      <VehicleFilterSort />
      <VehicleFilterSortButtonsGroup />
      {children}
    </section>
  )
}
