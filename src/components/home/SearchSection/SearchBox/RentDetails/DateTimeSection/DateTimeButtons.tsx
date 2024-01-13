import { FaRegCalendar, FaRegClock } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'

import { showSecondaryModal } from '@/store/modal'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'
import { extractDayMonth } from '@/utilities/extractDayMonth'

import TimeSelect from './TimeSelect'

export default function DateTimeButtons({
  variant,
}: {
  variant: 'Pick-up date' | 'Return date'
}) {
  const dispatch = useDispatch()
  const vehicleSearch = useSelector(getVehicleSearchInfo)

  return (
    <div
      aria-label={`${variant} buttons`}
      className="relative flex w-full flex-nowrap items-center md:w-auto md:flex-1"
    >
      <p className="absolute bottom-full mb-1 text-base font-bold md:text-[0.8rem]">
        {variant}
      </p>
      <button
        type="button"
        className="flex flex-1 items-center gap-4 text-nowrap rounded-l-lg border-[1px] border-solid border-tertiary py-3 pl-2 pr-6 hover:bg-quaternary"
      >
        <FaRegCalendar className="text-2xl" />
        {variant === 'Pick-up date'
          ? extractDayMonth(new Date(vehicleSearch.pickupDate))
          : extractDayMonth(new Date(vehicleSearch.returnDate))}
      </button>
      <button
        type="button"
        className="flex flex-1 items-center gap-4 rounded-r-lg border-[1px] border-solid border-tertiary px-3 py-3 hover:bg-quaternary"
        onClick={() =>
          variant === 'Pick-up date'
            ? dispatch(
                showSecondaryModal({
                  secondaryModal: 'pickupTime',
                  outerType: 'invisible',
                })
              )
            : dispatch(
                showSecondaryModal({
                  secondaryModal: 'returnTime',
                  outerType: 'invisible',
                })
              )
        }
      >
        <FaRegClock className="text-2xl md:hidden" />
        {variant === 'Pick-up date'
          ? vehicleSearch.pickupTime
          : vehicleSearch.returnTime}
      </button>
      <TimeSelect
        variant={variant === 'Pick-up date' ? 'pickupTime' : 'returnTime'}
      />
    </div>
  )
}
