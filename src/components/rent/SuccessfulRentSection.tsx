import { IRent } from '@/compiler/interfaces'

import SuccessfulRentHeader from './SuccessfulRentHeader'
import SuccessfulRentPriceDetails from './SuccessfulRentPriceDetails'
import SuccessfulRentTimeDateLocation from './SuccessfulRentTimeDateLocation'
import Divider from '../Divider'

export default function SuccessfulRentSection({ rent }: { rent: IRent }) {
  return (
    <article className="flex flex-1 flex-col py-6 pl-4 pr-8">
      <SuccessfulRentHeader
        name={rent.vehicle_name}
        invoice={rent.rent_invoice}
      />
      <Divider />
      <div className="flex flex-1 flex-col gap-8 xl:flex-row">
        <SuccessfulRentTimeDateLocation rent={rent} />
        <SuccessfulRentPriceDetails
          rentPrice={rent.rent_price}
          totalPrice={rent.total_price}
          insurance={rent.insurance_name}
        />
      </div>
    </article>
  )
}
