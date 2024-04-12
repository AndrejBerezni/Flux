import type { Metadata } from 'next'

import Divider from '@/components/Divider'
import Pagination from '@/components/Pagination'
import BookingCard from '@/components/user/bookings/BookingCard'
import BookingsNavbar from '@/components/user/bookings/BookingsNavbar'
import NoBookingsInfo from '@/components/user/bookings/NoBookingsInfo'
import UserPageHeading from '@/components/user/UserPageHeading'
import { fetchRentsForUser } from '@/lib/server_actions/rentActions'

export const fetchCache = 'force-no-store'
export const metadata: Metadata = {
  title: 'Flux - Your Bookings',
  description: 'Rent Electrical Vehicles',
}

export default async function UserBookingsPage({
  params,
  searchParams,
}: {
  params: { user: string }
  searchParams?: { status?: 'active' | 'upcoming' | 'past'; page?: string }
}) {
  const uid = params.user ?? ''
  const status = searchParams?.status ?? 'active'
  const currentPage = Number(searchParams?.page) ?? 1
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
  const numberOfPages = Math.ceil(bookings.length / 3)

  return (
    <section className="flex max-w-full flex-1 flex-col rounded-md bg-white p-6 shadow-md">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <UserPageHeading
            title="Your bookings"
            subtitle="Manage your bookings here"
          />
        </div>
        <BookingsNavbar />
      </div>
      <Divider />

      {bookings.length > 0 ? (
        <div className="flex w-full flex-1 flex-col gap-2">
          {bookings.map((booking) => (
            <BookingCard
              key={`${booking.pickup_date}-${booking.vehicle_name}-booking-card`}
              booking={booking}
              status={status}
            />
          ))}
        </div>
      ) : (
        <NoBookingsInfo status={status} />
      )}

      {numberOfPages > 1 && (
        <Pagination numberOfPages={numberOfPages} currentPage={currentPage} />
      )}
    </section>
  )
}
