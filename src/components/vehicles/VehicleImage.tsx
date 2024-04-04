'use client'

import Image from 'next/image'

export default function VehicleImage({
  src,
  vehicleName,
  width,
  height,
}: {
  src: string
  vehicleName: string
  width: number
  height: number
}) {
  return (
    <Image
      src={src}
      alt={vehicleName}
      width={width}
      height={height}
      className="opacity-0 transition-opacity duration-1000"
      onLoadingComplete={(image) => image.classList.remove('opacity-0')}
    />
  )
}
