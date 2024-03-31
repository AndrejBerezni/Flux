import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { getRentPriceAction } from '@/lib/server_actions/rentActions'
import { setRentPrice } from '@/store/vehicleRent'
import {
  getRentVehicleInfo,
  getRentSubscriptionInfo,
} from '@/store/vehicleRent/selectors'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

export default function RentPrice({ days }: { days: number }) {
  const dispatch = useDispatch()
  const [price, setPrice] = useState<number>(0)
  const [discountApplied, setDiscountApplied] = useState<string | null>(null)
  const search = useSelector(getVehicleSearchInfo)
  const vehicle = useSelector(getRentVehicleInfo)
  const subscription = useSelector(getRentSubscriptionInfo)
  const getPriceId = () => {
    if (!subscription.hasSubscription) {
      return vehicle.full_price
    }
    switch (subscription.details.name) {
      case 'Platinum':
        setDiscountApplied('10')
        return vehicle.discount_10
      case 'Gold':
        if (subscription.details.selected_vehicle === search.vehicle) {
          setDiscountApplied('10')
          return vehicle.discount_10
        } else {
          setDiscountApplied('2')
          return vehicle.discount_2
        }
      case 'Basic':
        if (subscription.details.selected_vehicle === search.vehicle) {
          setDiscountApplied('7.5')
          return vehicle.discount_7
        } else {
          return vehicle.full_price
        }
      default:
        return vehicle.full_price
    }
  }
  useEffect(() => {
    const handlePrice = async () => {
      const priceId = getPriceId()

      const price = await getRentPriceAction(priceId)
      if (price) {
        setPrice(price)
        dispatch(setRentPrice({ id: priceId, amount: (price * days) / 100 }))
      }
    }
    handlePrice()
  }, [])

  return (
    <div className="mb-8 border-b-[1px] border-b-tertiary px-6 py-4">
      <p className="text-lg">
        Price per day:{' '}
        <span className="font-semibold">
          {(price / 100).toLocaleString('de-De', {
            style: 'currency',
            currency: 'EUR',
          })}
        </span>
        {discountApplied && (
          <span className="text-base font-semibold text-brand">
            {' '}
            ({discountApplied}% subscription discount applied)
          </span>
        )}
      </p>
      <p className="text-xl">
        Total price for {days} days (insurance excluded):{' '}
        <span className="font-semibold">
          {((days * price) / 100).toLocaleString('de-De', {
            style: 'currency',
            currency: 'EUR',
          })}
        </span>
      </p>
    </div>
  )
}
