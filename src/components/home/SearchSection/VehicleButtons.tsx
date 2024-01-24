'use client'
import clsx from 'clsx'
import { BsScooter } from 'react-icons/bs'
import { FaCar } from 'react-icons/fa'
import { TbMotorbike } from 'react-icons/tb'
import { useSelector, useDispatch } from 'react-redux'

import { setVehicle } from '@/store/vehicleSearch'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

export default function VehicleButtons() {
  const dispatch = useDispatch()
  const vehicleSearch = useSelector(getVehicleSearchInfo)

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
            'flex items-center gap-3 rounded-full px-4 py-2 text-sm capitalize max-[400px]:px-3 max-[400px]:py-1 max-[360px]:text-[0.7rem]',
            {
              'bg-black text-white': vehicleSearch.vehicle === vehicle.text,
              'bg-quaternary text-primary hover:bg-tertiary':
                vehicleSearch.vehicle !== vehicle.text,
            }
          )}
          type="button"
          key={`${vehicle.text}-vb`}
          onClick={() => dispatch(setVehicle(vehicle.text))}
        >
          {vehicle.icon}
          {vehicle.text}
        </button>
      ))}
    </div>
  )
}
