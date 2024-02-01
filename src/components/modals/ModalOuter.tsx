'use client'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'

import { hideModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'

export default function ModalOuter() {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)

  if (modal.modalType !== '' || modal.secondaryModal !== '') {
    return (
      <div
        className={clsx(
          'fixed left-0 top-0 z-20 h-screen w-screen bg-primary',
          {
            'opacity-70': modal.outerType === 'visible',
            'opacity-0': modal.outerType === 'invisible',
          }
        )}
        onClick={() => dispatch(hideModal())}
      ></div>
    )
  }
}
