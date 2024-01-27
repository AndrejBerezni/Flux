import { get } from 'lodash'

import { pickupDefault, returnDefault } from '.'
import { RootState } from '..'

export const getVehicleSearchInfo = (store: RootState) =>
  get(store, 'vehicleSearch', {
    vehicle: 'cars',
    pickupLocation: null,
    returnLocation: null,
    sameReturn: false,
    pickupDate: pickupDefault,
    returnDate: returnDefault,
    pickupTime: '12:30',
    returnTime: '16:00',
  })
