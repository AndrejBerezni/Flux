'use client'

import clsx from 'clsx'
import { useSelector } from 'react-redux'

import { getShowModal, getModalType } from '@/store/modal/selectors'

export default function SideNav() {
  const showModal: boolean = useSelector(getShowModal)
  const modalType: string = useSelector(getModalType)

  return (
    <menu
      className={clsx(
        'fixed z-30 h-screen w-screen origin-left bg-white transition-all duration-500 sm:w-1/2',
        {
          'left-0 top-0': showModal && modalType === 'sideNav',
          '-left-[640px] sm:-left-1/2': !showModal,
        }
      )}
    >
      <h1>Flux</h1>
    </menu>
  )
}
