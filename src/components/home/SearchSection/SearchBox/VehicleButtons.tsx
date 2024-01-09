'use client'
import clsx from 'clsx'
import { BsScooter } from 'react-icons/bs'
import { FaCar } from 'react-icons/fa'
import { TbMotorbike } from 'react-icons/tb'

export default function VehicleButtons({
  currentVehicle,
  setCurrentVehicle,
}: {
  currentVehicle: string
  setCurrentVehicle: (vehicle: string) => void
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
  return (
    <div className="flex max-w-full flex-wrap gap-4">
      {vehicles.map((vehicle) => (
        <button
          className={clsx(
            'flex items-center gap-3 rounded-full px-4 py-2 text-sm capitalize max-[400px]:px-3 max-[400px]:py-1 max-[400px]:text-[0.6rem]',
            {
              'bg-black text-white': currentVehicle === vehicle.text,
              'bg-quaternary text-primary hover:bg-tertiary':
                currentVehicle !== vehicle.text,
            }
          )}
          type="button"
          key={`${vehicle.text}-vb`}
          onClick={() => setCurrentVehicle(vehicle.text)}
        >
          {vehicle.icon}
          {vehicle.text}
        </button>
      ))}
    </div>
  )
}
