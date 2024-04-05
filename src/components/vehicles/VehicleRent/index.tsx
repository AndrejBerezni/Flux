'use client'
import { useState } from 'react'

import { useSearchParams, useRouter } from 'next/navigation'
import { IoCloseSharp } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'

import { robotoCondensed } from '@/app/fonts'
import { VehicleType } from '@/compiler/types'
import Divider from '@/components/Divider'
import FadeInImage from '@/components/FadeInImage'
import LoaderAnimation from '@/components/Loader'
import { rentCheckoutAction } from '@/lib/server_actions/rentActions'
import { getUserId } from '@/store/authentication/selectors'
import { hideModal, setMessage } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'
import {
  getRentInsuranceInfo,
  getRentPrice,
  getRentVehicleInfo,
  getRentSubscriptionInfo,
} from '@/store/vehicleRent/selectors'

import InsuranceSelect from './InsuranceSelect'
import RentPrice from './RentPrice'
import VehicleProperties from '../VehicleCard/VehicleProperties'

export default function VehicleRent({
  days,
  children,
}: {
  days: number
  children: React.ReactNode
}) {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)
  const vehicle = useSelector(getRentVehicleInfo)
  const price = useSelector(getRentPrice)
  const insurance = useSelector(getRentInsuranceInfo)
  const subscription = useSelector(getRentSubscriptionInfo)
  const uid = useSelector(getUserId)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  const pickupDate = searchParams.get('pickupDate')!.split('T')[0]
  const returnDate = searchParams.get('returnDate')!.split('T')[0]
  const pickupLocation = searchParams.get('pickupLocation') as string
  const returnLocation = searchParams.get('returnLocation') as string
  const pickupTime = searchParams.get('pickupTime') as string
  const returnTime = searchParams.get('returnTime') as string

  const vehicleType = searchParams.get('vehicleType') as VehicleType

  const handleCheckout = async () => {
    setIsLoading(true)
    //if user already has insurance included or minimum insurance is selected, leave out insurance from checkout session
    const insuranceStripeId =
      subscription.details.insurance === insurance.coverage_name ||
      !insurance.stripe_price_id
        ? undefined
        : insurance.stripe_price_id
    try {
      const checkoutUrl = await rentCheckoutAction({
        uid,
        vehicle_id: vehicle.available_vehicle,
        pickupDate,
        returnDate,
        pickupLocation,
        returnLocation,
        pickupTime,
        returnTime,
        rent_price: price!.amount,
        insurance: insurance.id,
        priceId: price!.id,
        days,
        insuranceStripeId,
      })
      if (checkoutUrl) {
        router.push(checkoutUrl)
      }
    } catch (error) {
      setIsLoading(false)
      dispatch(
        setMessage({
          type: 'error',
          text:
            error instanceof Error
              ? error.message
              : 'Unknown error occurred. Please try again later.',
        })
      )
    }
  }

  if (modal.modalType === 'rent') {
    return (
      <article
        className={`${robotoCondensed.className} fixed left-0 top-0 z-30 flex h-screen w-screen flex-col bg-white md:left-1/2 md:top-[5%] md:h-[90%] md:w-[600px] md:-translate-x-1/2 md:rounded-xl md:border-2`}
      >
        <button
          onClick={() => dispatch(hideModal())}
          className="absolute right-2 top-2 text-2xl hover:text-white"
        >
          <IoCloseSharp />
        </button>
        <div className="flex w-full justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600 md:rounded-t-lg">
          <FadeInImage
            alt={vehicle.name}
            src={vehicle.image_url}
            width={400}
            height={300}
          />
        </div>
        <div className="bg-quaternary px-4 pb-4 pt-2">
          <h1
            className={`${robotoCondensed.className} mb-3 text-3xl font-extrabold uppercase tracking-wider`}
          >
            {'brand' in vehicle && vehicle.brand} {vehicle.name}
          </h1>
          <VehicleProperties vehicle={vehicle} vehicleType={vehicleType} />
        </div>
        <div className="flex flex-col overflow-auto">
          <InsuranceSelect />
          <Divider />
          {/* children is RentTimeDateLocation which is a server component: */}
          {children}
          <RentPrice days={days} />
          <button
            className="btn-primary mb-4 flex w-1/2 items-center justify-center self-center"
            onClick={handleCheckout}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderAnimation size="small" color="white" />
            ) : (
              'Checkout'
            )}
          </button>
        </div>
      </article>
    )
  }
}
