import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'

import { hideModal, setMessage } from '@/store/modal'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

export default function VehicleSearchSubmit() {
  const dispatch = useDispatch()
  const router = useRouter()
  const vehicleSearch = useSelector(getVehicleSearchInfo)

  //Depending on the vehicle type, pass parameters for filtering vehicle
  const filtersQuery = {
    cars: `passengers=2&doors=2&bags=1`,
    bikes: `range=50&top_speed=50&weight=100`,
    scooters: `range=20&top_speed=25&max_weight=80`,
  }

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
        `/vehicles?pickupLocation=${
          vehicleSearch.pickupLocation.id
        }&returnLocation=${
          vehicleSearch.sameReturn
            ? vehicleSearch.pickupLocation.id
            : vehicleSearch.returnLocation?.id
        }&pickupDate=${vehicleSearch.pickupDate}&returnDate=${
          vehicleSearch.returnDate
        }&pickupTime=${vehicleSearch.pickupTime}&returnTime=${
          vehicleSearch.returnTime
        }&vehicleType=${vehicleSearch.vehicle}&${
          filtersQuery[vehicleSearch.vehicle]
        }&sort=name-asc&page=1`
      )
      dispatch(hideModal())
    } else {
      dispatch(
        setMessage({
          type: 'error',
          text: 'Please fill all the fields to search for vehicles.',
        })
      )
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
