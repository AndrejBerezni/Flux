import Image from 'next/image'

import { getImageURL } from '@/firebase/storage'
import { confirmRentPaymentAction } from '@/lib/serverActions/rentActions'
import { retrieveTotalPriceFromCheckoutSession } from '@/stripe/vehicles'

export default async function RentSuccessful({
  searchParams,
}: {
  searchParams?: {
    rentId?: string
    sessionId?: string
  }
}) {
  const rentId = searchParams?.rentId || ''
  const sessionId = searchParams?.sessionId || ''

  const totalPrice = await retrieveTotalPriceFromCheckoutSession(sessionId)
  const rent = await confirmRentPaymentAction(rentId)
  console.log(rent)
  const image = await getImageURL(rent.image_url)

  return (
    <main className="section-padding flex h-full flex-1 flex-col items-center bg-quaternary pt-16 md:min-h-[70vh] md:justify-center md:pt-0">
      <p>
        Total:{' '}
        {(totalPrice! / 100).toLocaleString('de-DE', {
          style: 'currency',
          currency: 'EUR',
        })}
      </p>
      <p>{rent.pickup_date.toISOString().split('T')[0]}</p>
      <p>{rent.return_date.toISOString().split('T')[0]}</p>
      <p>{rent.pickup_location}</p>
      <p>{rent.return_location}</p>
      <p>{rent.pickup_time}</p>
      <p>{rent.return_time}</p>
      <p>{rent.insurance_name}</p>
      <p>{rent.rent_price}</p>
      <p>{rent.vehicle_name}</p>
      <Image
        src={image as string}
        alt={rent.vehicleName}
        width={640}
        height={480}
      />
    </main>
  )
}
