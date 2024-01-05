'use client'

import clsx from 'clsx'
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'

import { hideModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'

import ThirdPartyLoginButton from './ThirdPartyLoginButton'

export default function SignIn() {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)
  return (
    <div
      className={clsx(
        'fixed z-30 flex h-screen w-screen flex-col bg-white px-12 py-14 md:left-1/2 md:top-1/4 md:h-auto md:w-[600px] md:-translate-x-1/2',
        {
          fixed: modal.modalType === 'signIn',
          hidden: modal.modalType !== 'signIn',
        }
      )}
    >
      <button
        className="absolute right-2 top-2 text-3xl hover:drop-shadow-md md:text-4xl"
        onClick={() => dispatch(hideModal())}
      >
        <IoCloseSharp />
      </button>
      <h3 className="mb-8 text-xl font-bold md:text-2xl">
        Create Account or Sign In
      </h3>
      <ThirdPartyLoginButton
        icon={
          <FaGoogle className="inline sm:absolute sm:left-4 sm:top-1/2 sm:-translate-y-1/2" />
        }
        text="Continue with Google"
      />
      <ThirdPartyLoginButton
        icon={
          <FaFacebook className="inline sm:absolute sm:left-4 sm:top-1/2 sm:-translate-y-1/2" />
        }
        text="Continue with Facebook"
      />
      <ThirdPartyLoginButton
        icon={
          <FaTwitter className="inline sm:absolute sm:left-4 sm:top-1/2 sm:-translate-y-1/2" />
        }
        text="Continue with Twitter"
      />
    </div>
  )
}
