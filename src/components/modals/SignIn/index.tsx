'use client'
import { useState, ChangeEvent, useEffect } from 'react'

import clsx from 'clsx'
import Link from 'next/link'
import { FaGoogle } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'

import { robotoCondensed } from '@/app/fonts'
import { hideModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'

import ThirdPartyLoginButton from './ThirdPartyLoginButton'

export default function SignIn() {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)
  const [emailInput, setEmailInput] = useState<string>('')
  const [passwordInput, setPasswordInput] = useState<string>('')
  const [passwordInputVisible, setPasswordInputVisible] =
    useState<boolean>(false)

  //clean up input fields when modal is closed
  useEffect(() => {
    setEmailInput('')
    setPasswordInput('')
    setPasswordInputVisible(false)
  }, [modal.modalType])

  const handleBackToEmailInput = () => {
    if (passwordInput !== '') {
      setPasswordInput('')
    }
    setPasswordInputVisible(false)
  }

  //doing it this way in case we want to add more authentication methods in the future. Initial idea was to add Facebook and Twitter login too, but they require real business to create app on their platforms
  const buttons = [
    {
      icon: (
        <FaGoogle className="inline sm:absolute sm:left-4 sm:top-1/2 sm:-translate-y-1/2" />
      ),
      text: 'Continue with Google',
    },
  ]

  if (modal.modalType === 'signIn') {
    return (
      <div
        className={`${robotoCondensed.className} fixed z-30 flex h-screen w-screen flex-col gap-8 overflow-y-auto overflow-x-hidden bg-white px-12 py-14 md:left-1/2 md:top-[10%] md:h-auto md:max-h-[85%] md:w-[600px] md:-translate-x-1/2`}
      >
        <button
          type="button"
          className="absolute right-2 top-2 text-3xl hover:drop-shadow-md md:text-4xl"
          onClick={() => dispatch(hideModal())}
        >
          <IoCloseSharp />
        </button>
        <h3 className="mb-4 text-center text-xl font-bold hover:cursor-default md:text-start md:text-2xl">
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
          <div className="relative">
            <div
              className={clsx('relative z-0', {
                invisible: passwordInputVisible,
              })}
            >
              <input
                type="email"
                id="email"
                className="peer block w-full appearance-none border-0 border-b-2 border-primary bg-transparent px-0 py-2.5 text-2xl font-bold text-brand focus:border-brand focus:outline-none focus:ring-0"
                placeholder=" "
                value={emailInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmailInput(e.target.value)
                }
              />
              <label
                htmlFor="email"
                className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-2xl font-bold text-primary duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
              >
                Email
              </label>
            </div>
            <div
              className={clsx(
                'absolute top-0 z-0 w-full origin-right transition-all duration-500',
                {
                  '-right-[600px]': !passwordInputVisible,
                  'right-0': passwordInputVisible,
                }
              )}
            >
              <input
                type="password"
                id="password-si"
                className="peer block w-full appearance-none border-0 border-b-2 border-primary bg-white px-0 py-2.5 text-2xl font-bold text-brand focus:border-brand focus:outline-none focus:ring-0"
                placeholder=" "
                value={passwordInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPasswordInput(e.target.value)
                }
              />
              <label
                htmlFor="password-si"
                className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-2xl font-bold text-primary duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
              >
                Password
              </label>
              <button
                type="button"
                onClick={handleBackToEmailInput}
                className="flex items-center gap-1 font-bold text-secondary duration-150 hover:text-primary"
              >
                <MdOutlineKeyboardBackspace />
                Back
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="my-12 w-full bg-brand px-2 py-4 text-xl font-bold text-white hover:text-white disabled:bg-brandDisabled disabled:hover:cursor-not-allowed sm:text-2xl"
            disabled={!emailInput || (passwordInputVisible && !passwordInput)}
            onClick={() => setPasswordInputVisible(true)}
          >
            {passwordInputVisible ? 'Sign In' : 'Next'}
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
}
