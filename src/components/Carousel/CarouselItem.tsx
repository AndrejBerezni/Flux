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
        'absolute origin-left rounded-xl transition-all duration-700 ease-in-out',
        {
          'left-0 scale-100 opacity-100': slideIndex === currentSlide,
          '-left-full scale-50 opacity-0': slideIndex < currentSlide,
          'left-full scale-50 opacity-0': slideIndex > currentSlide,
        }
      )}
    >
      {children}
    </div>
  )
}
