import Link from 'next/link'
import { FaCar, FaCreditCard, FaGift, FaSignOutAlt } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6'
import { IoCloseSharp } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'

import { robotoCondensed } from '@/app/fonts'
import AnimationDropFromAbove from '@/components/animation/AnimationDropFromAbove'
import { signOutUser } from '@/firebase/authentication'
import { signOut } from '@/store/authentication'
import { getUserId, getUserName } from '@/store/authentication/selectors'
import { hideModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'

export default function UserMenu() {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)
  const uid = useSelector(getUserId)
  const username = useSelector(getUserName)

  const links = [
    {
      icon: <FaCar />,
      text: 'Bookings',
      href: `/${uid}/bookings?status=active&page=1`,
    },
    {
      icon: <FaCreditCard />,
      text: 'Subscriptions',
      href: `/${uid}/subscriptions`,
    },
    {
      icon: <FaGift />,
      text: 'Gift Cards',
      href: `/${uid}/giftcards`,
    },
    {
      icon: <FaUser />,
      text: 'Account details',
      href: `/${uid}/details`,
    },
  ]

  const handleSignOut = () => {
    signOutUser()
    dispatch(signOut())
    dispatch(hideModal())
  }
  if (modal.modalType === 'userMenu') {
    return (
      <AnimationDropFromAbove additionalStyles="fixed right-0 top-0 z-30 h-screen rounded-md w-full bg-white sm:absolute sm:top-full sm:h-auto sm:w-[300px]">
        <menu className="rounded-md bg-white font-normal text-primary sm:shadow-md">
          <div className="mb-6 block pl-2 pt-4 sm:hidden">
            <button
              onClick={() => dispatch(hideModal())}
              className="duration-300 hover:drop-shadow-md"
            >
              <IoCloseSharp className="text-4xl" />
            </button>
            <h2
              className={`${robotoCondensed.className} pl-4 text-4xl font-extrabold uppercase tracking-wide`}
            >
              Hi, {username}
            </h2>
            <div className="my-6 h-0.5 w-full bg-quaternary"></div>
          </div>
          {links.map((link) => (
            <Link
              href={link.href}
              className="flex items-center gap-4 px-8 py-2 text-xl hover:bg-quaternary first-of-type:hover:rounded-t-md sm:text-base"
              key={`${link.text}-usermenu`}
              onClick={() => dispatch(hideModal())}
            >
              {link.icon}
              {link.text}
            </Link>
          ))}
          <div className="my-6 h-0.5 w-full bg-quaternary sm:my-0"></div>
          <button
            className="flex w-full items-center gap-4 px-8 py-2 text-xl hover:rounded-b-md hover:bg-quaternary sm:text-base"
            onClick={handleSignOut}
          >
            <FaSignOutAlt />
            Sign out
          </button>
        </menu>
      </AnimationDropFromAbove>
    )
  }
}
