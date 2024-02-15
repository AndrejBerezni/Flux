import { sql } from '@vercel/postgres'
import { type NextRequest } from 'next/server'

import { IUser } from '@/compiler/interfaces'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get('email')
  const response = await sql<IUser>`SELECT * FROM users where email=${email}`
  const user = await response.rows[0]
  if (user) {
    return Response.json(user)
  } else {
    throw new Error('User not found')
  }
}
