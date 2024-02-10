import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'

import { hideModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'

import RangeFilter from './RangeFilter'

export default function VehicleFilters() {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)
  const searchParams = useSearchParams()

  const vehicleType = (searchParams.get('vehicleType') ||
    'cars') as keyof typeof filters

  const filters = {
    cars: [
      { labelText: 'passengers', filterValues: [2, 4, 5, 7] },
      { labelText: 'doors', filterValues: [2, 3, 4, 5] },
      { labelText: 'bags', filterValues: [1, 2, 3] },
    ],
    bikes: [
      { labelText: 'range (km)', filterValues: [50, 100, 150, 200] },
      { labelText: 'max speed (km/h)', filterValues: [50, 100, 200, 300] },
      { labelText: 'weight (kg)', filterValues: [100, 180, 250] },
    ],
    scooters: [
      { labelText: 'range (km)', filterValues: [20, 40, 60] },
      { labelText: 'max speed (km/h)', filterValues: [25, 35, 50] },
      { labelText: 'max weight (kg)', filterValues: [80, 100, 120] },
    ],
  }

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
      {filters[vehicleType].map((filter) => (
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
