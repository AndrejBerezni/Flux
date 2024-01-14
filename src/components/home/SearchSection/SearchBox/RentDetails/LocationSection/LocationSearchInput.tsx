import { IoMdSearch } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'

import { showSecondaryModal } from '@/store/modal'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

export default function LocationSearchInput({
  variant,
}: {
  variant: 'pickupLocation' | 'returnLocation'
}) {
  const dispatch = useDispatch()
  const vehicleSearch = useSelector(getVehicleSearchInfo)
  return (
    <>
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
            showSecondaryModal({
              secondaryModal: variant,
              outerType: 'invisible',
            })
          )
        }
      />
      <IoMdSearch className="absolute left-2 top-1/4 text-2xl" />
    </>
  )
}
