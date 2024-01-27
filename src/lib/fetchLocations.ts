import { sql } from '@vercel/postgres'

import { Location } from './definitions'

export const fetchLocations = async (
  searchTerm: string
): Promise<Location[]> => {
  try {
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

export const fetchNearbyLocations = async (
  userLatitude: number,
  userLongitude: number
) => {
  try {
    const data = await sql<Location>`
    SELECT *
    FROM locations
    WHERE 6371 * 
          ACOS(COS(RADIANS(${userLatitude})) * COS(RADIANS(latitude)) * 
          COS(RADIANS(longitude) - RADIANS(${userLongitude})) + 
          SIN(RADIANS(${userLatitude})) * SIN(RADIANS(latitude))) <= 100;
        `
    return data.rows
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Failed to search nearby locations')
  }
}
