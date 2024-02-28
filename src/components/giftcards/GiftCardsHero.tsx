import { robotoFlex } from '@/app/fonts'
export default function GiftCardsHero() {
  return (
    <section className="relative z-0 flex min-h-[40vh] w-full flex-col items-center justify-center bg-[url('/giftcards-scooter.jpg')] bg-cover bg-center bg-no-repeat px-4 py-10 min-[425px]:bg-left-bottom md:w-1/3 md:bg-center">
      <div className="absolute left-0 top-0 h-full w-full bg-black opacity-60"></div>
      <h1 className="relative z-10 mb-2 text-center text-5xl font-extrabold uppercase text-brandSecondary duration-300 hover:cursor-default lg:text-7xl xl:text-8xl">
        Flux Gift Cards
      </h1>
      <p
        className={`${robotoFlex.className} relative z-10 text-center text-base font-normal text-white duration-300 hover:cursor-default md:font-bold lg:text-lg`}
      >
        Spark Joy in Someone&apos;s Journey with the Gift of Electric Adventure
      </p>
    </section>
  )
}
