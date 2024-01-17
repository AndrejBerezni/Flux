'use client'
import { ReactNode, useState } from 'react'

import clsx from 'clsx'

import CarouselItem from './CarouselItem'

export default function Carousel({ children }: { children: ReactNode[] }) {
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  return (
    <div className="relative h-[500px] w-[300px] max-[320px]:w-[240px]">
      <div className="relative h-full overflow-hidden rounded-xl">
        {children.map((item, index) => (
          <CarouselItem
            key={`${index}-carousel-item`}
            currentSlide={currentSlide}
            slideIndex={index}
          >
            {item}
          </CarouselItem>
        ))}
      </div>
      <div className="absolute -bottom-[40px] left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
        {children.map((_, index) => (
          <button
            key={`${index}-carousel-button`}
            type="button"
            className={clsx('h-3 w-3 rounded-full bg-primary', {
              'bg-primary': currentSlide === index,
              'bg-secondary': currentSlide !== index,
            })}
            aria-current={currentSlide === index ? 'true' : 'false'}
            aria-label={`Slide ${index}`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  )
}
