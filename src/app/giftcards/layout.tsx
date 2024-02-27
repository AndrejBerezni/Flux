import GiftCardsHero from '@/components/giftcards/GiftCardsHero'

export default function GiftCardsPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-[90vh] flex-1 flex-col md:flex-row">
      <GiftCardsHero />
      {children}
    </main>
  )
}
