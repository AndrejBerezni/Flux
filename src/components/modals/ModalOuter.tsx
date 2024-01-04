'use client'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'

import { hideModal } from '@/store/modal'
import { getShowModal } from '@/store/modal/selectors'

export default function ModalOuter() {
  const dispatch = useDispatch()
  const show: boolean = useSelector(getShowModal)

  return (
    <div
      className={clsx('z-20 bg-primary opacity-70', {
        'fixed left-0 top-0 h-screen w-screen': show,
        hidden: !show,
      })}
      onClick={() => dispatch(hideModal())}
    ></div>
  )
}
