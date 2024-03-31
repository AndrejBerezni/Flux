import clsx from 'clsx'
import { IoIosArrowBack } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'

import { formatHour } from '@/lib/utilities/formatHour'
import { showWorkingHours } from '@/lib/utilities/showWorkingHours'
import { hideSecondaryModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'
import {
  setReturnTime,
  setPickupTime,
  IVehicleSearchState,
} from '@/store/vehicleSearch'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

import WorkingHoursHeader from './WorkingHoursHeader'

export default function TimeSelect({
  variant,
}: {
  variant: 'pickupTime' | 'returnTime'
}) {
  const dispatch = useDispatch()
  const vehicleSearch = useSelector(getVehicleSearchInfo)
  const modal = useSelector(getModalInfo)

  const dayIntervals = [
    {
      name: 'Early Morning',
      startHour: showWorkingHours(vehicleSearch as IVehicleSearchState, variant)
        .opening,
      endHour: 8,
    },
    { name: 'Morning - afternoon', startHour: 8, endHour: 17 },
    {
      name: 'Evening',
      startHour: 17,
      endHour: showWorkingHours(vehicleSearch as IVehicleSearchState, variant)
        .closing,
    },
  ]
  const renderButtons = (startHour: number, endHour: number) => {
    const times = []
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedTime = formatHour(hour, minute)
        times.push(
          <button
            type="button"
            key={formattedTime}
            onClick={() => {
              variant === 'pickupTime'
                ? dispatch(setPickupTime(formattedTime))
                : dispatch(setReturnTime(formattedTime))
              dispatch(hideSecondaryModal())
            }}
            className={clsx(`rounded-md py-4`, {
              'bg-primary text-white hover:bg-primary':
                (variant === 'pickupTime' &&
                  vehicleSearch.pickupTime === formattedTime) ||
                (variant === 'returnTime' &&
                  vehicleSearch.returnTime === formattedTime),
              'bg-quaternary hover:bg-tertiary':
                (variant === 'pickupTime' &&
                  vehicleSearch.pickupTime !== formattedTime) ||
                (variant === 'returnTime' &&
                  vehicleSearch.returnTime !== formattedTime),
            })}
          >
            {formattedTime}
          </button>
        )
      }
    }
    return times
  }

  if (modal.secondaryModal === variant) {
    return (
      <div className="fixed left-0 top-0 z-40 flex h-screen w-screen flex-col overflow-y-auto rounded-none border-[1px] border-solid border-tertiary bg-white pl-2 pr-0 md:absolute md:top-full md:mt-0.5 md:h-[400px] md:w-full md:rounded-md">
        <div className="relative">
          <button
            type="button"
            className="absolute left-2 top-4 text-2xl md:hidden"
            onClick={() => dispatch(hideSecondaryModal())}
          >
            <IoIosArrowBack />
          </button>
          <h2 className="py-4 text-center font-bold md:py-2">
            Select {variant === 'pickupTime' ? 'pick-up' : 'return'} time
          </h2>
          <hr className="-ml-2" />
          <WorkingHoursHeader variant={variant} />
        </div>
        <div className="flex-1 overflow-y-auto">
          {dayIntervals.map((interval) => {
            const timeSelectButtons = renderButtons(
              interval.startHour,
              interval.endHour
            )
            if (timeSelectButtons.length > 0) {
              return (
                <div key={interval.name}>
                  <h3 className="text-sm font-bold tracking-wide">
                    {interval.name}
                  </h3>
                  <div className="mb-4 mt-2 grid grid-cols-2 gap-2 pr-2">
                    {timeSelectButtons}
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div>
    )
  }
}
