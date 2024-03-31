import { ILocation } from '@/compiler/interfaces'
import { formatHour } from '@/lib/utilities/formatHour'

export default function LocationCard({ location }: { location: ILocation }) {
  const {
    name,
    street,
    street_number,
    city,
    zip_code,
    always_open,
    opening_hour_weekend,
    closing_hour_working_day,
    opening_hour_working_day,
    closing_hour_weekend,
  } = location

  return (
    <article className="border-[1px] border-tertiary bg-white p-4 shadow-md">
      <h3 className="mb-3 text-center text-xl font-extrabold uppercase tracking-widest text-brand sm:text-2xl">
        {name}
      </h3>
      <h4 className="text-sm font-semibold text-secondary sm:text-base">
        Address:
      </h4>
      <p className="mb-3 text-base font-bold sm:text-lg">
        {street}
        {street_number === 'NN' ? ',' : ` ${street_number},`} {zip_code}, {city}
      </p>
      <h4 className="text-sm font-semibold text-secondary sm:text-base">
        Working hours:
      </h4>
      {always_open ? (
        <p className="text-base font-semibold text-brand sm:text-lg">
          Open 24 hours
        </p>
      ) : (
        <>
          <p className="text-base sm:text-lg">
            <span className="font-bold">Mon-Fri:</span>{' '}
            {formatHour(opening_hour_working_day, 0)} -{' '}
            {formatHour(closing_hour_working_day, 0)}
          </p>
          <p className="text-base sm:text-lg">
            <span className="font-bold">Weekend & Holidays:</span>{' '}
            {formatHour(opening_hour_weekend, 0)} -{' '}
            {formatHour(closing_hour_weekend, 0)}
          </p>
        </>
      )}
    </article>
  )
}
