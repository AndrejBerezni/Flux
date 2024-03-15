import { NextRequest } from 'next/server'
import { Resend } from 'resend'

import GiftCardEmail from '@/emails/giftcard'

const resend = new Resend(process.env.NEXT_RESEND)

export async function POST(request: NextRequest) {
  try {
    const { email, recipient, sender, cardValue, code, message } =
      await request.json()
    const data = await resend.emails.send({
      from: 'giftcards@fluxecodrive.com',
      to: email,
      subject: `${sender} has sent you a Flux Gift Card!`,
      react: GiftCardEmail({ recipient, sender, cardValue, code, message }),
    })

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 200,
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        headers: {
          'Content-type': 'application/json',
        },
        status: 400,
      }
    )
  }
}
