'use client'
import { useState } from 'react'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'

import { getAuthStatus, getUserId } from '@/store/authentication/selectors'
import { setMessage, showModal } from '@/store/modal'

import Spinner from '../Spinner'

export default function CheckoutRedirect({
  subId,
  subStripeId,
  subName,
  subPeriod,
}: {
  subId: string
  subStripeId: string
  subName: string
  subPeriod: string
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const isAuth = useSelector(getAuthStatus)
  const userId = useSelector(getUserId)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false)

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedToTerms(event.target.checked)
  }

  const handleVehicleInformation = () => {
    const selectedVehicle = searchParams.get('selectedVehicle')
    if (!selectedVehicle) {
      dispatch(
        setMessage({
          type: 'error',
          text: 'Please select vehicle type for this subscription.',
        })
      )
      return null
    }
    return selectedVehicle
  }

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      let selectedVehicle
      if (subName !== 'Platinum') {
        selectedVehicle = handleVehicleInformation()
        if (!selectedVehicle) {
          return
        }
      }
      const subscriptionData = {
        subId,
        subStripeId,
        userId,
        selectedVehicle: subName === 'Platinum' ? '' : selectedVehicle,
        subPeriod,
      }
      const response = await fetch('/api/subscriptions/checkout', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(subscriptionData),
      })
      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(
          errorResponse.error || 'Error occurred, please try later.'
        )
      }
      const url = await response.json()
      if (url) {
        router.push(url)
      }
    } catch (error) {
      setIsLoading(false)
      dispatch(
        setMessage({
          type: 'error',
          text:
            error instanceof Error ? error.message : 'Unknown error occurred.',
        })
      )
    }
  }

  const handleCheckoutButtonClick = async () => {
    if (!isAuth) {
      dispatch(showModal({ modalType: 'signIn', outerType: 'visible' }))
    } else {
      await handleCheckout()
    }
  }

  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          type="checkbox"
          id="terms-conditions-subscription"
          onChange={(e) => handleCheckBox(e)}
        />
        <label htmlFor="terms-conditions-subscription">
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
        className="btn-primary flex justify-center"
        disabled={!agreedToTerms || isLoading}
        onClick={handleCheckoutButtonClick}
      >
        {isLoading ? <Spinner /> : 'Proceed to payment'}
      </button>
    </div>
  )
}
