import clsx from 'clsx'
import Link from 'next/link'
import { FaCar, FaCreditCard, FaWallet, FaSignOutAlt } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

import { getModalInfo } from '@/store/modal/selectors'

export default function UserMenu() {
  const modal = useSelector(getModalInfo)

  const links = [
    {
      icon: <FaCar />,
      text: 'Bookings',
      href: '/:user/bookings',
    },
    {
      icon: <FaCreditCard />,
      text: 'Subscriptions',
      href: '/:user/subscriptions',
    },
    {
      icon: <FaWallet />,
      text: 'Balance',
      href: '/:user/balance',
    },
    {
      icon: <FaUser />,
      text: 'Personal details',
      href: '/:user/details',
    },
  ]
  return (
    <menu
      className={clsx(
        'absolute right-0 top-full z-30 w-[300px] rounded-md font-normal shadow-md',
        {
          hidden: modal.modalType !== 'userMenu',
          block: modal.modalType === 'userMenu',
        }
      )}
    >
      {links.map((link) => (
        <Link
          href={link.href}
          className="hover:bg-quaternary flex items-center gap-4 px-8 py-2"
          key={`${link.text}-usermenu`}
        >
          {link.icon}
          {link.text}
        </Link>
      ))}
      <div className="bg-quaternary h-0.5 w-full"></div>
      <button className="hover:bg-quaternary flex w-full items-center gap-4 px-8 py-2">
        <FaSignOutAlt />
        Sign out
      </button>
    </menu>
  )
}
