import Divider from '../Divider'

export default function SuccessfulRentPriceDetails({
  rentPrice,
  totalPrice,
  insurance,
}: {
  rentPrice: string
  totalPrice: number
  insurance: string
}) {
  return (
    <ul className="flex flex-col self-end">
      <li className="text-lg text-secondary md:text-xl">
        Vehicle price:{' '}
        <span className="font-semibold text-primary">
          {Number(rentPrice).toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
          })}
        </span>
      </li>
      <li className="-mb-2 text-lg text-secondary md:text-xl">
        Insurance coverage:{' '}
        <span className="font-semibold uppercase text-primary">
          {insurance}
        </span>
      </li>
      <Divider />
      <li className="text-2xl md:text-3xl">
        <span className="font-bold uppercase">Total: </span>
        <span className="font-extrabold text-brand">
          {(totalPrice / 100).toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
          })}
        </span>
      </li>
    </ul>
  )
}
