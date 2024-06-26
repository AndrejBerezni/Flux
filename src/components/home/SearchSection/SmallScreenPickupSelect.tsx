'use client'

import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import { showModal, showSecondaryModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

import LocationSearch from './RentDetails/LocationSection/LocationSearch'
export default function SmallScreenPickupSelect() {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)
  const vehicleSearch = useSelector(getVehicleSearchInfo)

  const handleSelectPickupClick = () => {
    vehicleSearch.pickupLocation
      ? dispatch(
          showModal({ modalType: 'rentDetails', outerType: 'invisible' })
        )
      : dispatch(
          showSecondaryModal({
            secondaryModal: 'pickupLocation',
            outerType: 'invisible',
          })
        )
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-around md:hidden">
      <div className="flex items-center gap-2 text-lg max-[320px]:text-base">
        <FaSearch />
        <input
          readOnly
          type="text"
          placeholder="Airport or city"
          className="max-w-full flex-1 border-0 border-b-2 border-secondary pb-1 text-base focus:outline-none"
          onClick={() =>
            dispatch(
              showSecondaryModal({
                secondaryModal: 'pickupLocation',
                outerType: 'invisible',
              })
            )
          }
          value={
            vehicleSearch.pickupLocation
              ? vehicleSearch.pickupLocation.name
              : ''
          }
        />
      </div>
      <button
        type="button"
        className="btn-primary"
        onClick={handleSelectPickupClick}
      >
        Select pickup
      </button>
      {modal.secondaryModal === 'pickupLocation' && (
        <div className="fixed left-0 top-0 z-30 h-full bg-white">
          <LocationSearch variant="pickupLocation" />
        </div>
      )}
    </div>
  )
}
