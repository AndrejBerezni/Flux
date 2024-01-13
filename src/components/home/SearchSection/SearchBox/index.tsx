import RentDetails from './RentDetails'
import SmallScreenPickupSelect from './SmallScreenPickupSelect'
import VehicleButtons from './VehicleButtons'

export default function SearchBox() {
  return (
    <div className="flex min-h-[200px] w-full flex-col gap-2 rounded-2xl bg-white p-4 shadow-md">
      <VehicleButtons />
      <SmallScreenPickupSelect />
      <RentDetails />
    </div>
  )
}
