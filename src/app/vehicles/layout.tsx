import { robotoCondensed } from '../fonts'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${robotoCondensed.className} flex h-full w-full max-w-full flex-col gap-6 bg-quaternary py-10 pl-4 pr-6 md:flex-row lg:px-32 2xl:px-48`}
    >
      <div className="hidden h-[600px] bg-white shadow-lg md:block lg:w-1/4">
        We will have filters here
      </div>
      {children}
    </div>
  )
}
