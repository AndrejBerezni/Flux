import { FaRegClock } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import { IVehicleSearchState } from '@/store/vehicleSearch'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'
import { formatHour } from '@/utilities/formatHour'
import { showWorkingHours } from '@/utilities/showWorkingHours'

export default function WorkingHoursHeader({
  variant,
}: {
  variant: 'pickupTime' | 'returnTime'
}) {
  const vehicleSearch = useSelector(getVehicleSearchInfo)

  return (
    <>
      {showWorkingHours(vehicleSearch as IVehicleSearchState, variant)
        .opening === 0 ? (
        <h3 className="flex items-center gap-3 py-2 text-sm">
          <FaRegClock /> 24-hour{' '}
          {variant === 'pickupTime' ? 'pick-up' : 'return'}
        </h3>
      ) : (
        <h3 className="flex items-center gap-3 py-2 text-sm">
          <FaRegClock /> Working hours:{' '}
          {formatHour(
            showWorkingHours(vehicleSearch as IVehicleSearchState, variant)
              .opening,
            0
          )}{' '}
          -{' '}
          {formatHour(
            showWorkingHours(vehicleSearch as IVehicleSearchState, variant)
              .closing,
            0
          )}
        </h3>
      )}
    </>
  )
}
