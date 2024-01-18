import Link from 'next/link'

import { roboto } from '@/app/fonts'

export default function GiftCardSection() {
  return (
    <section
      className={`${roboto.className} mb-12 mt-4 flex min-h-[50vh] justify-center px-4 lg:px-32 2xl:px-48`}
    >
      <article className="relative w-full rounded-xl bg-[url('/damon-hypersport-pro.png')] bg-cover bg-right bg-no-repeat shadow-lg sm:bg-bottom md:min-h-[70vh]">
        <div className="absolute bottom-12 left-0 z-10 flex flex-col items-start gap-4 px-2 text-white sm:left-8">
          <h2 className="text-5xl font-extrabold uppercase drop-shadow-xl max-[375px]:text-3xl">
            FLUX Gift Cards
          </h2>
          <p className="text-xl max-[375px]:text-base">
            Gift the joy of sustainable journeys and make someone&apos;s day
            brighter with gift cards for renting our vehicles.
          </p>
          <button className="self-center rounded-full border-2 border-white px-12 py-1 text-sm hover:bg-secondary hover:bg-opacity-40 sm:self-start">
            <Link href="/giftcards">Buy now</Link>
          </button>
        </div>
        <div className="absolute left-0 top-0 z-[1] h-full w-full rounded-xl bg-gradient-to-t from-primary from-10%"></div>
      </article>
    </section>
  )
}
