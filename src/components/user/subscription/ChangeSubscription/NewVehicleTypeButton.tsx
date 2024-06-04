export default function NewVehicleTypeButton({
  vehicle,
  selectVehicle,
}: Readonly<{
  vehicle: {
    text: string
    icon: React.ReactNode
  }
  selectVehicle: () => void
}>) {
  return (
    <button
      className="flex items-center justify-center gap-4 bg-white py-4 shadow-md duration-200 hover:-translate-y-1 active:scale-[98%] active:shadow-none sm:justify-start sm:pl-[40%]"
      onClick={selectVehicle}
    >
      <span className="text-3xl">{vehicle.icon}</span>
      <span className="text-2xl font-semibold capitalize">{vehicle.text}</span>
    </button>
  )
}
