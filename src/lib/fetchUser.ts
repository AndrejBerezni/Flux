import { sql } from '@vercel/postgres'

import { IUser } from '@/compiler/interfaces'

export const fetchUserWithId = async (uid: string): Promise<IUser> => {
  try {
    const data = await sql<IUser>`
        SELECT * FROM users
        WHERE id=${uid}`
    return data.rows[0]
  } catch (error) {
    throw new Error('Failed to retrieve user information')
  }
}
