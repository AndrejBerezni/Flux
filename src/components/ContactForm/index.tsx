'use client'
import { useState } from 'react'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { MdOutlineEmail, MdOutlinePhone } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import { handleNewSupportTicket } from '@/lib/serverActions/newSupportTicketAction'
import { setMessage } from '@/store/modal'

import Spinner from '../Spinner'

export default function ContactForm() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [preferredContact, setPreferredContact] = useState<'email' | 'phone'>(
    'email'
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const categories = [
    'General question',
    'Bookings',
    'Vehicle',
    'Gift Card',
    'Subscription',
    'Payment',
  ]

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData(event.currentTarget)
    try {
      await handleNewSupportTicket(formData)
      setIsLoading(false)
      router.push('/contact/sent')
    } catch (error) {
      setIsLoading(false)
      dispatch(
        setMessage({
          type: 'error',
          text:
            error instanceof Error
              ? error.message
              : 'Unknow error occurred. Please try again later!',
        })
      )
    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col items-start gap-6 py-8 text-black sm:w-[70%] lg:w-[60%]"
    >
      <div className="flex w-full flex-col gap-1 ">
        <label
          htmlFor="contact-name"
          className="text-lg font-semibold uppercase text-brandSecondary"
        >
          Your name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          className="rounded-md border-2 border-brandSecondary  p-2 font-semibold text-black"
          required
          placeholder="Enter your name"
        />
      </div>
      <fieldset>
        <legend className="mb-2 text-lg font-semibold uppercase text-brandSecondary">
          How would you like us to contact you?
        </legend>
        <div className="flex w-full justify-around">
          <div className="flex w-1/2 items-center gap-1 text-xl">
            <input
              type="radio"
              name="contact-via"
              id="contact-via-email"
              onClick={() => setPreferredContact('email')}
              checked={preferredContact === 'email'}
              className="peer hover:cursor-pointer"
            />
            <label
              htmlFor="contact-via-email"
              className={clsx(
                'flex items-center gap-1  hover:cursor-pointer hover:text-brand hover:underline peer-hover:text-brand peer-hover:underline',
                {
                  'text-brand': preferredContact === 'email',
                  'text-brandSecondary': preferredContact !== 'email',
                }
              )}
            >
              <MdOutlineEmail /> Email
            </label>
          </div>
          <div className="flex w-1/2 items-center gap-1 text-xl">
            <input
              type="radio"
              name="contact-via"
              id="contact-via-phone"
              onClick={() => setPreferredContact('phone')}
              className="peer hover:cursor-pointer"
            />
            <label
              htmlFor="contact-via-phone"
              className={clsx(
                'flex items-center gap-1 hover:cursor-pointer hover:text-brand hover:underline peer-hover:text-brand peer-hover:underline',
                {
                  'text-brand': preferredContact === 'phone',
                  'text-brandSecondary': preferredContact !== 'phone',
                }
              )}
            >
              <MdOutlinePhone /> Phone
            </label>
          </div>
        </div>
      </fieldset>
      {preferredContact === 'email' ? (
        <div className="flex w-full flex-col gap-1">
          <label
            htmlFor="contact-email"
            className="text-lg font-semibold uppercase text-brandSecondary"
          >
            Your Email address
          </label>
          <input
            id="contact-email"
            name="contact"
            type="email"
            className="rounded-md border-2 border-brandSecondary  p-2 font-semibold text-black"
            required
            placeholder="Enter your email here"
          />
        </div>
      ) : (
        <div className="flex w-full flex-col gap-1">
          <label
            htmlFor="contact-email"
            className="text-lg font-semibold uppercase text-brandSecondary"
          >
            Your Phone number
          </label>
          <input
            id="contact-phone"
            name="contact"
            type="tel"
            className="rounded-md border-2 border-brandSecondary  p-2 font-semibold text-black"
            required
            placeholder="Enter your phone number"
            pattern="^(9[1236]\d{7}|2\d{8})$"
          />
        </div>
      )}
      <div className="flex w-full flex-col gap-1">
        <label
          htmlFor="category"
          className="text-lg font-semibold uppercase text-brandSecondary"
        >
          What is your inquiry related to?
        </label>
        <select
          name="category"
          id="category"
          className="rounded-md border-2 border-brandSecondary  p-2 font-semibold text-black hover:cursor-pointer"
        >
          {categories.map((cat) => (
            <option value={cat} key={`${cat}-issue-category`}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-full flex-col gap-1">
        <label
          htmlFor="contact-message"
          className="text-lg font-semibold uppercase text-brandSecondary"
        >
          How can we help?
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="rounded-md border-2 border-brandSecondary  p-2 font-semibold text-black"
          required
          placeholder="Enter your message here (max 800 characters)"
          rows={8}
          maxLength={800}
        />
      </div>
      <button
        type="submit"
        className="btn-primary flex min-w-[200px] justify-center self-center uppercase hover:bg-brandSecondary"
      >
        {isLoading ? <Spinner /> : 'Send'}
      </button>
    </form>
  )
}
