import { useState } from 'react'

import { roboto } from '@/app/fonts'
import { ILocation } from '@/compiler/interfaces'

import LocationInformation from './LocationInformation'

export default function LocationResult({
  location,
  locationName,
  locationIcon,
  handleClick,
}: {
  location?: ILocation
  locationName?: string
  locationIcon: React.ReactNode
  handleClick: () => void
}) {
  const [infoVisible, setInfoVisible] = useState<boolean>(false)
  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setInfoVisible(true)}
        onMouseLeave={() => setInfoVisible(false)}
        className="flex h-[60px] w-full items-center hover:bg-quaternary"
      >
        <span className="px-4 text-3xl">{locationIcon}</span>
        <span
          className={`${roboto.className} border-b-solid flex h-full flex-1 items-center border-b-[1px] border-b-tertiary pl-4 font-medium tracking-wide`}
        >
          {location ? location.name : locationName}
        </span>
      </button>
      {location && (
        <LocationInformation location={location} visible={infoVisible} />
      )}
    </>
  )
}
