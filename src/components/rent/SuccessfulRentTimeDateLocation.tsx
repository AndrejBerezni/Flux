import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'

import { IRent } from '@/compiler/interfaces'

export default function SuccessfulRentTimeDateLocation({
  rent,
}: {
  rent: IRent
}) {
  return (
    <ul className="flex w-full flex-1 flex-col gap-2 px-2 py-4 sm:px-8">
      <li className="flex items-center gap-4">
        <HiOutlineBuildingOffice2 className="text-3xl" />
        <div>
          <p className="text-sm text-secondary">Pickup</p>
          <p className="font-bold">{rent.pickup_location}</p>
          <p>
            {rent.pickup_date.toISOString().split('T')[0]} |{' '}
            {rent.pickup_time.slice(0, 5)}
          </p>
        </div>
      </li>
      <li className="-my-4 ml-[10px] h-[50px] w-[2px] bg-secondary"></li>
      <li className="flex items-center gap-4">
        <HiOutlineBuildingOffice2 className="text-3xl" />
        <div>
          <p className="text-sm text-secondary">Return</p>
          <p className="font-bold">{rent.return_location}</p>
          <p>
            {rent.return_date.toISOString().split('T')[0]} |{' '}
            {rent.return_time.slice(0, 5)}
          </p>
        </div>
      </li>
    </ul>
  )
}
