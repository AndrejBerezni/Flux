'use client'

import Image from 'next/image'

import { ICarCard, IBikeCard, IScooterCard } from '@/compiler/interfaces'

export default function VehicleImage({
  vehicle,
  width,
  height,
}: {
  vehicle: ICarCard | IBikeCard | IScooterCard
  width: number
  height: number
}) {
  return (
    <Image
      src={vehicle.image_url}
      alt={`${'brand' in vehicle && vehicle.brand} ${vehicle.name}`}
      width={width}
      height={height}
      className="opacity-0 transition-opacity duration-1000"
      onLoadingComplete={(image) => image.classList.remove('opacity-0')}
    />
  )
}
