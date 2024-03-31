'use server'
import { sql } from '@vercel/postgres'

import { IUser } from '@/compiler/interfaces'

export const updateUser = async (formData: FormData) => {
  try {
    await sql<IUser>`
    UPDATE users
    SET first_name=${formData.get('first_name') as string},
    last_name=${formData.get('last_name') as string},
    country_code=${Number(formData.get('country_code') as string)},
    phone_number=${Number(formData.get('phone_number') as string)},
    street=${formData.get('street') as string},
    street_number=${Number(formData.get('street_number') as string)},
    additional_address_line=${
      formData.get('additional_address_line') as string
    },
    zip_code=${formData.get('zip_code') as string},
    city=${formData.get('city') as string},
    country=${formData.get('country') as string}
    WHERE id=${formData.get('userId') as string}
    `
    return 'Information updated successfully.'
  } catch (error) {
    return 'Unable to update user information.'
  }
}
