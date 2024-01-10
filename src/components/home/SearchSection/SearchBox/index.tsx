'use client'

import { useState } from 'react'

import PickupDetails from './PickupDetails'
import SmallScreenPickupSelect from './SmallScreenPickupSelect'
import VehicleButtons from './VehicleButtons'

export default function SearchBox() {
  const [currentVehicle, setCurrentVehicle] = useState<string>('cars')

  return (
    <div className="flex min-h-[200px] w-full flex-col gap-2 rounded-2xl bg-white p-4 shadow-md">
      <VehicleButtons
        currentVehicle={currentVehicle}
        setCurrentVehicle={(vehicle) => setCurrentVehicle(vehicle)}
      />
      <SmallScreenPickupSelect />
      <PickupDetails currentVehicle={currentVehicle} />
    </div>
  )
}
