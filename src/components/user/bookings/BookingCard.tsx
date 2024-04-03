import { IRent } from '@/compiler/interfaces'
import { BookingStatus } from '@/compiler/types'

export default function BookingCard({
  booking,
  status,
}: {
  booking: IRent
  status: BookingStatus
}) {
  return (
    <article>
      <h1>{booking.vehicle_name}</h1>
      <p>Status: {status}</p>
    </article>
  )
}
