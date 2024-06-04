import { OverlayView } from '@react-google-maps/api'
import { RiUserLocationFill } from 'react-icons/ri'

export default function UserLocationmarker({
  position,
}: Readonly<{
  position: { lat: number; lng: number }
}>) {
  return (
    <OverlayView mapPaneName={OverlayView.MARKER_LAYER} position={position}>
      <div className="h-fit w-fit rounded-full border-2 border-brand bg-white p-1 shadow-lg">
        <RiUserLocationFill className="text-3xl text-brand" />
      </div>
    </OverlayView>
  )
}
