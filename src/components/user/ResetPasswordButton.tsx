import { useState } from 'react'

import { IoCloseSharp } from 'react-icons/io5'
import { MdOutlineMarkEmailUnread } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import { passwordReset } from '@/firebase/authentication'
import { setError } from '@/store/modal'

export default function ResetPasswordButton({ email }: { email: string }) {
  const dispatch = useDispatch()
  const [showMessage, setShowMessage] = useState<boolean>(true)

  const handleClick = async () => {
    try {
      await passwordReset(email)
      setShowMessage(true)
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message))
      }
    }
  }
  return (
    <>
      <button
        className="btn-primary w-full sm:w-auto"
        type="button"
        onClick={handleClick}
      >
        Reset Password
      </button>
      {showMessage && (
        <>
          <div className="fixed left-1/2 top-1/3 z-50 flex -translate-x-1/2 items-center justify-between gap-4 rounded-sm border-[1px] border-brand bg-white p-6 font-semibold shadow-md">
            <p className="text-xl">
              <MdOutlineMarkEmailUnread />
            </p>
            <p className="text-center text-base hover:cursor-default sm:text-lg">
              Password reset email sent to{' '}
              <span className="text-brand">{email}</span>
            </p>
            <button
              className="text-xl hover:scale-110 hover:drop-shadow-md"
              type="button"
              onClick={() => setShowMessage(false)}
            >
              <IoCloseSharp />
            </button>
          </div>
        </>
      )}
    </>
  )
}
