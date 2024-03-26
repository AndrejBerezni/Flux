import { get } from 'lodash'

import { RootState } from '..'

export const getVehicleRentInfo = (store: RootState) => {
  get(store, 'vehicleRent.vehicle', {
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
  })
}