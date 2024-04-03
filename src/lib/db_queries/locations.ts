import { sql } from '@vercel/postgres'

import { ILocation } from '../../compiler/interfaces'

export const fetchNearbyLocations = async (
  userLatitude: number,
  userLongitude: number
) => {
  try {
    const data = await sql<ILocation>`
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
