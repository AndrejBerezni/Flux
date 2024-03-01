'use client'
import { useState } from 'react'

import Link from 'next/link'

export default function CheckoutRedirect({ subId }: { subId?: string }) {
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false)

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedToTerms(event.target.checked)
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
      {/* id={subId} is there just until I implement checkout session for which I need this id */}
      <button className="btn-primary" disabled={!agreedToTerms} id={subId}>
        Proceed to payment
      </button>
    </div>
  )
}
