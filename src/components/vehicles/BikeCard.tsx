import { IBikeCard } from '@/lib/definitions'

export default function BikeCard({
  vehicle,
  days,
}: {
  vehicle: IBikeCard
  days: number
}) {
  return <h1>{vehicle.name}</h1>
}
