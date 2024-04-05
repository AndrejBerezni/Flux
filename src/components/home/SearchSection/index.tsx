import AnimationContentFadeIn from '@/components/animation/AnimationContentFadeIn'

import RentDetails from './RentDetails'
import SmallScreenPickupSelect from './SmallScreenPickupSelect'
import VehicleButtons from './VehicleButtons'
import MapWrapper from '../../modals/LocationsMap/MapWrapper'

export default function SearchSection({
  loadMap,
  userLatitude,
  userLongitude,
}: {
  loadMap: string
  userLatitude: string
  userLongitude: string
}) {
  return (
    <section className="min-h-[60vh] w-full bg-black bg-[url('/searchsectionbgtesla.jpg')] bg-contain bg-[center_180px] bg-no-repeat px-4 pt-4 min-[550px]:min-h-[70vh] md:bg-[center_bottom_-100px] lg:px-32 2xl:px-48">
      <AnimationContentFadeIn>
        <div className="flex min-h-[200px] w-full flex-col gap-2 rounded-2xl bg-white p-4 shadow-md">
          <VehicleButtons />
          <SmallScreenPickupSelect />
          <RentDetails />
          {loadMap === 'true' && (
            <MapWrapper
              userLatitude={userLatitude}
              userLongitude={userLongitude}
            />
          )}
        </div>
      </AnimationContentFadeIn>
    </section>
  )
}
