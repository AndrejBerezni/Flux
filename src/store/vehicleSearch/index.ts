import { createSlice } from '@reduxjs/toolkit'

import { ILocation } from '@/compiler/interfaces'
import { VehicleType } from '@/compiler/types'
import { checkIfWeekend } from '@/lib/utilities/checkIfWeekend'
import { formatHour } from '@/lib/utilities/formatHour'

export const pickupDefault = new Date(
  new Date().setDate(new Date().getDate() + 2)
).toISOString()
export const returnDefault = new Date(
  new Date().setDate(new Date().getDate() + 7)
).toISOString()

export interface IVehicleSearchState {
  vehicle: VehicleType
  pickupLocation: ILocation | null
  returnLocation: ILocation | null
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
    setLocation: (
      state,
      action: {
        payload: {
          location: ILocation
          variant: 'pickupLocation' | 'returnLocation'
        }
        type: string
      }
    ) => {
      state[action.payload.variant] = action.payload.location
      // if location is not open 24/7, adjust pickup and return times according to working hours, if they are set outside those hours:
      const updateTime = (
        openingHour: 'opening_hour_working_day' | 'opening_hour_weekend',
        closingHour: 'closing_hour_working_day' | 'closing_hour_weekend'
      ) => {
        const pickupTime = new Date(`2000-01-01T${state.pickupTime}`)
        const returnTime = new Date(`2000-01-01T${state.returnTime}`)
        if (state.pickupLocation && !state.pickupLocation.always_open) {
          //converting them back to Date to compare them
          const openingTime = new Date(
            `2000-01-01T${formatHour(state.pickupLocation[openingHour], 0)}`
          )
          const closingTime = new Date(
            `2000-01-01T${formatHour(state.pickupLocation[closingHour], 0)}`
          )
          if (pickupTime < openingTime || pickupTime > closingTime) {
            state.pickupTime = formatHour(state.pickupLocation[openingHour], 0)
          }
          // if return location is the same, immediately check return time and update accordingly:
          if (
            state.sameReturn &&
            (returnTime < openingTime || returnTime > closingTime)
          ) {
            state.returnTime = formatHour(
              state.pickupLocation[closingHour] - 2,
              0
            ) // subtracting 2 in order not to set return time exactly at closing time, but earlier
          }
        }
        // if return location is set, check return time and update it accordingly (in the future we should refactor this function because it is the same as first part of the one above for pickup):
        if (state.returnLocation && !state.returnLocation.always_open) {
          const openingTime = new Date(
            `2000-01-01T${formatHour(state.returnLocation[openingHour], 0)}`
          )
          const closingTime = new Date(
            `2000-01-01T${formatHour(state.returnLocation[closingHour], 0)}`
          )
          if (returnTime < openingTime || returnTime > closingTime) {
            state.returnTime = formatHour(
              state.returnLocation[closingHour] - 2,
              0
            )
          }
        }
      }
      if (checkIfWeekend(state.pickupDate)) {
        updateTime('opening_hour_weekend', 'closing_hour_weekend')
      } else {
        updateTime('opening_hour_working_day', 'closing_hour_working_day')
      }
    },
    removeLocation: (
      state,
      action: {
        payload: 'pickupLocation' | 'returnLocation'
        type: string
      }
    ) => {
      state[action.payload] = null
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
  setLocation,
  removeLocation,
  setPickupDate,
  setPickupTime,
  setReturnDate,
  setReturnTime,
  setSameReturn,
  setDifferentReturn,
} = vehicleSearchSlice.actions

export default vehicleSearchSlice.reducer
