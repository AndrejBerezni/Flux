export type Location = {
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

export type CarCard = {
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
