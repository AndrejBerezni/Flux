import { fetchLocations } from '@/lib/fetchLocations'

import LocationSearchInput from './LocationSearchInput'
import LocationSearchResultBox from './LocationSearchResultBox'

export default async function LocationSearch({
  variant,
  searchTerm,
}: {
  variant: 'returnLocation' | 'pickupLocation'
  searchTerm: string
}) {
  const searchLocations = async (searchTerm: string) => {
    if (searchTerm.length > 2) {
      const results = fetchLocations(searchTerm)
      return results
    } else {
      return []
    }
  }
  const locations = await searchLocations(searchTerm)

  return (
    <div className="relative w-full min-w-[250px] bg-white md:w-auto md:flex-1">
      {/* On small screen input is readOnly because clicking on it opens modal with input field where user should do the search, and not in this one, which on small screen serves only to display value */}
      <div className="hidden md:inline">
        <LocationSearchInput variant={variant} />
      </div>
      <div className="inline md:hidden">
        <LocationSearchInput variant={variant} readOnly />
      </div>
      <LocationSearchResultBox variant={variant} locations={locations} />
    </div>
  )
}
