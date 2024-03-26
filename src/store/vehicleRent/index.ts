import { createSlice } from '@reduxjs/toolkit'

import { ICarCard, IBikeCard, IScooterCard } from '@/compiler/interfaces'

interface IVehicleRentState {
  vehicle: ICarCard | IBikeCard | IScooterCard
}

const initialState: IVehicleRentState = {
  vehicle: {
    id: '',
    name: '',
    brand: '',
    price_per_day: 0,
    gearshift: '',
    passengers: 0,
    bags: 0,
    doors: 0,
    stripeId: '',
    full_price: '',
    discount_2: '',
    discount_7: '',
    discount_10: '',
    available_vehicle: '',
    image_url: '',
  },
}

export const vehicleRentSlice = createSlice({
  name: 'vehicleRent',
  initialState,
  reducers: {
    setRentVehicle: (state, action) => {
      state.vehicle = action.payload
    },
  },
})

export const { setRentVehicle } = vehicleRentSlice.actions

export default vehicleRentSlice.reducer
