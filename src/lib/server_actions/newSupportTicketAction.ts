'use server'
import { sql } from '@vercel/postgres'

import { resend } from '@/components/emails/resend-config'
import SupportEmail from '@/components/emails/support'

const addTicketToDB = async (formData: FormData) => {
  try {
    //assign higher priority if issue is related to vehicle or payment
    const category = formData.get('category')
    const priority = category === 'Payment' ? 1 : category === 'Vehicle' ? 2 : 3
    const newSupportTicket = await sql`
        INSERT INTO support_tickets(customer_name, customer_contact, issue_category, issue_description, priority)
        VALUES(${formData.get('name') as string}, ${
          formData.get('contact') as string
        }, ${category as string}, ${
          formData.get('message') as string
        }, ${priority})
        RETURNING id,customer_name, customer_contact, issue_category, issue_description, priority`
    const ticket = newSupportTicket.rows[0]
    return {
      id: ticket.id,
      customerName: ticket.customer_name,
      customerContact: ticket.customer_contact,
      category: ticket.issue_category,
      message: ticket.issue_description,
      priority: ticket.priority,
    }
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Unable to create support ticket')
  }
}

const sendEmail = async (emailData: {
  id: string
  customerName: string
  customerContact: string
  category: string
  message: string
  priority: number
}) => {
  try {
    const { id, customerName, customerContact, category, message, priority } =
      emailData
    await resend.emails.send({
      from: 'New Support Ticket <tickets@fluxecodrive.com>',
      to: 'berezniandrej@gmail.com',
      subject: `Ticket ${id} has been created`,
      react: SupportEmail({
        id,
        customerName,
        customerContact,
        category,
        message,
        priority,
      }),
    })
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Unknown error occured'
    )
  }
}

export const handleNewSupportTicket = async (formData: FormData) => {
  try {
    const newSupportTicket = await addTicketToDB(formData)
    if (newSupportTicket) {
      await sendEmail(newSupportTicket)
    }
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Unknown error occured. Please try again later!'
    )
  }
}
