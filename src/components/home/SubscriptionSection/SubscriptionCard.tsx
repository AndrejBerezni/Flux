import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'

interface ISubscriptionPrices {
  month: number
  year: number
}

interface ISubscription {
  title: string
  benefits: string[]
  prices: ISubscriptionPrices
}

export default function SubscriptionCard({
  subscription,
}: {
  subscription: ISubscription
}) {
  return (
    <div className="relative z-0 h-full overflow-hidden bg-primary p-6 ">
      <div className="mb-6 flex items-end gap-2">
        <Image
          src="/FLUX-logo-white-nobg.png"
          alt="flux logo"
          width={80}
          height={32}
        />
        <h3 className="text-[32px] font-bold leading-[30px] text-white">
          {subscription.title}
        </h3>
      </div>
      <div>
        <ul className="list-disc pl-4">
          {subscription.benefits.map((benefit) => (
            <li key={benefit} className="mb-2 font-semibold text-tertiary">
              {benefit}
            </li>
          ))}
        </ul>
      </div>
      <button className="btn-primary absolute bottom-5 right-5 flex items-center gap-2">
        Learn more
        <FaArrowRight />
      </button>
      <div className="absolute left-0 top-2/3 z-[-1] h-full w-[150%] -rotate-[15deg] bg-white"></div>
    </div>
  )
}
