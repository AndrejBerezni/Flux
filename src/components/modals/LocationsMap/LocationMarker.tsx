import { OverlayView } from '@react-google-maps/api'

export default function LocationMarker({
  position,
}: {
  position: { lat: number; lng: number }
}) {
  return (
    <OverlayView mapPaneName={OverlayView.MARKER_LAYER} position={position}>
      <div className="h-[20px] w-[20px] rounded-md bg-white"></div>
    </OverlayView>
  )
}
