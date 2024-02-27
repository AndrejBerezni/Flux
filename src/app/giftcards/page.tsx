import Link from 'next/link'

import InstructionStep from '@/components/giftcards/InstructionStep'

import { robotoCondensed } from '../fonts'
export default function GiftCardsInstructions() {
  const steps = [
    {
      title: '1. Select Gift Card Cash Amount',
      text: 'Choose from a range of denominations to suit your preferences and budget.',
      img: '/giftcards-select.png',
    },
    {
      title: '2. Add Personalized Message (Optional)',
      text: 'Make your gift extra special by including a personalized message to accompany the gift card.',
      img: '/giftcards-message.png',
    },
    {
      title: "3. Send it to Someone's Email",
      text: "Provide the recipient's email address, and we'll promptly deliver the gift card directly to their inbox.",
      img: '/giftcards-send.png',
    },
  ]

  return (
    <article className="flex h-full flex-col items-center justify-center bg-quaternary p-12 hover:cursor-default">
      <h2
        className={`${robotoCondensed.className} text-center text-4xl font-extrabold uppercase tracking-wide text-primary`}
      >
        How it works
      </h2>
      <div className="flex flex-col gap-10 py-12 lg:flex-row">
        {steps.map((step) => (
          <InstructionStep key={`${step.title}-step-card`} step={step} />
        ))}
      </div>
      <Link href="/giftcards/select?value=200" className="btn-primary">
        Get Started
      </Link>
    </article>
  )
}

// Select Gift Card Cash Amount: Choose from a range of denominations to suit your preferences and budget.

// Add Personalized Message (Optional): Make your gift extra special by including a personalized message to accompany the gift card.

// Send it to Someone's Email: Provide the recipient's email address, and we'll promptly deliver the gift card directly to their inbox.
