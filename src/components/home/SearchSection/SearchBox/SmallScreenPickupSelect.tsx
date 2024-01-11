'use client'
import { FaSearch } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

import { showModal } from '@/store/modal'

import LocationSearch from './LocationSearch'

export default function SmallScreenPickupSelect() {
  const dispatch = useDispatch()

  return (
    <div className="flex w-full flex-1 flex-col justify-around md:hidden">
      <div className="flex items-center gap-2 text-lg max-[320px]:text-base">
        <FaSearch />
        <input
          type="text"
          placeholder="Airport or city"
          className="max-w-full flex-1 border-0 border-b-2 border-secondary pb-1 text-base focus:outline-none"
          onClick={() =>
            dispatch(
              showModal({ modalType: 'pickupLocation', outerType: 'invisible' })
            )
          }
        />
      </div>
      <button type="button" className="btn-primary">
        Select pickup
      </button>
      <LocationSearch variant="pickupLocation" />
    </div>
  )
}
