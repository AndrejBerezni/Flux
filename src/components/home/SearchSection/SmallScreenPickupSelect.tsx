'use client'
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import { showModal, showSecondaryModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'

export default function SmallScreenPickupSelect({
  children,
}: {
  children: React.ReactNode
}) {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)
  const searchParams = useSearchParams()

  const handleSelectPickupClick = () => {
    const params = new URLSearchParams(searchParams)
    params.has('pickupLocation')
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
            searchParams.has('pickupLocation')
              ? searchParams.get('pickupLocation')?.toString()
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
      <div
        className={clsx('z-30 h-full bg-white', {
          hidden: modal.secondaryModal !== 'pickupLocation',
          'fixed left-0 top-0': modal.secondaryModal === 'pickupLocation',
        })}
      >
        {children}
      </div>
    </div>
  )
}
