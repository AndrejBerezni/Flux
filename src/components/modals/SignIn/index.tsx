'use client'
import { useState, ChangeEvent, useEffect } from 'react'

import clsx from 'clsx'
import Link from 'next/link'
import { FaGoogle } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'

import { robotoCondensed } from '@/app/fonts'
import { passwordReset } from '@/firebase/authentication'
import useEmailAuth from '@/hooks/useEmailAuth'
import useGoogleAuth from '@/hooks/useGoogleAuth'
import { setGlobalEmailInput } from '@/store/authentication'
import { hideModal, showModal, setMessage } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'

import ThirdPartyLoginButton from './ThirdPartyLoginButton'

export default function SignIn() {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)
  const [emailInput, setEmailInput] = useState<string>('')
  const [passwordInput, setPasswordInput] = useState<string>('')
  const [passwordInputVisible, setPasswordInputVisible] =
    useState<boolean>(false)
  const { checkEmail, handleEmailSignIn } = useEmailAuth()
  const handleGoogleSignIn = useGoogleAuth()

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

  const handlePasswordReset = async () => {
    try {
      await passwordReset(emailInput)
      dispatch(
        setMessage({
          type: 'message',
          text: `Password reset email sent to ${emailInput}`,
        })
      )
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setMessage({ type: 'error', text: error.message }))
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!passwordInputVisible) {
      try {
        const emailExists = await checkEmail(emailInput)
        if (emailExists) {
          setPasswordInputVisible(true)
        } else if (emailExists === false) {
          dispatch(setGlobalEmailInput(emailInput))
          dispatch(showModal({ modalType: 'signUp', outerType: 'visible' }))
        }
        // handle showing error for different auth method here
      } catch (error) {
        if (error instanceof Error) {
          dispatch(setMessage({ type: 'error', text: error.message }))
        }
      }
    } else {
      handleEmailSignIn(emailInput, passwordInput)
    }
  }

  //doing it this way in case we want to add more authentication methods in the future. Initial idea was to add Facebook and Twitter login too, but they require real business to create app on their platforms
  const buttons = [
    {
      icon: (
        <FaGoogle className="inline sm:absolute sm:left-4 sm:top-1/2 sm:-translate-y-1/2" />
      ),
      text: 'Continue with Google',
      handleClick: handleGoogleSignIn,
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
            handleClick={button.handleClick}
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
                className="input-with-floating-label peer"
                placeholder=" "
                value={emailInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmailInput(e.target.value)
                }
              />
              <label htmlFor="email" className="floating-label">
                Email
              </label>
            </div>
            <div
              className={clsx(
                'absolute top-0 z-0 w-full origin-right transition-all duration-500',
                {
                  '-right-[800px]': !passwordInputVisible,
                  'right-0': passwordInputVisible,
                }
              )}
            >
              <input
                type="password"
                id="password-si"
                tabIndex={-1}
                className="input-with-floating-label peer"
                placeholder=" "
                value={passwordInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPasswordInput(e.target.value)
                }
              />
              <label htmlFor="password-si" className="floating-label">
                Password
              </label>
              <div className="flex w-full justify-between">
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={handleBackToEmailInput}
                  className="flex items-center gap-1 font-bold text-secondary duration-150 hover:text-primary"
                >
                  <MdOutlineKeyboardBackspace />
                  Back
                </button>
                <button
                  className="font-bold text-secondary duration-150 hover:text-primary"
                  onClick={handlePasswordReset}
                  type="button"
                >
                  Forgot password?
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="my-12 w-full bg-brand px-2 py-4 text-xl font-bold text-white hover:text-white disabled:bg-brandDisabled disabled:hover:cursor-not-allowed sm:text-2xl"
            disabled={!emailInput || (passwordInputVisible && !passwordInput)}
            onClick={async (e) => await handleSubmit(e)}
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
