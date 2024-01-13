import { IoMdSearch } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'

import { showModal } from '@/store/modal'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

import LocationSearchResultBox from './LocationSearchResultBox'

export default function LocationSearch({
  variant,
}: {
  variant: 'returnLocation' | 'pickupLocation'
}) {
  const dispatch = useDispatch()
  const vehicleSearch = useSelector(getVehicleSearchInfo)

  return (
    <div className="relative w-full min-w-[250px] md:w-auto md:flex-1">
      <label
        htmlFor={`${variant}-search`}
        className="absolute bottom-full mb-1 text-base font-bold md:text-[0.8rem]"
      >
        {vehicleSearch.sameReturn
          ? 'Pick-up & return'
          : variant === 'pickupLocation'
            ? 'Pick-up'
            : 'Return'}
      </label>
      <input
        type="text"
        id={`${variant}-search`}
        className="w-full rounded-md px-10 py-3 font-medium caret-brand outline outline-1 outline-tertiary focus:outline-2 focus:outline-brand"
        placeholder="Airport or city"
        onFocus={() =>
          dispatch(
            showModal({
              modalType: variant,
              outerType: 'invisible',
            })
          )
        }
      />
      <IoMdSearch className="absolute left-2 top-1/4 text-2xl" />
      <LocationSearchResultBox variant={variant} />
    </div>
  )
}
