import { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

import { getRentPriceAction } from '@/lib/serverActions/rentActions'
import {
  getRentVehicleInfo,
  getRentSubscriptionInfo,
} from '@/store/vehicleRent/selectors'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

export default function RentPrice() {
  const [price, setPrice] = useState<number>(0)
  const search = useSelector(getVehicleSearchInfo)
  const vehicle = useSelector(getRentVehicleInfo)
  const subscription = useSelector(getRentSubscriptionInfo)

  const getPriceId = () => {
    if (!subscription.hasSubscription) {
      return vehicle.full_price
    }
    switch (subscription.details.name) {
      case 'Platinum':
        return vehicle.discount_10
      case 'Gold':
        if (subscription.details.selected_vehicle === search.vehicle) {
          return vehicle.discount_10
        } else {
          return vehicle.discount_2
        }
      case 'Basic':
        if (subscription.details.selected_vehicle === search.vehicle) {
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
      }
    }
    handlePrice()
  }, [])

  return (
    <div>
      <p>
        {(price / 100).toLocaleString('de-De', {
          style: 'currency',
          currency: 'EUR',
        })}
      </p>
    </div>
  )
}
