import { ReactNode, useRef } from 'react'

import clsx from 'clsx'

export default function CarouselItem({
  children,
  currentSlide,
  slideIndex,
  handleSwipe,
}: {
  children: ReactNode
  currentSlide: number
  slideIndex: number
  handleSwipe: (direction: string) => void
}) {
  const touchStart = useRef<null | number>(null)

  //Handle swiping on touchable devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current) {
      const touchEnd: number = e.changedTouches[0].clientX
      if (touchEnd - touchStart.current > 50) {
        handleSwipe('left')
      }
      if (touchEnd - touchStart.current < -50) {
        handleSwipe('right')
      }
      touchStart.current = null
    }
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
