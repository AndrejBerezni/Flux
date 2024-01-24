import RentDetails from './RentDetails'
import LocationSearch from './RentDetails/LocationSection/LocationSearch'
import SmallScreenPickupSelect from './SmallScreenPickupSelect'
import VehicleButtons from './VehicleButtons'

export default function SearchSection({
  pickupLocation,
  returnLocation,
}: {
  pickupLocation: string
  returnLocation: string
}) {
  return (
    <section className="min-h-[60vh] w-full bg-black bg-[url('/searchsectionbgtesla.jpg')] bg-contain bg-[center_180px] bg-no-repeat px-4 pt-4 min-[550px]:min-h-[70vh] md:bg-[center_bottom_-100px] lg:px-32 2xl:px-48">
      <div className="flex min-h-[200px] w-full flex-col gap-2 rounded-2xl bg-white p-4 shadow-md">
        <VehicleButtons />
        <SmallScreenPickupSelect>
          <LocationSearch
            variant="pickupLocation"
            searchTerm={pickupLocation}
          />
        </SmallScreenPickupSelect>
        <RentDetails>
          <LocationSearch
            variant="pickupLocation"
            searchTerm={pickupLocation}
          />
          <LocationSearch
            variant="returnLocation"
            searchTerm={returnLocation}
          />
        </RentDetails>
      </div>
    </section>
  )
}
