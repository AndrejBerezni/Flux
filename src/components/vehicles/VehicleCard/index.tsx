import { ICarCard, IBikeCard, IScooterCard } from '@/compiler/interfaces'
import { VehicleType } from '@/compiler/types'
import FadeInImage from '@/components/FadeInImage'

import RentButton from './RentButton'
import VehiclePrice from './VehiclePrice'
import VehicleProperties from './VehicleProperties'

export default function VehicleCard({
  vehicle,
  vehicleType,
  days,
}: Readonly<{
  vehicle: ICarCard | IBikeCard | IScooterCard
  vehicleType: VehicleType
  days: number
}>) {
  return (
    <div className=" flex h-[420px] flex-col items-center justify-between bg-white p-4 shadow-lg duration-300 hover:scale-[101%] hover:shadow-xl">
      <h3 className="self-start text-xl font-extrabold hover:cursor-default">
        {'brand' in vehicle && vehicle.brand} {vehicle.name}
      </h3>
      <FadeInImage
        alt={vehicle.name}
        src={vehicle.image_url}
        width={vehicleType === 'cars' || vehicleType === 'bikes' ? 260 : 220}
        height={vehicleType === 'cars' || vehicleType === 'bikes' ? 300 : 220}
      />
      <VehicleProperties vehicle={vehicle} vehicleType={vehicleType} />
      <div className="my-4 flex w-full items-center justify-between">
        <VehiclePrice price={vehicle.price_per_day} days={days} />
        <RentButton vehicle={vehicle} />
      </div>
    </div>
  )
}
