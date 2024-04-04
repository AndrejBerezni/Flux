'use client'
import clsx from 'clsx'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

import { BookingStatus } from '@/compiler/types'

import styles from '../../../app/reusables.module.css'

export default function BookingsNavbar() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const statuses: BookingStatus[] = ['active', 'upcoming', 'past']

  const currentStatus = searchParams.get('status')

  const handleStatus = (status: BookingStatus) => {
    const params = new URLSearchParams(searchParams)
    params.set('status', status)
    params.set('page', '1')
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <menu className="mt-4 flex gap-4 text-lg md:self-end md:text-xl lg:gap-8">
      {statuses.map((status) => (
        <button
          key={`${status}-bookings-link`}
          className={clsx(`border-b-2 font-semibold capitalize duration-150`, {
            '-translate-y-[3px] scale-[102%] border-b-brand text-brand':
              currentStatus === status,
            [`${styles.bookingsNavItem} border-b-transparent text-secondary  hover:text-brand`]:
              currentStatus !== status,
          })}
          onClick={() => handleStatus(status)}
        >
          {status}
        </button>
      ))}
    </menu>
  )
}
