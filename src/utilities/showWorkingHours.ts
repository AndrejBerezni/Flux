import { IVehicleSearchState } from '@/store/vehicleSearch'

import { checkIfWeekend } from './checkIfWeekend'

export const showWorkingHours = (
  vehicleSearch: IVehicleSearchState,
  variant: 'pickupTime' | 'returnTime'
): { opening: number; closing: number } => {
  if (
    variant === 'pickupTime' &&
    !vehicleSearch.pickupLocation?.always_open &&
    vehicleSearch.pickupLocation
  ) {
    if (checkIfWeekend(vehicleSearch.pickupDate)) {
      return {
        opening: vehicleSearch.pickupLocation.opening_hour_weekend,
        closing: vehicleSearch.pickupLocation.closing_hour_weekend,
      }
    } else {
      return {
        opening: vehicleSearch.pickupLocation.opening_hour_working_day,
        closing: vehicleSearch.pickupLocation.closing_hour_working_day,
      }
    }
  }
  if (
    variant === 'returnTime' &&
    vehicleSearch.sameReturn &&
    !vehicleSearch.pickupLocation?.always_open &&
    vehicleSearch.pickupLocation
  ) {
    if (checkIfWeekend(vehicleSearch.returnDate)) {
      return {
        opening: vehicleSearch.pickupLocation.opening_hour_weekend,
        closing: vehicleSearch.pickupLocation.closing_hour_weekend,
      }
    } else {
      return {
        opening: vehicleSearch.pickupLocation.opening_hour_working_day,
        closing: vehicleSearch.pickupLocation.closing_hour_working_day,
      }
    }
  }
  if (
    variant === 'returnTime' &&
    !vehicleSearch.returnLocation?.always_open &&
    vehicleSearch.returnLocation
  ) {
    if (checkIfWeekend(vehicleSearch.returnDate)) {
      return {
        opening: vehicleSearch.returnLocation.opening_hour_weekend,
        closing: vehicleSearch.returnLocation.closing_hour_weekend,
      }
    } else {
      return {
        opening: vehicleSearch.returnLocation.opening_hour_working_day,
        closing: vehicleSearch.returnLocation.closing_hour_working_day,
      }
    }
  }
  return { opening: 0, closing: 24 }
}
