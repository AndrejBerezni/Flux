'use client'
import { useState, ChangeEvent, useEffect } from 'react'

import clsx from 'clsx'
import Link from 'next/link'
import { FaGoogle } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'

import { robotoCondensed } from '@/app/fonts'
import AnimationZoomIn from '@/components/animation/AnimationZoomIn'
import LoaderAnimation from '@/components/Loader'
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
  const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const [emailInput, setEmailInput] = useState<string>('')
  const [passwordInput, setPasswordInput] = useState<string>('')
  const [passwordInputVisible, setPasswordInputVisible] =
    useState<boolean>(false)
  const { checkEmail, handleEmailSignIn } = useEmailAuth()
  const handleGoogleSignIn = useGoogleAuth()

  //Surround Google sign in with starting and stopping spinner while function is executed
  const signInWithGoogle = async () => {
    setIsGoogleLoading(true)
    await handleGoogleSignIn()
    setIsGoogleLoading(false)
  }

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
    setIsEmailLoading(true)
    if (!passwordInputVisible) {
      try {
        const emailExists = await checkEmail(emailInput.trim().toLowerCase())
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
    setIsEmailLoading(false)
  }

  //doing it this way in case we want to add more authentication methods in the future. Initial idea was to add Facebook and Twitter login too, but they require real business to create app on their platforms
  const buttons = [
    {
      key: 'google-sign-in-button',
      icon: (
        <FaGoogle className="inline sm:absolute sm:left-4 sm:top-1/2 sm:-translate-y-1/2" />
      ),
      text: isGoogleLoading ? (
        <LoaderAnimation size="small" color="white" />
      ) : (
        'Continue with Google'
      ),
      handleClick: signInWithGoogle,
    },
  ]

  if (modal.modalType === 'signIn') {
    return (
      <AnimationZoomIn
        additionalStyles={`${robotoCondensed.className} fixed z-30 flex h-screen w-screen flex-col gap-8 overflow-y-auto overflow-x-hidden bg-white px-12 py-14 md:left-[calc((100vw-600px)/2)] md:top-[10%] md:h-auto md:max-h-[85%] md:w-[600px]`}
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
            key={button.key}
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
                'absolute top-0 z-0 w-full origin-right bg-white transition-all duration-500',
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
                  tabIndex={-1}
                >
                  Forgot password?
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="my-12 flex h-fit w-full justify-center bg-brand px-2 py-4 text-xl font-bold text-white hover:text-white disabled:bg-brandDisabled disabled:hover:cursor-not-allowed sm:text-2xl"
            disabled={!emailInput || (passwordInputVisible && !passwordInput)}
            onClick={async (e) => await handleSubmit(e)}
          >
            {isEmailLoading ? (
              <LoaderAnimation size="small" color="white" />
            ) : passwordInputVisible ? (
              'Sign In'
            ) : (
              'Next'
            )}
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
      </AnimationZoomIn>
    )
  }
}
