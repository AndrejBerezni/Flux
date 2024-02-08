import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'

import { hideModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'

import RangeFilter from './RangeFilter'

export default function VehicleFilters() {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)

  const filters = [
    { labelText: 'passengers', filterValues: [2, 4, 5, 7] },
    { labelText: 'doors', filterValues: [2, 3, 4, 5] },
    { labelText: 'bags', filterValues: [1, 2, 3] },
  ]

  return (
    <fieldset
      className={clsx(
        'h-fit w-full flex-col items-center bg-white px-3 py-6 md:items-start md:shadow-lg',
        {
          'hidden md:flex': modal.modalType !== 'vehicleFilters',
          flex: modal.modalType === 'vehicleFilters',
        }
      )}
    >
      <h2 className="mb-1 text-xl font-extrabold uppercase tracking-wider">
        Filters
      </h2>
      {filters.map((filter) => (
        <RangeFilter
          key={`${filter.labelText}-filter`}
          labelText={filter.labelText}
          filterValues={filter.filterValues}
        />
      ))}
      <button
        className="btn-primary mt-12 sm:w-1/2 md:hidden"
        onClick={() => dispatch(hideModal())}
      >
        Filter vehicles
      </button>
    </fieldset>
  )
}
