import { robotoCondensed } from '../fonts'

export default function ContactPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main
      className={`${robotoCondensed.className} flex min-h-[80vh] justify-between gap-2 bg-primary`}
    >
      {children}
      <div className="hidden min-h-[80vh] w-[50vw] bg-[url('/support.jpg')] bg-cover bg-bottom sm:inline lg:w-[40vw]"></div>
    </main>
  )
}
