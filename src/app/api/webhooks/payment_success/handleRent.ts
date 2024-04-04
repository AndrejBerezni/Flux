import { sql } from '@vercel/postgres'

import { stripe } from '@/stripe/stripe-config'

// update db with invoice download link and total price that includes insurance
export const handleRent = async (
  eventId: string,
  rentId: string,
  invoiceId: string,
  totalPrice: number | null
) => {
  if (!rentId) {
    throw new Error(`Missing rent id, ${eventId}`)
  }
  const invoice = await stripe.invoices.retrieve(invoiceId)
  if (!invoice || !totalPrice) {
    throw new Error(`Missing invoice or total_price, ${eventId}`)
  }
  await sql`
    UPDATE rents
    SET payment_successful=true, invoice=${invoice.invoice_pdf}, total_price=${totalPrice}
    WHERE id::varchar=${rentId}`
}
