import Image from 'next/image'

import { BookingStatus } from '@/compiler/types'

export default function NoBookingsInfo({
  status,
}: Readonly<{ status: BookingStatus }>) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <Image
        src="/car-gray.svg"
        width={280}
        height={280}
        alt="car illustration"
      />
      <p className="text-center text-secondaryText md:text-lg lg:text-xl">
        You don&apos;t have {status} bookings.
      </p>
    </div>
  )
}
