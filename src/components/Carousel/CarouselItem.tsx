import { ReactNode } from 'react'

import clsx from 'clsx'

export default function CarouselItem({
  children,
  currentSlide,
  slideIndex,
}: {
  children: ReactNode
  currentSlide: number
  slideIndex: number
}) {
  return (
    <div
      className={clsx(
        'absolute origin-left rounded-xl transition-all duration-300 ease-in-out',
        {
          'left-0': slideIndex === currentSlide,
          '-left-full': slideIndex < currentSlide,
          'left-full': slideIndex > currentSlide,
        }
      )}
    >
      {children}
    </div>
  )
}
