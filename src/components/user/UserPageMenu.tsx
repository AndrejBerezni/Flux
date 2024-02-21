import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'

import { robotoCondensed } from '@/app/fonts'
import { getUserId } from '@/store/authentication/selectors'

export default function UserPageMenu() {
  const pathname = usePathname()
  const uid = useSelector(getUserId)
  const links = [
    {
      text: 'Bookings',
      href: `/${uid}/bookings`,
    },
    {
      text: 'Subscriptions',
      href: `/${uid}/subscriptions`,
    },
    {
      text: 'Balance',
      href: `/${uid}/balance`,
    },
    {
      text: 'Account details',
      href: `/${uid}/details`,
    },
  ]
  return (
    <menu className="hidden h-fit flex-col gap-4 rounded-lg bg-white px-4 py-6 font-semibold shadow-md md:flex">
      {links.map((link) => (
        <Link
          href={link.href}
          key={`${link.text}-user-side-menu-link`}
          className={clsx(
            `${robotoCondensed.className} group border-b-2 pl-0 pr-8 text-xl uppercase duration-200 hover:border-b-brand`,
            {
              'border-b-brand text-brand': pathname === link.href,
              'border-b-tertiary text-primary': pathname !== link.href,
            }
          )}
        >
          <p
            className={clsx('duration-200 ', {
              'group-hover:translate-x-2 group-hover:text-brand':
                pathname !== link.href,
            })}
          >
            {link.text}
          </p>
        </Link>
      ))}
      <button
        className={`${robotoCondensed.className} group border-b-2 border-b-tertiary text-start text-xl uppercase text-primary duration-200 hover:border-b-brand hover:text-brand`}
      >
        <p className="duration-200 group-hover:translate-x-2">Sign Out</p>
      </button>
    </menu>
  )
}
