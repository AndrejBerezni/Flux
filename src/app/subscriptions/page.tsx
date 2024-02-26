import BenefitsSection from '@/components/subscriptions/BenefitsSection'
import SubscriptionsCarousel from '@/components/subscriptions/SubscriptionsCarousel'
import SubscriptionSelectionSection from '@/components/subscriptions/SubscriptionSelectionSection'

export default function SubscriptionsPage() {
  return (
    <>
      <SubscriptionsCarousel />
      <BenefitsSection />
      <SubscriptionSelectionSection />
    </>
  )
}
