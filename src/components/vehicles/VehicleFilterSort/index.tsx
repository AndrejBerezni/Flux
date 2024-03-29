'use client'
import { Suspense } from 'react'

import clsx from 'clsx'
import { useSelector } from 'react-redux'

import Spinner from '@/components/Spinner'
import { getModalInfo } from '@/store/modal/selectors'

import VehicleFilters from './VehicleFilters'
import VehicleSort from './VehicleSort'

export default function VehicleFilterSort() {
  const modal = useSelector(getModalInfo)
  return (
    <section
      className={clsx(
        'fixed left-0 top-0  h-full w-full flex-col gap-8 bg-white px-4 md:sticky md:top-6 md:h-fit md:w-[200px] md:bg-transparent md:px-0 xl:w-[280px]',
        {
          'z-10 hidden md:flex':
            modal.modalType !== 'vehicleFilters' &&
            modal.modalType !== 'sortVehicles',
          'z-30 flex md:flex':
            modal.modalType === 'vehicleFilters' ||
            modal.modalType === 'sortVehicles',
        }
      )}
    >
      <Suspense fallback={<Spinner />}>
        <VehicleFilters />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <VehicleSort />
      </Suspense>
    </section>
  )
}
