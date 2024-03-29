'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoCloseSharp } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'

import { hideModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'

export default function SideNav() {
  const dispatch = useDispatch()
  const pathname = usePathname()
  const modal = useSelector(getModalInfo)

  const links = [
    { href: '/', title: 'Rent' },
    { href: '/subscriptions', title: 'Subscriptions' },
    { href: '/giftcards', title: 'Gift Cards' },
    { href: '/contact', title: 'Contact' },
  ]

  return (
    <menu
      className={clsx(
        'fixed z-30 flex h-screen w-screen origin-left flex-col gap-12 bg-white py-8 pl-8 transition-all duration-500 sm:w-1/2 lg:w-1/4',
        {
          'left-0 top-0': modal.modalType === 'sideNav',
          '-left-[640px] sm:-left-1/2': modal.modalType !== 'sideNav',
        }
      )}
    >
      <div className="flex gap-4">
        <button
          className="duration-300 hover:drop-shadow-md"
          onClick={() => dispatch(hideModal())}
        >
          <IoCloseSharp className="text-4xl" />
        </button>
        <Image
          src="/FLUX-logo-black-nobg.png"
          alt="flux logo"
          width={100}
          height={40}
        />
      </div>
      {links.map((link) => (
        <Link
          key={`${link.title}-sidelink`}
          href={link.href}
          className={clsx('text-3xl font-bold duration-200 hover:text-brand', {
            'text-brand': pathname === link.href,
            'text-primary': pathname !== link.href,
          })}
          onClick={() => dispatch(hideModal())}
        >
          {link.title}
        </Link>
      ))}
    </menu>
  )
}
