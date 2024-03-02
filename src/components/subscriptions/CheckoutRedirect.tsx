'use client'
import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CheckoutRedirect({ subId }: { subId: string }) {
  const router = useRouter()
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false)

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedToTerms(event.target.checked)
  }

  const handleCheckout = async () => {
    const response = await fetch(`/api/subscriptions/checkout?subId=${subId}`)
    const url = await response.json()
    if (url) {
      router.push(url)
    }
  }

  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          type="checkbox"
          id="terms-conditions-subscription"
          onChange={(e) => handleCheck(e)}
        />
        <label>
          I agree to{' '}
          <Link
            className="text-brand hover:text-brandDarker hover:underline"
            href="/"
            target="_blank"
          >
            Terms & Conditions
          </Link>
        </label>
      </div>
      <button
        className="btn-primary"
        disabled={!agreedToTerms}
        onClick={handleCheckout}
      >
        Proceed to payment
      </button>
    </div>
  )
}
