'use client'
import { useState, useEffect } from 'react'

import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'
import { IoCloseSharp } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'

import { robotoCondensed } from '@/app/fonts'
import useEmailAuth from '@/hooks/useEmailAuth'
import { setGlobalEmailInput } from '@/store/authentication'
import { getGlobalEmailInput } from '@/store/authentication/selectors'
import { showModal, hideModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'

export default function SignUp() {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)

  const userEmail = useSelector(getGlobalEmailInput)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { handleEmailSignUp } = useEmailAuth()

  //clean up input fields when modal is closed
  useEffect(() => {
    setFirstName('')
    setLastName('')
    setPassword('')
  }, [modal.modalType])

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await handleEmailSignUp({
        email: userEmail,
        first_name: firstName,
        last_name: lastName,
        password,
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (modal.modalType === 'signUp') {
    return (
      <div
        className={`${robotoCondensed.className} fixed z-30 flex h-screen w-screen flex-col overflow-y-auto bg-white px-12 pb-14 pt-20 md:left-1/2 md:top-[10%] md:h-auto md:max-h-[80%] md:w-[600px] md:-translate-x-1/2`}
      >
        <button
          className="absolute left-2 top-2 text-3xl hover:drop-shadow-md md:text-4xl"
          onClick={() => {
            dispatch(setGlobalEmailInput(''))
            dispatch(showModal({ modalType: 'signIn', outerType: 'visible' }))
          }}
        >
          <IoIosArrowBack />
        </button>
        <button
          type="button"
          className="absolute right-2 top-2 text-3xl hover:drop-shadow-md md:text-4xl"
          onClick={() => {
            dispatch(setGlobalEmailInput(''))
            dispatch(hideModal())
          }}
        >
          <IoCloseSharp />
        </button>
        <h3 className="mb-2 text-center text-2xl font-bold hover:cursor-default md:text-start md:text-3xl">
          Welcome aboard
        </h3>
        <p className="mb-10 text-xl text-secondary">
          Nice to meet you! Let&apos;s get to know each other better.
        </p>
        <form>
          <div className="mb-10 flex gap-8">
            <div className="relative z-0">
              <input
                type="text"
                id="firstname"
                className="peer block w-full appearance-none border-0 border-b-2 border-primary bg-transparent px-0 py-2.5 text-2xl font-bold text-brand focus:border-brand focus:outline-none focus:ring-0"
                placeholder=" "
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label
                htmlFor="firstname"
                className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-2xl font-bold text-primary duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
              >
                First name
              </label>
            </div>
            <div className="relative z-0">
              <input
                type="text"
                id="lastname"
                className="peer block w-full appearance-none border-0 border-b-2 border-primary bg-transparent px-0 py-2.5 text-2xl font-bold text-brand focus:border-brand focus:outline-none focus:ring-0"
                placeholder=" "
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label
                htmlFor="lastname"
                className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-2xl font-bold text-primary duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
              >
                Last name
              </label>
            </div>
          </div>
          <div className="relative z-0">
            <input
              type="password"
              id="password-su"
              className="peer block w-full appearance-none border-0 border-b-2 border-primary bg-transparent px-0 py-2.5 text-2xl font-bold text-brand focus:border-brand focus:outline-none focus:ring-0"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="password-su"
              className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-2xl font-bold text-primary duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
              Password
            </label>
          </div>
          <button
            type="submit"
            className="my-12 w-full bg-brand px-2 py-4 text-xl font-bold text-white hover:text-white disabled:bg-brandDisabled disabled:hover:cursor-not-allowed sm:text-2xl"
            disabled={!firstName || !lastName || !password}
            onClick={async (e) => await handleSignUp(e)}
          >
            Finish
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
