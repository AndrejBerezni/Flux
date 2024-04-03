'use server'
import { sql } from '@vercel/postgres'

import { ILocation } from '@/compiler/interfaces'

export const fetchLocations = async (
  searchTerm: string
): Promise<ILocation[]> => {
  try {
    const data = await sql<ILocation>`
          SELECT *
          FROM locations
          WHERE locations.name ILIKE '%' || ${searchTerm} || '%'
          ORDER BY locations.name DESC
          LIMIT 5;
          `
    return data.rows
  } catch (error) {
    throw new Error('Failed to search location')
  }
}
