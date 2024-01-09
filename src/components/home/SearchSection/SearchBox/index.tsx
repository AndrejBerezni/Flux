'use client'

import { useState } from 'react'

import VehicleButtons from './VehicleButtons'

export default function SearchBox() {
  const [currentVehicle, setCurrentVehicle] = useState<string>('cars')

  return (
    <form className="flex min-h-[200px] w-full flex-col rounded-2xl bg-white p-4 shadow-md">
      <VehicleButtons
        currentVehicle={currentVehicle}
        setCurrentVehicle={(vehicle) => setCurrentVehicle(vehicle)}
      />
    </form>
  )
}
