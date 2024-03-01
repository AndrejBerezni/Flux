import BenefitsSection from '@/components/subscriptions/BenefitsSection'
import SubscriptionsCarousel from '@/components/subscriptions/SubscriptionsCarousel'
import SubscriptionSelectionSection from '@/components/subscriptions/SubscriptionSelectionSection'

export default function SubscriptionsPageLayout() {
  return (
    <main className="flex flex-1 flex-col">
      <SubscriptionsCarousel />
      <BenefitsSection />
      <SubscriptionSelectionSection />
    </main>
  )
}
