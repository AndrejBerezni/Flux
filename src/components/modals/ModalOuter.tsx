'use client'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'

import { hideModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'

export default function ModalOuter() {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)

  return (
    <div
      className={clsx('z-20 bg-primary opacity-70', {
        'fixed left-0 top-0 h-screen w-screen': modal.modalType !== '',
        hidden: modal.modalType === '',
      })}
      onClick={() => dispatch(hideModal())}
    ></div>
  )
}
