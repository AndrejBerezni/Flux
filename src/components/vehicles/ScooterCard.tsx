import { IScooterCard } from '@/lib/definitions'

export default function ScooterCard({
  vehicle,
  days,
}: {
  vehicle: IScooterCard
  days: number
}) {
  return <h1>{vehicle.name}</h1>
}
