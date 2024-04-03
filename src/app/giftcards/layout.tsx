import type { Metadata } from 'next'

import GiftCardsHero from '@/components/giftcards/GiftCardsHero'

export const metadata: Metadata = {
  title: 'Flux Gift Cards',
  description: 'Rent Electrical Vehicles',
}

export default function GiftCardsPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-[90vh] flex-1 flex-col bg-quaternary md:flex-row">
      <GiftCardsHero />
      <section className="flex-1">{children}</section>
    </main>
  )
}
