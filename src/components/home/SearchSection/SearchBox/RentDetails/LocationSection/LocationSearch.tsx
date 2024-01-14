import LocationSearchInput from './LocationSearchInput'
import LocationSearchResultBox from './LocationSearchResultBox'

export default function LocationSearch({
  variant,
}: {
  variant: 'returnLocation' | 'pickupLocation'
}) {
  return (
    <div className="relative w-full min-w-[250px] md:w-auto md:flex-1">
      <LocationSearchInput variant={variant} />
      <LocationSearchResultBox variant={variant} />
    </div>
  )
}
