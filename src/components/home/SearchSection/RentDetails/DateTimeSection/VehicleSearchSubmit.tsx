import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

export default function VehicleSearchSubmit() {
  const router = useRouter()
  const vehicleSearch = useSelector(getVehicleSearchInfo)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (
      ((vehicleSearch.pickupLocation && vehicleSearch.sameReturn) ||
        (vehicleSearch.pickupLocation &&
          vehicleSearch.returnLocation &&
          !vehicleSearch.sameReturn)) &&
      vehicleSearch.pickupDate &&
      vehicleSearch.returnDate &&
      vehicleSearch.pickupTime &&
      vehicleSearch.returnTime &&
      vehicleSearch.vehicle
    ) {
      router.push(
        `/vehicles?pickupLocation=${vehicleSearch.pickupLocation.id}&pickupDate=${vehicleSearch.pickupDate}&returnDate=${vehicleSearch.returnDate}&vehicleType=${vehicleSearch.vehicle}`
      )
    } else {
      throw new Error('Information missing to submit search form')
    }
  }

  return (
    <button
      type="submit"
      className={clsx(
        'btn-primary -mt-6 h-full w-full text-nowrap py-4 text-base md:m-auto md:w-auto md:py-2',
        {
          'px-4': vehicleSearch.vehicle === 'scooters',
        }
      )}
      onClick={(e) => handleSubmit(e)}
    >
      Show {vehicleSearch.vehicle}
    </button>
  )
}
