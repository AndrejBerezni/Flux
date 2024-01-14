import { useState, useEffect } from 'react'

import clsx from 'clsx'
import { Calendar as ReactCalendar } from 'react-calendar'
import { useSelector, useDispatch } from 'react-redux'
import { getModalInfo } from '@/store/modal/selectors'
import { IoIosArrowBack } from 'react-icons/io'

import { robotoCondensed } from '@/app/fonts'
import { setPickupDate, setReturnDate } from '@/store/vehicleSearch'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'
import { hideSecondaryModal } from '@/store/modal'
import './Calendar.css'

type CalendarValuePiece = Date | null

type CalendarValue =
  | CalendarValuePiece
  | [CalendarValuePiece, CalendarValuePiece]

export default function DateSelect() {
  const dispatch = useDispatch()
  const vehicleSearch = useSelector(getVehicleSearchInfo)
  const modal = useSelector(getModalInfo)

  const [calendarValue, setCalendarValue] = useState<CalendarValue>([
    new Date(vehicleSearch.pickupDate),
    new Date(vehicleSearch.returnDate),
  ])

  useEffect(() => {
    if (Array.isArray(calendarValue)) {
      const serializedPickup = calendarValue[0]?.toISOString()
      const serializedReturn = calendarValue[1]?.toISOString()
      dispatch(setPickupDate(serializedPickup))
      dispatch(setReturnDate(serializedReturn))
      dispatch(hideSecondaryModal())
    }
  }, [calendarValue, dispatch])

  return (
    <div
      className={clsx(
        `fixed left-0 top-0 z-40 h-screen w-screen flex-col overflow-y-auto rounded-none border-[1px] border-solid border-tertiary bg-white pb-4 md:absolute md:top-full md:mt-0.5 md:h-fit md:w-full md:rounded-md`,
        {
          hidden: modal.secondaryModal !== 'calendar',
          flex: modal.secondaryModal === 'calendar',
        }
      )}
    >
      <div className="relative border-[1px] border-solid border-tertiary md:hidden">
        <button
          type="button"
          className="absolute left-2 top-4 text-2xl md:hidden"
          onClick={() => dispatch(hideSecondaryModal())}
        >
          <IoIosArrowBack />
        </button>
        <h2 className="py-4 text-center font-bold md:py-2">
          Select pick-up and return dates
        </h2>
      </div>
      <ReactCalendar
        className={`${robotoCondensed.className} rounded-md`}
        value={calendarValue}
        onChange={setCalendarValue}
        minDate={new Date()}
        maxDate={new Date(new Date().setDate(new Date().getDate() + 365))}
        selectRange
        view="month"
      />
    </div>
  )
}
