import Link from 'next/link'
export default function NoActiveSubscription() {
  return (
    <div className="my-4 flex flex-col items-start gap-8">
      <p>You currently don&apos;t have an active Flux subscription</p>
      <Link className="btn-primary" href="/subscriptions">
        Subscribe now
      </Link>
    </div>
  )
}
