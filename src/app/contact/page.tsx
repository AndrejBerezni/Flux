import Link from 'next/link'
export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-primary px-4">
      <h2 className="text-center text-2xl font-bold text-brand">
        Page under construction. Sorry for the inconvenience.
      </h2>
      <Link
        href="/"
        className="mt-12 text-xl font-bold text-brandSecondary underline hover:text-brandTertiary"
      >
        Back to Homepage
      </Link>
    </main>
  )
}
