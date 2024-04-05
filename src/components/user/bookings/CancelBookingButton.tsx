'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

import { cancelRent } from '@/lib/server_actions/rentActions'
import { setMessage } from '@/store/modal'

export default function CancelBookingButton({
  bookingId,
}: {
  bookingId: string
}) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false)

  const handleCancel = async () => {
    try {
      const message = await cancelRent(bookingId)
      dispatch(
        setMessage({
          type: 'info',
          text: message,
        })
      )
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          text:
            error instanceof Error
              ? error.message
              : 'Unknown error occurred, please try again later.',
        })
      )
    }
    setConfirmationOpen(false)
    router.refresh()
  }

  return (
    <>
      <button
        className="btn-primary m-4 bg-red-500 text-base"
        onClick={() => setConfirmationOpen(true)}
      >
        Cancel Booking
      </button>
      {confirmationOpen && (
        <>
          <article className="fixed left-1/2 top-1/3 z-30 w-[90%] -translate-x-1/2 rounded-md border-2 bg-white p-4 text-center sm:w-auto">
            <p className="text-xl font-semibold md:text-2xl">
              Are you sure you want to cancel this booking?
            </p>
            <div className="mt-4 flex w-full justify-center gap-12 sm:mt-6">
              <button
                className="btn-primary bg-red-500 sm:w-[100px]"
                onClick={handleCancel}
              >
                Yes
              </button>
              <button
                className="btn-primary sm:w-[100px]"
                onClick={() => setConfirmationOpen(false)}
              >
                No
              </button>
            </div>
          </article>
          <div
            className="fixed left-0 top-0 z-20 h-screen w-screen bg-primary opacity-70"
            onClick={() => setConfirmationOpen(false)}
          ></div>
        </>
      )}
    </>
  )
}
