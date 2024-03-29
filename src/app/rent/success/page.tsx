import { robotoCondensed } from '@/app/fonts'
import SuccessfulRentSection from '@/components/rent/SuccessfulRentSection'
import VehicleImageContainer from '@/components/rent/VehicleImageContainer'
import { getImageURL } from '@/firebase/storage'
import { confirmRentPaymentAction } from '@/lib/serverActions/rentActions'
import { retrieveTotalPriceFromCheckoutSession } from '@/stripe/vehicles'

export default async function RentSuccessfulPage({
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
  const image = await getImageURL(rent.image_url)

  return (
    <main
      className={`${robotoCondensed.className} section-padding flex h-full flex-1 flex-col items-center gap-2 bg-quaternary pt-4 md:min-h-[70vh] md:justify-center md:pt-8`}
    >
      <section className="flex w-full flex-col rounded-md bg-white shadow-md md:flex-row">
        <VehicleImageContainer
          image={image as string}
          alt={rent.vehicle_name}
        />
        <SuccessfulRentSection rent={rent} totalPrice={totalPrice as number} />
      </section>
    </main>
  )
}
