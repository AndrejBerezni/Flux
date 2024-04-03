import type { Metadata } from 'next'

import Divider from '@/components/Divider'
import BookingsNavbar from '@/components/user/bookings/BookingsNavbar'

export const metadata: Metadata = {
  title: 'Flux - Your Bookings',
  description: 'Rent Electrical Vehicles',
}

export default function UserBookingsPage({
  searchParams,
}: {
  searchParams?: { status?: 'active' | 'upcoming' | 'past' }
}) {
  const status = searchParams?.status ?? 'active'
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
    </section>
  )
}
