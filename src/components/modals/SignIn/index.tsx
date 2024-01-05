'use client'
import { useMemo, useState, ChangeEvent } from 'react'

import clsx from 'clsx'
import Link from 'next/link'
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'

import { robotoCondensed } from '@/app/fonts'
import { hideModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'

import ThirdPartyLoginButton from './ThirdPartyLoginButton'

export default function SignIn() {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)
  const [emailInput, setEmailInput] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value)
  }

  const handleClose = () => {
    dispatch(hideModal())
    setEmailInput('')
  }

  const buttons = useMemo(
    () => [
      {
        icon: (
          <FaGoogle className="inline sm:absolute sm:left-4 sm:top-1/2 sm:-translate-y-1/2" />
        ),
        text: 'Continue with Google',
      },
      {
        icon: (
          <FaFacebook className="inline sm:absolute sm:left-4 sm:top-1/2 sm:-translate-y-1/2" />
        ),
        text: 'Continue with Facebook',
      },
      {
        icon: (
          <FaTwitter className="inline sm:absolute sm:left-4 sm:top-1/2 sm:-translate-y-1/2" />
        ),
        text: 'Continue with Twitter',
      },
    ],
    []
  )

  return (
    <div
      className={clsx(
        `${robotoCondensed.className} fixed z-30 flex h-screen w-screen flex-col gap-6 overflow-y-auto bg-white px-12 py-14 md:left-1/2 md:top-[10%] md:h-auto md:max-h-[85%] md:w-[600px] md:-translate-x-1/2`,
        {
          fixed: modal.modalType === 'signIn',
          hidden: modal.modalType !== 'signIn',
        }
      )}
    >
      <button
        className="absolute right-2 top-2 text-3xl hover:drop-shadow-md md:text-4xl"
        onClick={handleClose}
      >
        <IoCloseSharp />
      </button>
      <h3 className="mb-8 text-center text-xl font-bold hover:cursor-default md:text-start md:text-2xl">
        Create Account or Sign In
      </h3>
      {buttons.map((button) => (
        <ThirdPartyLoginButton
          text={button.text}
          icon={button.icon}
          key={button.text}
        />
      ))}
      <div className="flex items-center gap-3 font-bold before:block before:h-0.5 before:flex-1 before:bg-tertiary after:block after:h-0.5 after:flex-1 after:bg-tertiary hover:cursor-default">
        or
      </div>
      <form>
        <div className="relative z-0">
          <input
            type="email"
            id="email"
            className="bg-transparent peer block w-full appearance-none border-0 border-b-2 border-primary px-0 py-2.5 text-2xl font-bold text-brand focus:border-brand focus:outline-none focus:ring-0"
            placeholder=" "
            value={emailInput}
            onChange={handleChange}
          />
          <label
            htmlFor="email"
            className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-2xl font-bold text-primary duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Email
          </label>
        </div>
        <button
          type="submit"
          className="my-12 w-full bg-brand px-2 py-4 text-xl font-bold text-white hover:text-white disabled:bg-brandDisabled disabled:hover:cursor-not-allowed sm:text-2xl"
          disabled={!emailInput}
        >
          Next
        </button>
      </form>
      <div className="flex justify-center gap-12 font-bold text-secondary">
        <Link href="#" className="text-center hover:text-primary">
          Terms & conditions
        </Link>
        <Link href="#" className="text-center hover:text-primary">
          Privacy policy
        </Link>
      </div>
    </div>
  )
}
