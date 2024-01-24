import { sql } from '@vercel/postgres'

import { Location } from './definitions'

export const fetchLocations = async (
  searchTerm: string
): Promise<Location[]> => {
  try {
    console.log('Fetching...')
    const data = await sql<Location>`
        SELECT *
        FROM locations
        WHERE locations.name ILIKE '%' || ${searchTerm} || '%'
        ORDER BY locations.name DESC
        LIMIT 5;
        `
    return data.rows
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Failed to search location')
  }
}
