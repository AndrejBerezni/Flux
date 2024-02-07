import Image from 'next/image'
import Link from 'next/link'

import { VehicleType } from '@/compiler/types'
import { ICarCard, IBikeCard, IScooterCard } from '@/lib/definitions'

import VehicleProperties from './VehicleProperties'

export default function VehicleCard({
  vehicle,
  vehicleType,
  days,
}: {
  vehicle: ICarCard | IBikeCard | IScooterCard
  vehicleType: VehicleType
  days: number
}) {
  return (
    <div className=" flex h-[420px] flex-col items-center justify-between bg-white p-4 shadow-lg duration-300 hover:scale-105 hover:shadow-xl">
      <h3 className="self-start text-xl font-extrabold hover:cursor-default">
        {'brand' in vehicle && vehicle.brand} {vehicle.name}
      </h3>
      <Image
        src={vehicle.image_url}
        alt={`${'brand' in vehicle && vehicle.brand} ${vehicle.name}`}
        width={vehicleType === 'cars' || vehicleType === 'bikes' ? 260 : 220}
        height={vehicleType === 'cars' || vehicleType === 'bikes' ? 300 : 220}
      />
      <VehicleProperties vehicle={vehicle} vehicleType={vehicleType} />
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
