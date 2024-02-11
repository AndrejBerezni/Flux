'use client'
import clsx from 'clsx'

import { ILocation } from '@/compiler/interfaces'
import { formatHour } from '@/utilities/formatHour'

export default function LocationInformation({
  location,
  visible,
}: {
  location: ILocation
  visible: boolean
}) {
  return (
    <div
      className={clsx(
        'bottom-0 left-0 z-40 box-border hidden w-full overflow-hidden rounded-b-md bg-quaternary p-2 text-sm duration-300 md:absolute md:block',
        {
          'md:h-[140px]': visible,
          'md:h-0 md:opacity-0': !visible,
        }
      )}
    >
      <h3 className="text-base font-bold">{location.name}</h3>
      <p className="text-secondary">{`${location.street}${
        location.street_number !== 'NN' ? ` ${location.street_number}` : ''
      }, ${location.city}, ${location.zip_code}, ${location.country}`}</p>
      {location.always_open ? (
        <p className="text-base font-semibold text-brand">
          24-hour pick-up & return
        </p>
      ) : (
        <>
          <p>
            Mon - Fri: {formatHour(location.opening_hour_working_day, 0)} -{' '}
            {formatHour(location.closing_hour_working_day, 0)}
          </p>
          <p>
            Weekend & Holidays: {formatHour(location.opening_hour_weekend, 0)} -{' '}
            {formatHour(location.closing_hour_weekend, 0)}
          </p>
        </>
      )}
    </div>
  )
}
