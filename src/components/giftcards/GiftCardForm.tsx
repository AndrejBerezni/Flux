import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'

import { robotoCondensed, inter } from '@/app/fonts'

import Divider from '../Divider'

export default function GiftCardForm({ value }: { value: string }) {
  return (
    <form
      className={`${robotoCondensed.className} flex w-full flex-col items-center gap-6`}
    >
      <fieldset className="mb-3 flex w-full max-w-[400px] flex-col md:w-1/2 md:min-w-[300px]">
        <label htmlFor="gc-email" className="font-bold uppercase text-brand">
          Recipient email
        </label>
        <input
          type="email"
          id="gc-email"
          name="gc-email"
          className="mb-2 rounded-md border-2 border-tertiary px-2 py-1 font-bold placeholder:font-normal focus:font-normal focus:text-brand focus:outline-brand"
          required
          placeholder="Where to send gift?"
        />
        <label htmlFor="gc-rec-name" className="font-bold uppercase text-brand">
          Recipient name
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
          Sender name
        </label>
        <input
          type="text"
          id="sender"
          name="sender"
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
