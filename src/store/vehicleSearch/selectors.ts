import { get } from 'lodash'

import { RootState } from '..'

export const getVehicleSearchInfo = (store: RootState) =>
  get(store, 'vehicleSearch', {
    vehicle: 'cars',
    pickupLocation: '',
    returnLocation: '',
    sameReturn: false,
    pickupDate: '15 Jan', //change it later to two days from current day
    returnDate: '20 Jan', //change it later to five days from pickup date
    pickupTime: '12:30',
    returnTime: '16:00',
  })
