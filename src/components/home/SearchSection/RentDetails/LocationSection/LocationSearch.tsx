'use client'
import { useState, useEffect } from 'react'

import { ILocation } from '@/compiler/interfaces'
import { fetchLocations } from '@/lib/server_actions/locationsAction'

import LocationSearchInput from './LocationSearchInput'
import LocationSearchResultBox from './LocationSearchResultBox'

//This component was initially written as server component, but logic around it was complicated more than necessary:
// - searchTerm was part of URL and it was passed from page.tsx. However
// - this component was surronded by client components and therefore it was passed as a child through several levels
// I have utilized server action to safely fetch data here inside of it as a client component.

export default function LocationSearch({
  variant,
}: {
  variant: 'returnLocation' | 'pickupLocation'
}) {
  const [locations, setLocations] = useState<ILocation[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const searchLocations = async (searchTerm: string) => {
      setIsLoading(true)
      if (searchTerm.length > 2) {
        const results = await fetchLocations(searchTerm)
        if (results) {
          setLocations(results)
        }
      } else {
        setLocations(null)
      }
      setIsLoading(false)
    }
    searchLocations(searchTerm)
  }, [searchTerm])

  return (
    <div className="relative w-full min-w-[250px] bg-white md:w-auto md:flex-1">
      {/* On small screen input is readOnly because clicking on it opens modal with input field where user should do the search, and not in this one, which on small screen serves only to display value */}
      <div className="hidden md:inline">
        <LocationSearchInput
          variant={variant}
          handleSearch={(term) => setSearchTerm(term)}
        />
      </div>
      <div className="inline md:hidden">
        <LocationSearchInput
          variant={variant}
          handleSearch={(term) => setSearchTerm(term)}
          readOnly
        />
      </div>
      <LocationSearchResultBox
        variant={variant}
        handleSearch={setSearchTerm}
        locations={locations}
        isLoading={isLoading}
      />
    </div>
  )
}
