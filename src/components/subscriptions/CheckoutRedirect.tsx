'use client'
import { useState } from 'react'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage } from '@/store/modal'

import { getAuthStatus, getUserId } from '@/store/authentication/selectors'
import { showModal } from '@/store/modal'

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
    const selectedVehicle = searchParams.get('vehicleType')
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
    let selectedVehicle
    if (subName !== 'Platinum') {
      selectedVehicle = handleVehicleInformation()
      if (!selectedVehicle) {
        return
      }
    }
    // const requestData = {
    //   subId,
    //   subStripeId,
    //   userId,
    // }
    const response = await fetch(
      `/api/subscriptions/checkout?subId=${subId}&subStripeId=${subStripeId}&userId=${userId}`
    )
    const url = await response.json()
    if (url) {
      router.push(url)
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
        onClick={handleCheckoutButtonClick}
      >
        Proceed to payment
      </button>
    </div>
  )
}
