import ContactForm from '@/components/ContactForm'

import { robotoCondensed } from '../fonts'

export default function ContactPage() {
  return (
    <main
      className={`${robotoCondensed.className} flex min-h-[80vh] justify-between gap-2 bg-primary`}
    >
      <div className="px-4 py-10 lg:pl-32 2xl:pl-48">
        <h1 className="text-3xl font-extrabold uppercase tracking-wide text-white sm:text-5xl">
          Here to Help
        </h1>
        <h2 className="mb-4 mt-2 text-base font-semibold text-brand sm:max-w-[70%] sm:text-xl">
          Reach out using the form below, and our support team will promptly
          address your inquiry.
        </h2>
        <div className="h-[0.5px] w-full bg-tertiary sm:max-w-[70%]"></div>
        <ContactForm />
      </div>
      <div className="hidden min-h-[80vh] w-[50vw] bg-[url('/support.jpg')] bg-cover bg-bottom md:inline lg:w-[40vw]"></div>
    </main>
  )
}
