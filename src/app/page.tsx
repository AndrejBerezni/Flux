import GiftCardSection from '@/components/home/GiftCardSection'
import HighlightsSection from '@/components/home/HighlightsSection'
import HomeBanner from '@/components/home/HomeBanner'
import SearchSection from '@/components/home/SearchSection'
import SubscriptionSection from '@/components/home/SubscriptionSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <SearchSection />
      <HomeBanner />
      <HighlightsSection />
      <GiftCardSection />
      <SubscriptionSection />
    </main>
  )
}
