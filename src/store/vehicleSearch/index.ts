import { createSlice } from '@reduxjs/toolkit'

import { Location } from '@/lib/definitions'

export const pickupDefault = new Date(
  new Date().setDate(new Date().getDate() + 2)
).toISOString()
export const returnDefault = new Date(
  new Date().setDate(new Date().getDate() + 7)
).toISOString()

interface IVehicleSearchState {
  vehicle: 'cars' | 'bikes' | 'scooters'
  pickupLocation: Location | null
  returnLocation: Location | null
  sameReturn: boolean
  pickupDate: string
  returnDate: string
  pickupTime: string
  returnTime: string
}

const initialState: IVehicleSearchState = {
  vehicle: 'cars',
  pickupLocation: null,
  returnLocation: null,
  sameReturn: true,
  pickupDate: pickupDefault,
  returnDate: returnDefault,
  pickupTime: '12:30',
  returnTime: '16:00',
}

export const vehicleSearchSlice = createSlice({
  name: 'vehicleSearch',
  initialState,
  reducers: {
    setVehicle: (state, action) => {
      state.vehicle = action.payload
    },
    setPickUpLocation: (state, action) => {
      state.pickupLocation = action.payload
    },
    setReturnLocation: (state, action) => {
      state.returnLocation = action.payload
    },
    setSameReturn: (state) => {
      state.sameReturn = true
      state.returnLocation = null
    },
    setDifferentReturn: (state) => {
      state.sameReturn = false
    },
    setPickupDate: (state, action) => {
      state.pickupDate = action.payload
    },
    setReturnDate: (state, action) => {
      state.returnDate = action.payload
    },
    setPickupTime: (state, action) => {
      state.pickupTime = action.payload
    },
    setReturnTime: (state, action) => {
      state.returnTime = action.payload
    },
  },
})

export const {
  setVehicle,
  setPickUpLocation,
  setPickupDate,
  setPickupTime,
  setReturnLocation,
  setReturnDate,
  setReturnTime,
  setSameReturn,
  setDifferentReturn,
} = vehicleSearchSlice.actions

export default vehicleSearchSlice.reducer
