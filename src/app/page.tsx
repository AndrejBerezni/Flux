import GiftCardSection from '@/components/home/GiftCardSection'
import HighlightsSection from '@/components/home/HighlightsSection'
import HomeBanner from '@/components/home/HomeBanner'
import SearchSection from '@/components/home/SearchSection'
import SubscriptionSection from '@/components/home/SubscriptionSection'

export const fetchCache = 'force-no-store'

export default function Home({
  searchParams,
}: {
  searchParams?: {
    pickupLocation?: string
    returnLocation?: string
    loadMap?: string
    latitude?: string
    longitude?: string
  }
}) {
  const pickupLocation = searchParams?.pickupLocation || ''
  const returnLocation = searchParams?.returnLocation || ''
  const loadMap = searchParams?.loadMap || ''
  const userLatitude = searchParams?.latitude || '41.14324740707248'
  const userLongitude = searchParams?.longitude || '-8.610287052484185'

  return (
    <main className="flex min-h-screen flex-col">
      <SearchSection
        pickupLocation={pickupLocation}
        returnLocation={returnLocation}
        loadMap={loadMap}
        userLatitude={userLatitude}
        userLongitude={userLongitude}
      />
      <HomeBanner />
      <HighlightsSection />
      <GiftCardSection />
      <SubscriptionSection />
    </main>
  )
}
