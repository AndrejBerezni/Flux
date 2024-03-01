'use client'

import { useState } from 'react'

import clsx from 'clsx'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

import { robotoCondensed } from '@/app/fonts'
import { VehicleType } from '@/compiler/types'

import Divider from '../Divider'

export default function SelectVehicleType() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [currentVehicle, setCurrentVehicle] = useState<VehicleType>(
    '' as VehicleType
  )

  const handleSelect = (vehicleType: VehicleType) => {
    const params = new URLSearchParams(searchParams)
    params.set('selectedVehicle', vehicleType)
    setCurrentVehicle(vehicleType)
    replace(`${pathname}?${params.toString()}`)
  }

  const vehicles = ['cars', 'bikes', 'scooters']

  return (
    <div
      className={`${robotoCondensed.className} flex w-full flex-col items-center`}
    >
      <h3 className="my-4 text-center text-3xl font-bold text-primary">
        Select vehicle type
      </h3>
      <div className="mb-4 flex w-full flex-col items-center md:w-auto md:min-w-[400px]">
        {vehicles.map((vehicle) => (
          <button
            key={`${vehicle}-select-type-btn`}
            className={clsx(
              'my-2 w-full rounded-lg border-2 px-8 py-4 text-xl font-semibold uppercase shadow-md duration-200',
              {
                'border-brandDarker bg-brand text-white':
                  currentVehicle === vehicle,
                ' border-tertiary bg-white text-primary hover:border-brandDarker hover:bg-brand hover:text-white active:scale-95 active:outline active:outline-2 active:-outline-offset-4 active:outline-brandDisabled':
                  currentVehicle !== vehicle,
              }
            )}
            onClick={() => handleSelect(vehicle as VehicleType)}
          >
            {vehicle}
          </button>
        ))}
      </div>
      <Divider />
    </div>
  )
}
