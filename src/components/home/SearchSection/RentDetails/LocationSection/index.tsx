import { useSelector, useDispatch } from 'react-redux'

import { setDifferentReturn } from '@/store/vehicleSearch'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

import LocationSearch from './LocationSearch'

export default function LocationSection() {
  const dispatch = useDispatch()
  const vehicleSearch = useSelector(getVehicleSearchInfo)

  return (
    <fieldset
      aria-label="pickup and return location inputs"
      className="flex flex-col items-center gap-12 md:flex-1 md:flex-row md:gap-8"
    >
      <LocationSearch variant="pickupLocation" />
      {vehicleSearch.sameReturn ? (
        <button
          type="button"
          onClick={() => dispatch(setDifferentReturn())}
          className="self-start text-nowrap text-secondary hover:text-primary md:self-auto"
        >
          + Different return location
        </button>
      ) : (
        <LocationSearch variant="returnLocation" />
      )}
    </fieldset>
  )
}
