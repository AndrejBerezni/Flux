import GiftCardsHero from '@/components/giftcards/GiftCardsHero'

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
