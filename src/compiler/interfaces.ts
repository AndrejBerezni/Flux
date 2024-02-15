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
