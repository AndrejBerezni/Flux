import Image from 'next/image'
import Link from 'next/link'
import { BsSpeedometer } from 'react-icons/bs'
import { GiWeight } from 'react-icons/gi'
import { MdOutlineRadar } from 'react-icons/md'

import { IBikeCard } from '@/lib/definitions'

export default function BikeCard({
  vehicle,
  days,
}: {
  vehicle: IBikeCard
  days: number
}) {
  const bikeDetails = [
    {
      text: `${vehicle.range}km`,
      icon: <MdOutlineRadar />,
      key: 'range-bd',
      explanation: 'Vehicle range',
    },
    {
      text: `${vehicle.top_speed}km/h`,
      icon: <BsSpeedometer />,
      key: 'topspeed-sd',
      explanation: 'Top speed',
    },
    {
      text: `${vehicle.weight}kg`,
      icon: <GiWeight />,
      key: 'maxweight-sd',
      explanation: 'Vehicle weight',
    },
  ]
  return (
    <div className=" flex h-[420px] flex-col items-center justify-between bg-white p-4 shadow-lg duration-300 hover:scale-105 hover:shadow-xl">
      <h3 className="self-start text-xl font-extrabold hover:cursor-default">
        {vehicle.name}
      </h3>
      <Image
        src={vehicle.image_url}
        alt={`${vehicle.name}`}
        width={260}
        height={300}
      />
      <div className="flex w-full justify-around">
        {bikeDetails.map((detail) => (
          <abbr
            title={detail.explanation}
            key={detail.key}
            className="flex flex-col items-center gap-1 text-xl font-semibold no-underline max-[300px]:text-base "
          >
            {detail.icon}
            <p className="text-center text-base hover:cursor-default max-[300px]:text-sm">
              {detail.text}
            </p>
          </abbr>
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
