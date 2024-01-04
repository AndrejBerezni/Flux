'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FaCar } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useDispatch } from 'react-redux'

import { showModal } from '@/store/modal'

import styles from '../../app/reusables.module.css'

export default function Navbar() {
  const dispatch = useDispatch()

  return (
    <nav className="flex justify-between py-4 pl-2 pr-6 font-bold lg:px-48">
      <div className="flex items-center gap-1">
        <button className="duration-300 hover:scale-110">
          <GiHamburgerMenu
            className="text-4xl"
            onClick={() => dispatch(showModal('sideNav'))}
          />
        </button>
        <Link href="/">
          <Image
            src="/FLUX-logo-black-nobg.png"
            alt="flux logo"
            width={100}
            height={40}
          />
        </Link>
      </div>
      <div className="flex items-center gap-8 sm:gap-12">
        <Link href="#" className="flex gap-2 ">
          <FaCar className="text-2xl" />
          <span className={`${styles.navText} hidden sm:inline`}>Bookings</span>
        </Link>
        <Link href="#" className="flex gap-2">
          <FaUser className="text-2xl" />
          <span className={`${styles.navText} hidden sm:inline`}>
            Login | Register
          </span>
        </Link>
      </div>
    </nav>
  )
}
