import { sql } from '@vercel/postgres'

import { ILocation } from '@/compiler/interfaces'
import LocationCard from '@/components/locations/LocationCard'

import { robotoFlex } from '../fonts'

export default async function LocationsPage() {
  const locations = await sql<ILocation>`
    SELECT *
    FROM locations
    ORDER BY name ASC`

  return (
    <main
      className={`${robotoFlex.className} section-padding flex-1 bg-quaternary`}
    >
      <h1 className="text-center text-5xl font-extrabold uppercase">
        Flux Stores
      </h1>
      <h2 className="mb-5 mt-1 text-center font-semibold text-secondary">
        Navigate Your Adventure: Explore Our Rental Locations
      </h2>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {locations.rows.map((location) => (
          <LocationCard location={location} key={location.id} />
        ))}
      </div>
    </main>
  )
}
