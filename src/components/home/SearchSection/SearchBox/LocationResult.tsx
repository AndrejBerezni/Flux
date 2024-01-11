import { roboto } from '@/app/fonts'

export default function LocationResult({
  locationName,
  locationIcon,
  handleClick,
}: {
  locationName: string
  locationIcon: React.ReactNode
  handleClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex h-[60px] w-full items-center hover:bg-tertiary"
    >
      <span className="px-4 text-3xl">{locationIcon}</span>
      <span
        className={`${roboto.className} border-b-solid flex h-full flex-1 items-center border-b-[1px] border-b-tertiary pl-4 font-medium tracking-wide`}
      >
        {locationName}
      </span>
    </button>
  )
}
