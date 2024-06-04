import { useState } from 'react'

import { SubscriptionAction } from '@/compiler/types'
import Divider from '@/components/Divider'
import LoaderAnimation from '@/components/Loader'

export default function SubscriptionActionConfirmation({
  action,
  handleAction,
  closeConfirmation,
}: Readonly<{
  action: SubscriptionAction
  handleAction: (action: SubscriptionAction) => Promise<void>
  closeConfirmation: () => void
}>) {
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false)

  const actionDetails = {
    cancel: {
      info: [
        "Your subscription will remain active until the end of the current billing period. You'll continue to enjoy all benefits until then.",
        'During this time, you can still renew your subscription at any time without incurring any additional costs. Just visit this page and reactivate your subscription before the current billing period ends.',
        "Once the current billing period expires, your subscription will be automatically cancelled. If you wish to continue using our services afterwards, you'll need to subscribe again.",
      ],
      appreciation: 'We appreciate your support and hope to see you back soon!',
    },
    renew: {
      info: [
        'By confirming this, your subscription will be automatically renewed after the current billing period ends, when you will be charged automatically for the next billing period.',
        "You'll continue to enjoy our services just like before. Your access will remain uninterrupted, and you can use our platform as usual.",
      ],
      appreciation: 'Thank you for choosing to stay with us!',
    },
  }

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedToTerms(event.target.checked)
  }

  const handleConfirm = async () => {
    setShowSpinner(true)
    await handleAction(action)
    setShowSpinner(false)
    closeConfirmation()
  }

  return (
    <>
      <article className="fixed left-0 top-0 z-30 flex h-full w-full flex-col gap-1 overflow-y-auto rounded-md border-2 border-tertiary bg-white p-4 shadow-md md:left-1/2 md:top-1/2 md:h-fit md:w-[600px] md:-translate-x-1/2 md:-translate-y-1/2">
        {/* Header and information about consequences of the action: */}
        <h2 className="text-2xl font-bold text-primary">
          Are you sure you want to {action} this subscription?
        </h2>
        <h3 className="text-xl font-semibold text-brand">
          Before proceeding, please review the following information:
        </h3>
        <Divider />
        <ul className="flex list-disc flex-col gap-2 px-4">
          {actionDetails[action].info.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
        <p className="mb-2 mt-6 self-center text-center text-xl font-semibold">
          {actionDetails[action].appreciation}
        </p>
        <Divider />
        {/* Checkbox to agree to above terms: */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms-subscription-action"
            onChange={(e) => handleCheckBox(e)}
          />
          <label htmlFor="terms-subscription-action">
            By checking this box, I confirm that I&apos;ve read and agreed to
            the terms above.
          </label>
        </div>
        {/* Yes and No buttons - Yes is disabled if checkbox is not checked */}
        <div className="my-4 flex w-full justify-center gap-8">
          <button
            className="btn-primary flex w-[100px] items-center justify-center md:w-[150px]"
            onClick={handleConfirm}
            disabled={!agreedToTerms}
          >
            {showSpinner ? (
              <LoaderAnimation size="small" color="white" />
            ) : (
              'Yes'
            )}
          </button>
          <button
            className="btn-primary w-[100px] md:w-[150px]"
            onClick={closeConfirmation}
          >
            No
          </button>
        </div>
      </article>
      {/* outer area: */}
      <div
        className="fixed left-0 top-0 z-20 h-screen w-screen bg-primary opacity-70"
        onClick={closeConfirmation}
      ></div>
    </>
  )
}
