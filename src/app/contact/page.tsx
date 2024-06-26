import AnimationContentFadeIn from '@/components/animation/AnimationContentFadeIn'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <AnimationContentFadeIn>
      <div className="px-4 py-10 lg:pl-32 2xl:pl-48">
        <h1 className="text-4xl font-extrabold uppercase tracking-wide text-brandSecondary sm:text-5xl">
          Here to Help
        </h1>
        <h2 className="mb-4 mt-2 text-base font-semibold text-brand sm:max-w-[70%] sm:text-xl">
          Reach out using the form below, and our support team will promptly
          address your inquiry.
        </h2>
        <div className="h-[0.5px] w-full bg-brandSecondary sm:max-w-[70%]"></div>

        <ContactForm />
      </div>
    </AnimationContentFadeIn>
  )
}
