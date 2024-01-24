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
      <LocationSearchInput variant={variant} />
      <LocationSearchResultBox variant={variant} locations={locations} />
    </div>
  )
}
