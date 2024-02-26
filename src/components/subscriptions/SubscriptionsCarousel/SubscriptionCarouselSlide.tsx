import clsx from 'clsx'
import Image from 'next/image'

import { robotoCondensed } from '@/app/fonts'
export default function SubscriptionCarouselSlide({
  slideData,
  index,
  current,
}: {
  slideData: {
    headerText: string
    headerSpan: string
    spanColor: string
    img: string
    text: string
  }
  index: number
  current: number
}) {
  return (
    <article
      className={clsx(
        'absolute top-0 flex h-full w-[100vw] origin-left flex-col items-center justify-between p-2 pb-12 transition-all duration-500 ease-in-out md:flex-row',
        {
          'left-0': index === current,
          '-left-full': index < current,
          'left-full': index > current,
        }
      )}
    >
      <Image
        src={slideData.img}
        alt={`${slideData.headerText} ${slideData.headerSpan}`}
        width={1200}
        height={800}
        className="w-full md:w-[60%]"
      />
      <div className="flex w-full flex-1 flex-col items-center justify-start px-4 pt-2 text-center max-[500px]:pt-6 md:justify-center md:pt-0">
        <h2
          className={`${robotoCondensed.className} text-5xl font-extrabold uppercase text-brand lg:text-7xl xl:text-8xl`}
        >
          {slideData.headerText}
        </h2>
        <h2
          className={clsx(
            `${robotoCondensed.className} text-5xl font-extrabold uppercase lg:text-7xl xl:text-8xl`,
            {
              'text-brandSecondary': slideData.spanColor === 'secondary',
              'text-brandTertiary': slideData.spanColor === 'tertiary',
            }
          )}
        >
          {slideData.headerSpan}
        </h2>
        <p className="text-center text-lg capitalize text-white lg:text-2xl xl:text-3xl">
          {slideData.text}
        </p>
      </div>
    </article>
  )
}
