'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FaCar } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdAccountCircle } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

import { getAuthStatus, getUserName } from '@/store/authentication/selectors'
import { showModal } from '@/store/modal'

import styles from '../../app/reusables.module.css'
import UserMenu from '../modals/UserMenu'

export default function Navbar() {
  const dispatch = useDispatch()
  const auth = useSelector(getAuthStatus)
  const username = useSelector(getUserName)

  return (
    <nav className="bg-transparent flex justify-between py-4 pl-2 pr-6 font-bold lg:px-48">
      <div className="flex items-center gap-1">
        <button className="duration-300 hover:scale-110">
          <GiHamburgerMenu
            className="text-3xl"
            onClick={() => {
              dispatch(
                showModal({ modalType: 'sideNav', outerType: 'visible' })
              )
            }}
          />
        </button>
        <Link href="/">
          <Image
            src="/FLUX-logo-black-nobg.png"
            alt="flux logo"
            width={80}
            height={32}
          />
        </Link>
      </div>
      <div className="relative flex items-center gap-8 sm:gap-12">
        <Link href="#" className="flex gap-2 ">
          <FaCar className="text-2xl" />
          <span className={`${styles.navText} hidden sm:inline`}>Bookings</span>
        </Link>
        {auth ? (
          <button
            type="button"
            className="flex gap-2"
            onClick={() => {
              dispatch(
                showModal({ modalType: 'userMenu', outerType: 'invisible' })
              )
            }}
          >
            <MdAccountCircle className="text-2xl" />
            <span className={`${styles.navText} hidden sm:inline`}>
              {username}
            </span>
          </button>
        ) : (
          <button
            type="button"
            className="flex gap-2"
            onClick={() => {
              dispatch(showModal({ modalType: 'signIn', outerType: 'visible' }))
            }}
          >
            <FaUser className="text-2xl" />
            <span className={`${styles.navText} hidden sm:inline`}>
              Login | Register
            </span>
          </button>
        )}

        <UserMenu />
      </div>
    </nav>
  )
}
