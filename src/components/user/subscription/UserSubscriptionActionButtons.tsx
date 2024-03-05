export default function UserSubscriptionActionButtons() {
  //     {
  //   subId,
  //   subStripeId,
  // }: {
  //   subId: string
  //   subStripeId: string
  // }
  return (
    <div className="mt-auto flex flex-col-reverse flex-wrap items-center justify-center gap-8 lg:flex-row xl:mt-20">
      <button className="btn-primary w-4/5 bg-red-500 md:w-[220px]">
        Cancel Subscription
      </button>
      <button className="btn-primary w-4/5 md:w-[220px]">
        Change Subscription
      </button>
    </div>
  )
}
