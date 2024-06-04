import Link from 'next/link'
import { GrDocumentDownload } from 'react-icons/gr'
export default function SuccessfulRentHeader({
  name,
  invoice,
}: Readonly<{
  name: string
  invoice: string
}>) {
  return (
    <div className="flex items-center justify-between gap-6">
      <h1 className="text-2xl font-extrabold uppercase tracking-wider max-[375px]:text-xl md:text-3xl">
        {name}
        <span className="text-brand"> Booked Successfully!</span>
      </h1>
      {invoice && (
        <Link
          href={invoice}
          className="group relative self-start rounded-md border-2 bg-quaternary p-2 text-3xl text-brand duration-150 hover:shadow-md active:scale-95 max-[375px]:p-1 max-[375px]:text-lg lg:self-center"
        >
          <GrDocumentDownload />
          <p className="absolute right-0 top-full z-10 mt-2 hidden text-nowrap rounded-md bg-quaternary p-2 text-center text-base font-semibold text-primary shadow-md group-hover:block">
            Download Invoice
          </p>
        </Link>
      )}
    </div>
  )
}
