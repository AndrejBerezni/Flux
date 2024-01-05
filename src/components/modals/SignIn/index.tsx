'use client'

import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { hideModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'

export default function SignIn() {
  const modal = useSelector(getModalInfo)
  return (
    <div
      className={clsx(
        'z-30 flex h-screen w-screen border border-brand bg-white md:top-1/3 md:h-auto md:w-[600px]',
        {
          fixed: modal.modalType === 'signIn',
          hidden: modal.modalType !== 'signIn',
        }
      )}
    >
      <h1>Hello</h1>
    </div>
  )
}
