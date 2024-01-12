import clsx from 'clsx'
import { FaRegClock } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'

import { hideSecondaryModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'
import { setReturnTime, setPickupTime } from '@/store/vehicleSearch'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

export default function TimeSelect({
  variant,
}: {
  variant: 'pickupTime' | 'returnTime'
}) {
  const dispatch = useDispatch()
  const vehicleSearch = useSelector(getVehicleSearchInfo)
  const modal = useSelector(getModalInfo)

  const dayIntervals = [
    { name: 'Early Morning', startHour: 0, endHour: 8 },
    { name: 'Morning - afternoon', startHour: 8, endHour: 17 },
    { name: 'Evening', startHour: 17, endHour: 24 },
  ]
  const renderButtons = (startHour: number, endHour: number) => {
    const times = []
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedTime = `${String(hour).padStart(2, '0')}:${String(
          minute
        ).padStart(2, '0')}`
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

  return (
    <div
      className={clsx(
        `fixed top-0 z-40 w-full flex-col overflow-y-auto rounded-none border-[1px] border-solid border-tertiary bg-white pl-2 pr-0 md:absolute md:top-full md:mt-0.5 md:h-[400px] md:rounded-md`,
        {
          hidden: modal.secondaryModal !== variant,
          flex: modal.secondaryModal === variant,
        }
      )}
    >
      <div>
        <h2 className="py-2 text-center font-bold">
          Select {variant === 'pickupTime' ? 'pick-up' : 'return'} time
        </h2>
        <hr className="-ml-2" />
        <h3 className="flex items-center gap-3 py-2 text-sm">
          <FaRegClock /> 24-hour{' '}
          {variant === 'pickupTime' ? 'pick-up' : 'return'}
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        {dayIntervals.map((interval) => (
          <div key={interval.name}>
            <h3 className="text-sm font-bold tracking-wide">{interval.name}</h3>
            <div className="mb-4 mt-2 grid grid-cols-2 gap-2 pr-2">
              {renderButtons(interval.startHour, interval.endHour)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
