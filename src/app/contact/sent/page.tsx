import Link from 'next/link'

export default function ContactFormSentPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-12 px-4 py-10 lg:px-32 2xl:px-48">
      <h2 className="text-center text-lg font-semibold tracking-wide text-brandSecondary sm:text-2xl">
        Ticket successfully submitted! Our support will get in touch with you
        briefly!
      </h2>
      <Link href="/" className="btn-primary">
        Back to home page
      </Link>
    </div>
  )
}
