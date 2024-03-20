'use client'
import { useState } from 'react'

import { MdOutlineEmail, MdOutlinePhone } from 'react-icons/md'

export default function ContactForm() {
  const [preferredContact, setPreferredContact] = useState<'email' | 'phone'>(
    'email'
  )
  return (
    <form className="flex flex-col items-start gap-6 py-8 text-brand sm:w-[70%] lg:w-[60%]">
      <div className="flex w-full flex-col gap-1 ">
        <label
          htmlFor="contact-name"
          className="text-lg font-semibold uppercase"
        >
          Your name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          className="rounded-md border-2 border-brand  p-2 font-semibold text-black"
          required
          placeholder="Enter your name"
        />
      </div>
      <fieldset>
        <legend className="mb-2 text-lg font-semibold uppercase">
          How would you like us to contact you?
        </legend>
        <div className="flex w-full justify-around">
          <div className="flex w-1/2 items-center gap-1">
            <input
              type="radio"
              name="contact-via"
              id="contact-via-email"
              onClick={() => setPreferredContact('email')}
              checked={preferredContact === 'email'}
              className="hover:cursor-pointer"
            />
            <label
              htmlFor="contact-via-email"
              className="flex items-center gap-1 text-lg hover:cursor-pointer hover:text-brandSecondary"
            >
              <MdOutlineEmail /> Email
            </label>
          </div>
          <div className="flex w-1/2 items-center gap-1 text-lg">
            <input
              type="radio"
              name="contact-via"
              id="contact-via-phone"
              onClick={() => setPreferredContact('phone')}
              className="hover:cursor-pointer"
            />
            <label
              htmlFor="contact-via-phone"
              className="flex items-center gap-1 hover:cursor-pointer hover:text-brandSecondary"
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
            className="text-lg font-semibold uppercase"
          >
            Your Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className="rounded-md border-2 border-brand  p-2 font-semibold text-black"
            required
            placeholder="Enter your email here"
          />
        </div>
      ) : (
        <div className="flex w-full flex-col gap-1">
          <label
            htmlFor="contact-email"
            className="text-lg font-semibold uppercase"
          >
            Your Phone number
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            className="rounded-md border-2 border-brand  p-2 font-semibold text-black"
            required
            placeholder="Enter your phone number"
            pattern="^(9[1236]\d{7}|2\d{8})$"
          />
        </div>
      )}
      <div className="flex w-full flex-col gap-1">
        <label
          htmlFor="contact-message"
          className="text-lg font-semibold uppercase"
        >
          How can we help?
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="rounded-md border-2 border-brand  p-2 font-semibold text-black"
          required
          placeholder="Enter your message here"
          rows={8}
        />
      </div>
      <button
        type="submit"
        className="btn-primary min-w-[200px] self-center uppercase hover:bg-brandSecondary"
      >
        Send
      </button>
    </form>
  )
}
