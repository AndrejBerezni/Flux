import DateSelect from './DateSelect'
import DateTimeButtons from './DateTimeButtons'
import VehicleSearchSubmit from './VehicleSearchSubmit'
import SearchBoxDivider from '../SearchBoxDivider'

export default function DateTimeSection() {
  return (
    <fieldset
      aria-label="pickup and return date inputs"
      className="relative flex flex-col items-center justify-between gap-12 md:flex-1 md:flex-row md:gap-8"
    >
      <DateTimeButtons variant="Pick-up date" />
      <DateTimeButtons variant="Return date" />
      <DateSelect />
      <SearchBoxDivider />
      <VehicleSearchSubmit />
    </fieldset>
  )
}
