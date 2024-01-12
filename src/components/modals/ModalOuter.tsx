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
      className={clsx('z-20 bg-primary', {
        'fixed left-0 top-0 h-screen w-screen':
          modal.modalType !== '' || modal.secondaryModal !== '',
        hidden: modal.modalType === '' && modal.secondaryModal === '',
        'opacity-70': modal.outerType === 'visible',
        'opacity-0': modal.outerType === 'invisible',
      })}
      onClick={() => dispatch(hideModal())}
    ></div>
  )
}
