import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'

import { hideModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'

export default function VehicleSort() {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)

  return (
    <fieldset
      className={clsx(
        'h-fit w-full flex-col items-center bg-white px-3 py-6 md:items-start md:shadow-lg',
        {
          'hidden md:flex': modal.modalType !== 'sortVehicles',
          flex: modal.modalType === 'sortVehicles',
        }
      )}
    >
      <h2 className="mb-1 text-xl font-extrabold uppercase tracking-wider">
        Sort
      </h2>
      <button
        className="btn-primary mt-12 sm:w-1/2 md:hidden"
        onClick={() => dispatch(hideModal())}
      >
        Sort vehicles
      </button>
    </fieldset>
  )
}
