import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { TbLocation } from 'react-icons/tb'
import { useSelector, useDispatch } from 'react-redux'

import { getModalInfo } from '@/store/modal/selectors'
import { setSameReturn } from '@/store/vehicleSearch'

import LocationResult from './LocationResult'

export default function LocationSearchResultBox({
  variant,
}: {
  variant: 'returnLocation' | 'pickupLocation'
}) {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)
  const router = useRouter() // we need this for first button of pickup location - to redirect user to /locations

  return (
    <div
      className={clsx(
        'fixed left-0 top-0 z-40 h-full w-full rounded-md border-[1px] border-solid border-tertiary bg-white shadow-lg md:absolute md:top-full md:mt-0.5 md:h-[400px]',
        {
          hidden: modal.modalType !== variant,
          flex: modal.modalType === variant,
        }
      )}
    >
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
          handleClick={() => dispatch(setSameReturn())}
        />
      )}
    </div>
  )
}
