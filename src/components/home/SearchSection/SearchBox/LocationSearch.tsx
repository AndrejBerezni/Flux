import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'

import { getModalInfo } from '@/store/modal/selectors'

export default function LocationSearch({
  variant,
}: {
  variant: 'returnLocation' | 'pickupLocation'
}) {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)

  return (
    <div
      className={clsx(
        'fixed left-0 top-0 z-40 h-full w-full rounded-md border-[1px] border-solid border-tertiary bg-white shadow-lg md:absolute md:top-full md:mt-0.5 md:h-[400px]',
        {
          hidden: modal.modalType !== variant,
          flex: modal.modalType === variant,
        }
      )}
    ></div>
  )
}