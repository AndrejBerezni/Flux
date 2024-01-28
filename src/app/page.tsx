import GiftCardSection from '@/components/home/GiftCardSection'
import HighlightsSection from '@/components/home/HighlightsSection'
import HomeBanner from '@/components/home/HomeBanner'
import SearchSection from '@/components/home/SearchSection'
import SubscriptionSection from '@/components/home/SubscriptionSection'

export default function Home({
  searchParams,
}: {
  searchParams?: {
    pickupLocation?: string
    returnLocation?: string
    loadMap?: string
  }
}) {
  const pickupLocation = searchParams?.pickupLocation || ''
  const returnLocation = searchParams?.returnLocation || ''
  const loadMap = searchParams?.loadMap || ''

  return (
    <main className="flex min-h-screen flex-col">
      <SearchSection
        pickupLocation={pickupLocation}
        returnLocation={returnLocation}
        loadMap={loadMap}
      />
      <HomeBanner />
      <HighlightsSection />
      <GiftCardSection />
      <SubscriptionSection />
    </main>
  )
}
