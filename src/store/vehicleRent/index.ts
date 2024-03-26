import { createSlice } from '@reduxjs/toolkit'

import { ICarCard, IBikeCard, IScooterCard } from '@/compiler/interfaces'
import { Insurance, VehicleType } from '@/compiler/types'

interface IVehicleRentState {
  vehicle: ICarCard | IBikeCard | IScooterCard
  insurance: Insurance
  subscription: {
    hasSubscription: boolean
    details: {
      selected_vehicle: VehicleType | null
      selected_vehicle_discount: number | null
      all_vehicles_discount: number | null
      insurance: Insurance
    }
  }
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
  insurance: 'maximum',
  subscription: {
    hasSubscription: false,
    details: {
      selected_vehicle: null,
      selected_vehicle_discount: null,
      all_vehicles_discount: null,
      insurance: 'minimum',
    },
  },
}

export const vehicleRentSlice = createSlice({
  name: 'vehicleRent',
  initialState,
  reducers: {
    setRentVehicle: (state, action) => {
      state.vehicle = action.payload
    },
    setRentInsurance: (state, action) => {
      state.insurance = action.payload
    },
    setSubscription: (state, action) => {
      state.subscription = action.payload
    },
    resetSubscription: (state) => {
      state.subscription = initialState.subscription
    },
  },
})

export const {
  setRentVehicle,
  setRentInsurance,
  setSubscription,
  resetSubscription,
} = vehicleRentSlice.actions

export default vehicleRentSlice.reducer
