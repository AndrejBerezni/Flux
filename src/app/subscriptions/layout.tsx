import BenefitsSection from '@/components/subscriptions/BenefitsSection'
import SubscriptionsCarousel from '@/components/subscriptions/SubscriptionsCarousel'

export default function SubscriptionsPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-1 flex-col">
      <SubscriptionsCarousel />
      <BenefitsSection />
      {children}
    </main>
  )
}
