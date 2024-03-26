'use client'
import { useDispatch, useSelector } from 'react-redux'

import { ICarCard, IBikeCard, IScooterCard } from '@/compiler/interfaces'
import { VehicleType } from '@/compiler/types'
import { getAuthStatus } from '@/store/authentication/selectors'
import { showModal } from '@/store/modal'

export default function RentButton({
  vehicle,
  vehicleType,
  days,
}: {
  vehicle: ICarCard | IBikeCard | IScooterCard
  vehicleType: VehicleType
  days: number
}) {
  const dispatch = useDispatch()
  const isAuth = useSelector(getAuthStatus)

  const handleClick = () => {
    if (!isAuth) {
      dispatch(showModal({ modalType: 'signIn', outerType: 'visible' }))
      return
    }
  }

  return (
    <button onClick={handleClick} className="btn-primary py-1">
      Rent
    </button>
  )
}
