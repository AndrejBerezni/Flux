import clsx from 'clsx'
import { useSelector } from 'react-redux'

import { getModalInfo } from '@/store/modal/selectors'

import RadioSort from './RadioSort'

export default function VehicleSort() {
  const modal = useSelector(getModalInfo)

  const options = [
    { labelText: 'Z-A', sortValue: 'name-desc' }, // later we parse sortValue string to apply to SQL query
    { labelText: 'A-Z', sortValue: 'name-asc' },
    { labelText: 'Price descending', sortValue: 'price_per_day-desc' },
    { labelText: 'Price ascending', sortValue: 'price_per_day-asc' },
  ]

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
      <div className="my-3 h-[1px] w-full bg-tertiary"></div>
      <div className="flex flex-col-reverse items-center gap-4 md:items-start md:gap-1">
        {options.map((option) => (
          <RadioSort
            key={`${option.sortValue}-radiobtn`}
            labelText={option.labelText}
            sortValue={option.sortValue}
            name="vehicle-sort"
          />
        ))}
      </div>
    </fieldset>
  )
}
