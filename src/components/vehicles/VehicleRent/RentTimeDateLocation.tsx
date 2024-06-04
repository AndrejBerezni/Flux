'use server'
import { sql } from '@vercel/postgres'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'

export default async function RentTimeDateLocation({
  timeDateLocation,
}: Readonly<{
  timeDateLocation: {
    pickupLocation: string
    returnLocation: string
    pickupDate: string
    returnDate: string
    pickupTime: string
    returnTime: string
  }
}>) {
  const { pickupDate, returnDate, pickupTime, returnTime } = timeDateLocation

  const getLocationName = async (location: string) => {
    try {
      const data = await sql`
      SELECT name FROM locations
      WHERE id::varchar=${location}`
      return data.rows[0].name
    } catch (error) {
      return 'Location unknown'
    }
  }

  const pickupLocation = await getLocationName(timeDateLocation.pickupLocation)
  const returnLocation = await getLocationName(timeDateLocation.returnLocation)

  return (
    <ul className="flex items-center gap-2 border-t-[1px] border-t-tertiary px-2 py-4 sm:px-8">
      <li className="flex items-center gap-4">
        <HiOutlineBuildingOffice2 className="text-3xl" />
        <div>
          <p className="text-sm text-secondary">Pickup</p>
          <p className="font-bold">{pickupLocation}</p>
          <p>
            {pickupDate.split('T')[0]} | {pickupTime}
          </p>
        </div>
      </li>
      <li className="mx-2 h-[2px] flex-1 bg-tertiary"></li>
      <li className="flex items-center gap-4">
        <HiOutlineBuildingOffice2 className="text-3xl" />
        <div>
          <p className="text-sm text-secondary">Return</p>
          <p className="font-bold">{returnLocation}</p>
          <p>
            {returnDate.split('T')[0]} | {returnTime}
          </p>
        </div>
      </li>
    </ul>
  )
}
