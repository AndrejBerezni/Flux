import clsx from 'clsx'
import { useSelector } from 'react-redux'

import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

import DateSelect from './DateSelect'
import DateTimeButtons from './DateTimeButtons'
import SearchBoxDivider from '../SearchBoxDivider'

export default function DateTimeSection() {
  const vehicleSearch = useSelector(getVehicleSearchInfo)
  return (
    <fieldset
      aria-label="pickup and return date inputs"
      className="relative flex flex-col items-center justify-between gap-12 md:flex-1 md:flex-row md:gap-8"
    >
      <DateTimeButtons variant="Pick-up date" />
      <DateTimeButtons variant="Return date" />
      <DateSelect />
      <SearchBoxDivider />
      <button
        type="submit"
        className={clsx(
          'btn-primary -mt-6 h-full w-full text-nowrap py-4 text-base md:m-auto md:w-auto md:py-2',
          {
            'px-4': vehicleSearch.vehicle === 'scooters',
          }
        )}
      >
        Show {vehicleSearch.vehicle}
      </button>
    </fieldset>
  )
}
