export default function VehiclePrice({
  price,
  days,
}: {
  price: number
  days: number
}) {
  return (
    <div className="flex flex-col items-start">
      <p className="text-xl font-extrabold text-brand">
        {(Math.round(price * 100) / 100).toFixed(2)}€ /day
      </p>
      <p className="font-bold">
        {(Math.round(price * days * 100) / 100).toFixed(2)}€ total
      </p>
    </div>
  )
}
