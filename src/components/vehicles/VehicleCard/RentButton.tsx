'use client'

import { useDispatch, useSelector } from 'react-redux'

import { ICarCard, IBikeCard, IScooterCard } from '@/compiler/interfaces'
import { subscriptionDetailsAction } from '@/lib/server_actions/rentActions'
import { getAuthStatus, getUserId } from '@/store/authentication/selectors'
import { showModal } from '@/store/modal'
import {
  resetSubscription,
  setRentVehicle,
  setSubscription,
} from '@/store/vehicleRent'

export default function RentButton({
  vehicle,
}: Readonly<{
  vehicle: ICarCard | IBikeCard | IScooterCard
}>) {
  const dispatch = useDispatch()
  const isAuth = useSelector(getAuthStatus)
  const uid = useSelector(getUserId)

  const handleSubscription = async () => {
    const subscription = await subscriptionDetailsAction(uid)
    if (subscription) {
      dispatch(
        setSubscription({
          hasSubscription: true,
          details: {
            selected_vehicle: subscription.selected_vehicle,
            selected_vehicle_discount: subscription.selected_vehicle_discount,
            all_vehicles_discount: subscription.all_vehicles_discount,
            insurance: subscription.insurance,
            name: subscription.name,
          },
        })
      )
    } else {
      dispatch(resetSubscription())
    }
  }

  const handleClick = async () => {
    if (!isAuth) {
      dispatch(showModal({ modalType: 'signIn', outerType: 'visible' }))
      return
    }
    await handleSubscription()
    dispatch(setRentVehicle(vehicle))
    dispatch(showModal({ modalType: 'rent', outerType: 'visible' }))
  }

  return (
    <button onClick={handleClick} className="btn-primary py-1">
      Rent
    </button>
  )
}
