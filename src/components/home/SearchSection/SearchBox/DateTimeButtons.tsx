import { FaRegCalendar, FaRegClock } from 'react-icons/fa'

export default function DateTimeButtons({
  variant,
}: {
  variant: 'Pick-up date' | 'Return date'
}) {
  return (
    <div
      aria-label={`${variant} buttons`}
      className="relative flex w-full flex-nowrap items-center md:w-auto md:flex-1"
    >
      <p className="absolute bottom-full mb-1 text-base font-bold md:text-[0.8rem]">
        {variant}
      </p>
      <button
        type="button"
        className="flex flex-1 items-center gap-4 text-nowrap rounded-l-lg border-[1px] border-solid border-tertiary py-3 pl-2 pr-6 hover:bg-quaternary"
      >
        <FaRegCalendar className="text-2xl" />
        11 Jan
      </button>
      <button
        type="button"
        className="flex flex-1 items-center gap-4 rounded-r-lg border-[1px] border-solid border-tertiary px-3 py-3 hover:bg-quaternary"
      >
        <FaRegClock className="text-2xl md:hidden" />
        12:30
      </button>
    </div>
  )
}
