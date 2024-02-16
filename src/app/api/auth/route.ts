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
    return Response.json({ message: 'User does not exist' })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await request.json()
    const newUser = {
      id: user.id,
      auth_type: user.auth_type,
      first_name: user.first_name,
      last_name: user.last_name || '',
      email: user.email,
    }
    await sql`INSERT INTO users(id, auth_type, first_name, last_name, email)
    VALUES(${newUser.id}, ${newUser.auth_type}, ${newUser.first_name}, ${newUser.last_name}, ${newUser.email})`

    return new Response(JSON.stringify(newUser), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 201,
    })
  } catch (error) {
    console.error(error)
    throw new Error('Unable to create user')
  }
}
