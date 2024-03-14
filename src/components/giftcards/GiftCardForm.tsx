'use client'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'

import { robotoCondensed, inter } from '@/app/fonts'
import { giftCardCheckoutAction } from '@/lib/serverActions/giftCardCheckoutAction'
import { getAuthStatus, getUserId } from '@/store/authentication/selectors'
import { setMessage, showModal } from '@/store/modal'

import Divider from '../Divider'

export default function GiftCardForm({ value }: { value: string }) {
  const dispatch = useDispatch()
  const uid = useSelector(getUserId)
  const isAuth = useSelector(getAuthStatus)

  const handleCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    if (!isAuth) {
      dispatch(showModal({ modalType: 'signIn', outerType: 'visible' }))
      return
    }
    try {
      await giftCardCheckoutAction(uid, value, formData)
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setMessage({ type: 'error', text: error.message }))
      }
    }
  }
  return (
    <form
      onSubmit={(e) => handleCheckout(e)}
      className={`${robotoCondensed.className} flex w-full flex-col items-center gap-6`}
    >
      <fieldset className="mb-3 flex w-full max-w-[400px] flex-col md:w-1/2 md:min-w-[300px]">
        <label
          htmlFor="gc-rec-email"
          className="font-bold uppercase text-brand"
        >
          Recipient email*
        </label>
        <input
          type="email"
          id="gc-rec-email"
          name="gc-rec-email"
          className="mb-2 rounded-md border-2 border-tertiary px-2 py-1 font-bold placeholder:font-normal focus:font-normal focus:text-brand focus:outline-brand"
          required
          placeholder="Where to send gift?"
        />
        <label htmlFor="gc-rec-name" className="font-bold uppercase text-brand">
          Recipient name*
        </label>
        <input
          type="text"
          id="gc-rec-name"
          name="gc-rec-name"
          className="rounded-md border-2 border-tertiary px-2 py-1 font-bold placeholder:font-normal focus:font-normal focus:text-brand focus:outline-brand"
          required
          placeholder="Who is this gift for?"
        />
      </fieldset>
      <fieldset className="mb-3 flex w-full max-w-[400px] flex-col md:w-1/2 md:min-w-[300px]">
        <label htmlFor="gc-sender" className="font-bold uppercase text-brand">
          Sender name*
        </label>
        <input
          type="text"
          id="gc-sender"
          name="gc-sender"
          className="mb-2 rounded-md border-2 border-tertiary px-2 py-1 font-bold placeholder:font-normal focus:font-normal focus:text-brand focus:outline-brand"
          required
          placeholder="Who is sending this gift?"
        />
      </fieldset>
      <fieldset className="mb-3 flex w-full max-w-[400px] flex-col md:w-1/2 md:min-w-[300px]">
        <label htmlFor="gc-message" className="font-bold uppercase text-brand">
          Add personalized message (Optional)
        </label>
        <textarea
          id="gc-message"
          name="gc-message"
          className="mb-2 rounded-md border-2 border-tertiary px-2 py-1 font-bold placeholder:font-normal focus:font-normal focus:text-brand focus:outline-brand"
          placeholder="Write your message here (max 240 characters)"
          rows={6}
        ></textarea>
      </fieldset>
      <p className="-mt-4 text-sm font-semibold text-brand">
        * Mandatory fields
      </p>
      <Divider />
      <div className={`${inter.className} flex gap-8`}>
        <Link
          href={`/giftcards/select?value=${value}`}
          className="btn-primary flex items-center gap-2 shadow-md"
        >
          <IoIosArrowBack />
          Back
        </Link>
        <button
          type="submit"
          className="btn-primary flex items-center gap-2 shadow-md"
        >
          Checkout
        </button>
      </div>
    </form>
  )
}
