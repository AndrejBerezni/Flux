import type { Metadata } from 'next'

import Divider from '@/components/Divider'
import BookingCard from '@/components/user/bookings/BookingCard'
import BookingsNavbar from '@/components/user/bookings/BookingsNavbar'
import { fetchRentsForUser } from '@/lib/server_actions/rentActions'

export const metadata: Metadata = {
  title: 'Flux - Your Bookings',
  description: 'Rent Electrical Vehicles',
}

export default async function UserBookingsPage({
  params,
  searchParams,
}: {
  params: { user: string }
  searchParams?: { status?: 'active' | 'upcoming' | 'past' }
}) {
  const uid = params.user ?? ''
  const status = searchParams?.status ?? 'active'
  const today = new Date()

  const fetchBookings = async () => {
    try {
      const data = await fetchRentsForUser(uid)
      switch (status) {
        case 'active':
          return data.filter(
            (booking) =>
              booking.pickup_date < today && booking.return_date > today
          )
        case 'upcoming':
          return data.filter((booking) => booking.pickup_date > today)
        case 'past':
          return data.filter((booking) => booking.return_date < today)
        default:
          return data
      }
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Unknown error occured'
      )
    }
  }

  const bookings = await fetchBookings()

  return (
    <section className="flex max-w-full flex-1 flex-col rounded-md bg-white p-6 shadow-md">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <h1 className="text-2xl font-bold uppercase md:text-3xl">
            Your bookings
          </h1>
          <h2 className="my-1 text-base md:my-2 md:text-xl">
            Manage your bookings here
          </h2>
        </div>
        <BookingsNavbar />
      </div>
      <Divider />
      {bookings.map((booking) => (
        <BookingCard
          key={`${booking.pickup_date}-${booking.vehicle_name}-booking-card`}
          booking={booking}
          status={status}
        />
      ))}
    </section>
  )
}
