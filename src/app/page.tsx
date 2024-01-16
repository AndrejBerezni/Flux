import HomeBanner from '@/components/home/HomeBanner'
import SearchSection from '@/components/home/SearchSection'
import HighlightsSection from '@/components/home/HighlightsSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <SearchSection />
      <HomeBanner />
      <HighlightsSection />
    </main>
  )
}
