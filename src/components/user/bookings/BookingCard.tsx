import Link from 'next/link'

import { IRent } from '@/compiler/interfaces'
import { BookingStatus } from '@/compiler/types'
import Divider from '@/components/Divider'
import SuccessfulRentTimeDateLocation from '@/components/rent/SuccessfulRentTimeDateLocation'

import CancelBookingButton from './CancelBookingButton'

export default async function BookingCard({
  booking,
  status,
}: {
  booking: IRent
  status: BookingStatus
}) {
  return (
    <article className="flex flex-col items-center rounded-md border-2 p-2 shadow-md">
      <div className="flex w-full flex-col items-start justify-between sm:flex-row">
        <SuccessfulRentTimeDateLocation rent={booking} />
        <div className="flex flex-col items-start gap-3 p-2 sm:items-end">
          <p>
            Vehicle:{' '}
            <span className="font-semibold capitalize">
              {booking.vehicle_name}
            </span>
          </p>
          <p>
            Insurance:{' '}
            <span className="font-semibold capitalize">
              {booking.insurance_name}
            </span>
          </p>
          <p>
            Rent price:{' '}
            <span className="font-semibold capitalize">
              {Number(booking.rent_price).toLocaleString('de-De', {
                style: 'currency',
                currency: 'EUR',
              })}
            </span>
          </p>
          <Divider />
          <p className="text-lg">
            Total price:{' '}
            <span className="font-semibold capitalize text-brand">
              {(Number(booking.total_price) / 100).toLocaleString('de-De', {
                style: 'currency',
                currency: 'EUR',
              })}
            </span>
          </p>
        </div>
      </div>
      <Divider />
      <menu className="my-4 flex flex-col sm:flex-row md:self-end">
        <Link href={booking.rent_invoice} className="btn-primary m-4 text-base">
          Download Receipt
        </Link>
        {status === 'upcoming' && (
          <CancelBookingButton bookingId={booking.id} />
        )}
        {status === 'active' && (
          <Link href="/contact" className="btn-primary m-4 text-base">
            Request assistance
          </Link>
        )}
      </menu>
    </article>
  )
}
