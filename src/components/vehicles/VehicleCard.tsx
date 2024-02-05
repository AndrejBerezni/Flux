import Image from 'next/image'
import Link from 'next/link'
import { GiCarDoor } from 'react-icons/gi'
import { IoPeopleSharp } from 'react-icons/io5'
import { TbAutomaticGearbox, TbLuggage, TbManualGearbox } from 'react-icons/tb'

import { CarCard } from '@/lib/definitions'

export default function VehicleCard({
  vehicle,
  days,
}: {
  vehicle: CarCard
  days: number
}) {
  const carDetails = [
    {
      text: `${vehicle.passengers} seater`,
      icon: <IoPeopleSharp />,
      key: 'passenger-cd',
    },
    {
      text: `${vehicle.gearshift}`,
      icon:
        vehicle.gearshift === 'automatic' ? (
          <TbAutomaticGearbox />
        ) : (
          <TbManualGearbox />
        ),
      key: 'gear-cd',
    },
    { text: `${vehicle.doors} doors`, icon: <GiCarDoor />, key: 'doors-cd' },
    {
      text: `${vehicle.bags} bag${vehicle.bags > 1 ? 's' : ''}`,
      icon: <TbLuggage />,
      key: 'bags-cd',
    },
  ]
  return (
    <div className=" flex h-[420px] flex-col items-center justify-between bg-white p-4 shadow-lg duration-300 hover:scale-105 hover:shadow-xl">
      <h3 className="self-start text-2xl font-extrabold hover:cursor-default">
        {vehicle.brand} {vehicle.name}
      </h3>
      <Image
        src={vehicle.image_url}
        alt={`${vehicle.brand} ${vehicle.name}`}
        width={260}
        height={300}
      />
      <div className="flex w-full justify-around">
        {carDetails.map((detail) => (
          <div
            key={detail.key}
            className="flex flex-col items-center gap-1 text-xl font-semibold max-[300px]:text-base "
          >
            {detail.icon}
            <p className="text-base capitalize hover:cursor-default max-[300px]:text-sm">
              {detail.text}
            </p>
          </div>
        ))}
      </div>
      <div className="my-4 flex w-full items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="text-xl font-extrabold text-brand">
            {(Math.round(vehicle.price_per_day * 100) / 100).toFixed(2)}€ /day
          </p>
          <p className="font-bold">
            {(Math.round(vehicle.price_per_day * days * 100) / 100).toFixed(2)}€
            total
          </p>
        </div>
        <Link href="/" className="btn-primary py-1">
          Rent
        </Link>
      </div>
    </div>
  )
}
