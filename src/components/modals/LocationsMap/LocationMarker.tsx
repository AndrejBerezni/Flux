import { OverlayView } from '@react-google-maps/api'
import { useDispatch } from 'react-redux'

import { robotoCondensed } from '@/app/fonts'
import { Location } from '@/lib/definitions'
import { hideSecondaryModal } from '@/store/modal'
import { setLocation } from '@/store/vehicleSearch'

export default function LocationMarker({
  position,
  location,
}: {
  position: { lat: number; lng: number }
  location: Location
}) {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setLocation({ location, variant: 'pickupLocation' }))
    dispatch(hideSecondaryModal())
  }
  return (
    <OverlayView
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      position={position}
    >
      <div
        className={`${robotoCondensed.className} flex h-fit w-fit min-w-[150px] flex-col rounded-md bg-brand p-2 shadow-lg`}
      >
        <h3 className="text-nowrap text-center text-lg font-semibold uppercase text-primary">
          {location.name}
        </h3>
        <p className="text-sm font-semibold text-white">{`${location.street}${
          location.street_number !== 'NN' ? ` ${location.street_number}` : ''
        }, ${location.city}, ${location.zip_code}`}</p>
        <button
          onClick={handleClick}
          className="mt-2 self-center rounded-full bg-primary px-3 py-1 font-bold uppercase text-white hover:bg-secondary"
        >
          Select Location
        </button>
      </div>
    </OverlayView>
  )
}
