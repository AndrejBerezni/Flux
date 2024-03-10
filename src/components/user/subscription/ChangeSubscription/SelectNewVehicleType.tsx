import { BsScooter } from 'react-icons/bs'
import { FaCar } from 'react-icons/fa'
import { TbMotorbike } from 'react-icons/tb'

import { VehicleType } from '@/compiler/types'

import NewVehicleTypeButton from './NewVehicleTypeButton'

export default function SelectNewVehicleType({
  goToNextStep,
  setNewVehicleType,
}: {
  goToNextStep: () => void
  setNewVehicleType: (vehicle: VehicleType) => void
}) {
  const vehicles = [
    {
      text: 'cars',
      icon: <FaCar />,
    },
    {
      text: 'bikes',
      icon: <TbMotorbike />,
    },
    {
      text: 'scooters',
      icon: <BsScooter />,
    },
  ]

  const handleVehicleSelect = (vehicle: VehicleType) => {
    setNewVehicleType(vehicle)
    goToNextStep()
  }
  return (
    <>
      <h2 className="text-2xl font-bold text-primary">
        Select preffered vehicle type:
      </h2>
      <div className="flex w-full flex-col gap-3">
        {vehicles.map((vehicle) => (
          <NewVehicleTypeButton
            key={`${vehicle.text}-new-vehicle-btn`}
            vehicle={vehicle}
            selectVehicle={() =>
              handleVehicleSelect(vehicle.text as VehicleType)
            }
          />
        ))}
      </div>
    </>
  )
}
