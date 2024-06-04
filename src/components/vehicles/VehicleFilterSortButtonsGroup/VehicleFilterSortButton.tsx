'use client'
import { useDispatch } from 'react-redux'

import { showModal } from '@/store/modal'

export default function VehicleFilterSortButton({
  buttonText,
  modal,
  icon,
}: Readonly<{
  buttonText: string
  modal: string
  icon: React.ReactNode
}>) {
  const dispatch = useDispatch()

  return (
    <button
      className="flex items-center gap-4 self-start rounded-full bg-secondary px-6 py-2 font-medium tracking-wider text-white hover:bg-brand sm:px-8 md:hidden"
      onClick={() =>
        dispatch(showModal({ modalType: modal, outerType: 'invisible' }))
      }
    >
      {buttonText}
      {icon}
    </button>
  )
}
