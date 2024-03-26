import { get } from 'lodash'

import { RootState } from '..'

export const getRentVehicleInfo = (store: RootState) =>
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

export const getRentInsuranceInfo = (store: RootState) =>
  get(store, 'vehicleRent.insurance', 'maximum')

export const getRentSubscriptionInfo = (store: RootState) =>
  get(store, 'vehicleRent.subscription', {
    hasSubscription: false,
    details: {
      selected_vehicle: null,
      selected_vehicle_discount: null,
      all_vehicles_discount: null,
      insurance: 'minimum',
      name: null,
    },
  })
