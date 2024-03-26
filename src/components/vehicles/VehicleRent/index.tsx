'use client'
import { useSelector, useDispatch } from 'react-redux'

import { robotoCondensed } from '@/app/fonts'
import { hideModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'

export default function VehicleRent() {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)
  if (modal.modalType === 'rent') {
    return (
      <div
        className={`${robotoCondensed.className} fixed z-30 flex h-screen w-screen flex-col gap-8 overflow-y-auto overflow-x-hidden bg-white px-12 py-14 md:left-1/2 md:top-[10%] md:h-auto md:max-h-[85%] md:w-[600px] md:-translate-x-1/2`}
      >
        <button onClick={() => dispatch(hideModal())}>Close</button>
        <h1></h1>
      </div>
    )
  }
}
