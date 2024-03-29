import { createSlice } from '@reduxjs/toolkit'

import {
  ICarCard,
  IBikeCard,
  IScooterCard,
  IInsurance,
} from '@/compiler/interfaces'
import { Insurance, SubscriptionName, VehicleType } from '@/compiler/types'

interface IVehicleRentState {
  vehicle: ICarCard | IBikeCard | IScooterCard
  insurance: IInsurance
  subscription: {
    hasSubscription: boolean
    details: {
      selected_vehicle: VehicleType | null
      selected_vehicle_discount: number | null
      all_vehicles_discount: number | null
      insurance: Insurance
      name: SubscriptionName | null
    }
  }
  price: {
    id: string
    amount: number
  } | null
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
  insurance: {
    id: '',
    vehicle: '',
    stripe_product_id: null,
    stripe_price_id: null,
    price_description: '',
    coverage_name: '',
    financial_responsibility: '',
  },
  subscription: {
    hasSubscription: false,
    details: {
      selected_vehicle: null,
      selected_vehicle_discount: null,
      all_vehicles_discount: null,
      insurance: 'minimum',
      name: null,
    },
  },
  price: null,
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
    setRentPrice: (state, action) => {
      state.price = action.payload
    },
  },
})

export const {
  setRentVehicle,
  setRentInsurance,
  setSubscription,
  resetSubscription,
  setRentPrice,
} = vehicleRentSlice.actions

export default vehicleRentSlice.reducer
