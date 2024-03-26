'use client'

import { useDispatch, useSelector } from 'react-redux'

import { ICarCard, IBikeCard, IScooterCard } from '@/compiler/interfaces'
import { getAuthStatus } from '@/store/authentication/selectors'
import { showModal } from '@/store/modal'
import { setRentVehicle } from '@/store/vehicleRent'

export default function RentButton({
  vehicle,
}: {
  vehicle: ICarCard | IBikeCard | IScooterCard
}) {
  const dispatch = useDispatch()
  const isAuth = useSelector(getAuthStatus)

  const handleClick = () => {
    if (!isAuth) {
      dispatch(showModal({ modalType: 'signIn', outerType: 'visible' }))
      return
    }
    dispatch(setRentVehicle(vehicle))
    dispatch(showModal({ modalType: 'rent', outerType: 'visible' }))
  }

  return (
    <button onClick={handleClick} className="btn-primary py-1">
      Rent
    </button>
  )
}
