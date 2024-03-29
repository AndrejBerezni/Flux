import { IRent } from '@/compiler/interfaces'

import SuccessfulRentPriceDetails from './SuccessfulRentPriceDetails'
import SuccessfulRentTimeDateLocation from './SuccessfulRentTimeDateLocation'
import Divider from '../Divider'

export default function SuccessfulRentSection({
  rent,
  totalPrice,
}: {
  rent: IRent
  totalPrice: number
}) {
  return (
    <article className="flex flex-1 flex-col py-6 pl-4 pr-8">
      <h1 className="text-2xl font-extrabold uppercase tracking-wider md:text-3xl">
        {rent.vehicle_name}
        <span className="text-brand"> Booked Successfully!</span>
      </h1>
      <Divider />
      <div className="flex flex-1 flex-col gap-8 xl:flex-row">
        <SuccessfulRentTimeDateLocation rent={rent} />
        <SuccessfulRentPriceDetails
          rentPrice={rent.rent_price}
          totalPrice={totalPrice}
          insurance={rent.insurance_name}
        />
      </div>
    </article>
  )
}
