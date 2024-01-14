import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { IoMdSearch, IoIosArrowBack } from 'react-icons/io'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { TbLocation } from 'react-icons/tb'
import { useSelector, useDispatch } from 'react-redux'

import { hideSecondaryModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'
import { setSameReturn } from '@/store/vehicleSearch'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

import LocationResult from './LocationResult'

export default function LocationSearchResultBox({
  variant,
}: {
  variant: 'returnLocation' | 'pickupLocation'
}) {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)
  const vehicleSearch = useSelector(getVehicleSearchInfo)
  const router = useRouter() // we need this for first button of pickup location - to redirect user to /locations

  return (
    <div
      className={clsx(
        'fixed left-0 top-0 z-40 h-full w-full overflow-y-auto rounded-none border-[1px] border-solid border-tertiary bg-white shadow-lg md:absolute md:top-full md:mt-0.5 md:h-[400px] md:rounded-md',
        {
          hidden: modal.secondaryModal !== variant,
          'flex flex-col': modal.secondaryModal === variant,
        }
      )}
    >
      <div className="relative flex flex-col md:hidden">
        <button
          type="button"
          className="absolute left-2 top-4 text-2xl md:hidden"
          onClick={() => dispatch(hideSecondaryModal())}
        >
          <IoIosArrowBack />
        </button>
        <h2 className="py-4 text-center font-bold md:py-2">
          {vehicleSearch.sameReturn
            ? 'Pick-up & return'
            : variant === 'pickupLocation'
              ? 'Pick-up'
              : 'Return'}{' '}
          location
        </h2>
        <div className="relative flex flex-col">
          {' '}
          <input
            type="text"
            id={`${variant}-search`}
            className="mx-2 my-4 w-auto rounded-md px-10 py-3 font-medium caret-brand outline outline-1 outline-tertiary focus:outline-2 focus:outline-brand"
            placeholder="Airport or city"
          />
          <IoMdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl" />
        </div>

        <hr className="-ml-2" />
      </div>
      {variant === 'pickupLocation' ? (
        <LocationResult
          locationIcon={<TbLocation />}
          locationName="See options near me"
          handleClick={() => router.push('/locations')}
        />
      ) : (
        <LocationResult
          locationIcon={<RiArrowGoBackFill />}
          locationName="Return at pick-up"
          handleClick={() => {
            dispatch(hideSecondaryModal())
            dispatch(setSameReturn())
          }}
        />
      )}
    </div>
  )
}
