import * as React from 'react'

import {
  Tailwind,
  Hr,
  Font,
  Container,
  Html,
  Head,
  Heading,
  Link,
} from '@react-email/components'

export default function GiftCardEmail({
  recipient,
  sender,
  cardValue,
  code,
  message,
}: {
  recipient: string
  sender: string
  cardValue: number
  code: string
  message?: string
}) {
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
          <Heading className="text-center font-bold uppercase text-brand">
            {sender} has sent you a Flux Gift Card!
          </Heading>
          <Hr />
          {message && (
            <>
              <p className="font-bold italic text-brand">{message}</p>
              <Hr />
            </>
          )}
          <p className="text-lg text-brand">Dear {recipient},</p>
          <p>
            We&apos;re excited to inform you that {sender} has sent you a{' '}
            <span className="font-semibold text-brand">Flux Gift Card</span>!{' '}
            This gift card entitles you to{' '}
            <span className="font-semibold text-brand">{cardValue}</span> euros
            to spend on our platform using this code:
          </p>
          <Heading className="text-center text-brand">{code}</Heading>
          <p>
            To make the most of your Flux gift card, follow these simple
            instructions:
          </p>
          {/* using ol didn't work well here - it did not display them good on mobile, li were displayed in one row like columns, instead like rows */}
          <p key="step-1">
            1. Visit our page at{' '}
            <Link
              className="font-bold text-brand underline"
              href="https://www.fluxecodrive.com/"
            >
              FluxEcoDrive.com
            </Link>
          </p>
          <p key="step-2">
            2. Choose from our diverse fleet of electric vehicles, including
            cars, bikes, and scooters, available across 20+ locations in
            Portugal.
          </p>
          <p key="step-3">
            3. Select the date that suits you best for your adventure.
          </p>
          <p key="step-4">
            4. Enter the provided code by clicking on{' '}
            <span className="font-semibold text-brand">Add Promotion Code</span>{' '}
            in checkout session to apply the discount.
          </p>
          <p key="step-5">
            5. Rent your desired vehicle and embark on an exciting journey
            exploring Portugal&apos;s scenic landscapes and vibrant cities.
          </p>
          <p>
            Alternatively, you can subscribe to our subscription plans and
            receive a discount on your first payment equal to the value of this
            gift card.
          </p>
          <p>
            At Flux, we&apos;re committed to providing sustainable and
            convenient transportation solutions, and we can&apos;t wait for you
            to experience the thrill of exploring Portugal with our electric
            vehicles!
          </p>

          <p className="text-lg font-semibold text-brand">Happy adventuring!</p>
          <p>Warm regards,</p>
          <p>Flux Team</p>
        </Container>
      </Html>
    </Tailwind>
  )
}
