'use client'
import clsx from 'clsx'
import { useSelector } from 'react-redux'

import { getModalInfo } from '@/store/modal/selectors'

import VehicleFilters from './VehicleFilters'
import VehicleSort from './VehicleSort'

export default function VehicleFilterSort() {
  const modal = useSelector(getModalInfo)
  return (
    <section
      className={clsx(
        'fixed left-0 top-0 z-30 h-full w-full flex-col gap-8 bg-white px-4 md:sticky md:top-6 md:h-fit md:w-[200px] md:bg-transparent md:px-0 xl:w-[280px]',
        {
          'hidden md:flex':
            modal.modalType !== 'vehicleFilters' &&
            modal.modalType !== 'sortVehicles',
          'flex md:flex':
            modal.modalType === 'vehicleFilters' ||
            modal.modalType === 'sortVehicles',
        }
      )}
    >
      <VehicleFilters />
      <VehicleSort />
    </section>
  )
}
