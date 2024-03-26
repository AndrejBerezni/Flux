import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import { useSelector } from 'react-redux'

import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

export default function RentTimeDateLocation() {
  const rentDetails = useSelector(getVehicleSearchInfo)

  return (
    <ul className="flex items-center gap-2 border-t-[1px] border-t-tertiary px-2 py-4 sm:px-8">
      <li className="flex items-center gap-4">
        <HiOutlineBuildingOffice2 className="text-3xl" />
        <div>
          <p className="text-sm text-secondary">Pickup</p>
          <p className="font-bold">{rentDetails.pickupLocation?.name}</p>
          <p>
            {rentDetails.pickupDate.split('T')[0]} | {rentDetails.pickupTime}
          </p>
        </div>
      </li>
      <li className="mx-2 h-[2px] flex-1 bg-tertiary"></li>
      <li className="flex items-center gap-4">
        <HiOutlineBuildingOffice2 className="text-3xl" />
        <div>
          <p className="text-sm text-secondary">Return</p>
          <p className="font-bold">
            {rentDetails.sameReturn
              ? rentDetails.pickupLocation?.name
              : rentDetails.returnLocation?.name}
          </p>
          <p>
            {rentDetails.returnDate.split('T')[0]} | {rentDetails.returnTime}
          </p>
        </div>
      </li>
    </ul>
  )
}
