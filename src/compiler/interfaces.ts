export interface ILocation {
  id: string
  name: string
  street: string
  street_number: string
  city: string
  zip_code: string
  country: string
  latitude: number
  longitude: number
  always_open: boolean
  opening_hour_working_day: number
  opening_hour_weekend: number
  closing_hour_working_day: number
  closing_hour_weekend: number
  airport: boolean
}

export interface ICarCard {
  id: string
  name: string
  brand: string
  price_per_day: number
  gearshift: string
  passengers: number
  bags: number
  doors: number
  image_url: string
}

export interface IBikeCard {
  id: string
  name: string
  price_per_day: number
  range: number
  top_speed: number
  weight: number
  image_url: string
}

export interface IScooterCard {
  id: string
  name: string
  price_per_day: number
  top_speed: number
  max_weight: number
  range: number
  image_url: string
}

export interface IUser {
  id: string
  auth_type: 'email' | 'google'
  first_name: string
  last_name?: string
  email: string
  country_code?: number
  phone_number?: number
  street?: string
  street_number?: number
  additional_address_line?: string
  zip_code?: string
  city?: string
  country?: string
  credit_balance: number
  has_active_subscription: boolean
  password: string
}

export interface ISubscriptionsSlide {
  headerText: string
  headerSpan: string
  spanColor: string
  img: string
  text: string
}

export interface ISubscription {
  id: string
  name: string
  selected_vehicle_discount?: number
  all_vehicles_discount?: number
  gift_card_discount?: number
  insurance: string
  price_monthly: number
  stripe_monthly_prod_id: string
  price_yearly: number
  stripe_yearly_prod_id: string
}

export interface ISubscriptionDescription {
  id: string
  subscription_id: string
  text: string
}

export interface ISubscriptionWithDescription extends ISubscription {
  description: { text: string }[]
}
