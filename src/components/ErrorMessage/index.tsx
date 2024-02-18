'use client'
import clsx from 'clsx'
import { BiError } from 'react-icons/bi'
import { IoCloseSharp } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'

import { setError } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'

export default function ErrorMessage() {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)

  const handleClose = () => dispatch(setError(''))

  return (
    <>
      <div
        className={clsx(
          'fixed left-1/2 z-50 flex w-[90%] origin-top -translate-x-1/2 items-center justify-between gap-6 rounded-md bg-white p-4 duration-500 ease-out sm:w-1/2',
          {
            '-top-full': modal.error === '',
            'top-4': modal.error !== '',
          }
        )}
      >
        <div className="text-2xl text-brand sm:text-4xl">
          <BiError />
        </div>
        <p className="text-center text-lg font-semibold">{modal.error}</p>
        <button
          onClick={handleClose}
          className="text-2xl hover:text-brand sm:text-4xl"
        >
          <IoCloseSharp />
        </button>
      </div>
      <div
        className={clsx(
          'fixed left-0 top-0 z-40 h-full w-full bg-primary opacity-80',
          {
            hidden: modal.error === '',
            block: modal.error !== '',
          }
        )}
        onClick={handleClose}
      ></div>
    </>
  )
}
