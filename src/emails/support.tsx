import * as React from 'react'

import {
  Tailwind,
  Hr,
  Font,
  Container,
  Html,
  Head,
  Heading,
  Column,
  Row,
} from '@react-email/components'

export default function SupportEmail({
  customerName,
  customerContact,
  category,
  message,
  priority,
  id,
}: {
  customerName: string
  customerContact: string
  category: string
  message: string
  priority: number
  id: string
}) {
  const rows = [
    {
      title: 'Ticket ID',
      value: id,
    },
    {
      title: 'Priority',
      value: priority,
    },
    {
      title: 'Customer Name',
      value: customerName,
    },
    {
      title: 'Customer Contact',
      value: customerContact,
    },
    {
      title: 'Issue Category',
      value: category,
    },
    {
      title: 'Description',
      value: message,
    },
  ]
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: '#ff5f00',
              primary: '#1a1a1a',
              white: '#ffffff',
            },
          },
        },
      }}
    >
      <Html>
        <Head>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Container className="h-full px-8 text-primary">
          <Heading className="font-bold uppercase text-brand">
            New Support Ticket has been created!
          </Heading>
          <Hr />
          {rows.map((row) => (
            <Row className="mb-2" key={`${row.title}-ticket-row`}>
              <Column className="text-start">{row.title}:</Column>
              <Column className="text-end font-bold">{row.value}</Column>
            </Row>
          ))}
          <Hr />
        </Container>
      </Html>
    </Tailwind>
  )
}
