import { BsSpeedometer } from 'react-icons/bs'
import { GiWeight, GiCarDoor } from 'react-icons/gi'
import { IoPeopleSharp } from 'react-icons/io5'
import { MdOutlineRadar } from 'react-icons/md'
import { TbAutomaticGearbox, TbLuggage, TbManualGearbox } from 'react-icons/tb'

import { ICarCard, IBikeCard, IScooterCard } from '@/compiler/interfaces'
import { VehicleType } from '@/compiler/types'

export default function VehicleProperties({
  vehicle,
  vehicleType,
}: Readonly<{
  vehicle: ICarCard | IBikeCard | IScooterCard
  vehicleType: VehicleType
}>) {
  const getVehicleDetails = () => {
    let currentVehicle
    let vehicleDetails
    switch (vehicleType) {
      case 'cars':
        currentVehicle = vehicle as ICarCard
        vehicleDetails = [
          {
            text: `${currentVehicle.passengers} seater`,
            icon: <IoPeopleSharp />,
            key: 'passenger-cd',
          },
          {
            text: `${currentVehicle.gearshift}`,
            icon:
              currentVehicle.gearshift === 'automatic' ? (
                <TbAutomaticGearbox />
              ) : (
                <TbManualGearbox />
              ),
            key: 'gear-cd',
          },
          {
            text: `${currentVehicle.doors} doors`,
            icon: <GiCarDoor />,
            key: 'doors-cd',
          },
          {
            text: `${currentVehicle.bags} bag${
              currentVehicle.bags > 1 ? 's' : ''
            }`,
            icon: <TbLuggage />,
            key: 'bags-cd',
          },
        ]
        break
      case 'bikes':
        currentVehicle = vehicle as IBikeCard
        vehicleDetails = [
          {
            text: `${currentVehicle.range}km`,
            icon: <MdOutlineRadar />,
            key: 'range-bd',
            explanation: 'Vehicle range',
          },
          {
            text: `${currentVehicle.top_speed}km/h`,
            icon: <BsSpeedometer />,
            key: 'topspeed-sd',
            explanation: 'Top speed',
          },
          {
            text: `${currentVehicle.weight}kg`,
            icon: <GiWeight />,
            key: 'maxweight-sd',
            explanation: 'Vehicle weight',
          },
        ]
        break
      case 'scooters':
        currentVehicle = vehicle as IScooterCard
        vehicleDetails = [
          {
            text: `${currentVehicle.range}km`,
            icon: <MdOutlineRadar />,
            key: 'range-sd',
            explanation: 'Vehicle range',
          },
          {
            text: `${currentVehicle.top_speed}km/h`,
            icon: <BsSpeedometer />,
            key: 'topspeed-sd',
            explanation: 'Top speed',
          },
          {
            text: `${currentVehicle.max_weight}kg`,
            icon: <GiWeight />,
            key: 'maxweight-sd',
            explanation: 'Maximum weight',
          },
        ]
        break
    }
    return vehicleDetails
  }

  const vehicleDetails = getVehicleDetails()

  return (
    <div className="flex w-full justify-around">
      {vehicleType === 'cars' &&
        vehicleDetails.map((detail) => (
          <div
            key={detail.key}
            className="flex flex-col items-center gap-1 text-lg font-semibold max-[300px]:text-base lg:text-xl "
          >
            {detail.icon}
            <p className="text-base capitalize hover:cursor-default max-[300px]:text-sm">
              {detail.text}
            </p>
          </div>
        ))}
      {(vehicleType === 'bikes' || vehicleType === 'scooters') &&
        vehicleDetails.map((detail) => (
          <abbr
            title={'explanation' in detail ? detail.explanation : ''}
            key={detail.key}
            className="flex flex-col items-center gap-1 text-lg font-semibold no-underline max-[300px]:text-base lg:text-xl "
          >
            {detail.icon}
            <p className="text-center text-base hover:cursor-default max-[300px]:text-sm">
              {detail.text}
            </p>
          </abbr>
        ))}
    </div>
  )
}
