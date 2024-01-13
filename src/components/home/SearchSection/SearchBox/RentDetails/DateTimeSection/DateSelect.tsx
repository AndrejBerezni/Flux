import { useState, useEffect } from 'react'

import clsx from 'clsx'
import { Calendar as ReactCalendar } from 'react-calendar'
import { useSelector, useDispatch } from 'react-redux'

import { robotoCondensed } from '@/app/fonts'
import { setPickupDate, setReturnDate } from '@/store/vehicleSearch'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

import './Calendar.css'

type CalendarValuePiece = Date | null

type CalendarValue =
  | CalendarValuePiece
  | [CalendarValuePiece, CalendarValuePiece]

export default function DateSelect() {
  const dispatch = useDispatch()
  const vehicleSearch = useSelector(getVehicleSearchInfo)
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
    }
  }, [calendarValue, dispatch])

  return (
    <div
      className={clsx(
        `fixed left-0 top-0 z-40 h-screen w-screen flex-col overflow-y-auto rounded-none border-[1px] border-solid border-tertiary bg-white pb-4 md:absolute md:top-full md:mt-0.5 md:h-fit md:w-full md:rounded-md`,
        {
          //   hidden: modal.secondaryModal !== variant,
          //   flex: modal.secondaryModal === variant,
        }
      )}
    >
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
