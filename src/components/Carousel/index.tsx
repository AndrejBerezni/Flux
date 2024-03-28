'use client'
import { ReactNode, useState } from 'react'

import clsx from 'clsx'
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io'

import CarouselItem from './CarouselItem'

export default function Carousel({ children }: { children: ReactNode[] }) {
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  const handleChangeSlide = (direction: string) => {
    if (direction === 'left' && currentSlide > 0) {
      setCurrentSlide((current) => current - 1)
    } else if (direction === 'right' && currentSlide < children.length - 1) {
      setCurrentSlide((current) => current + 1)
    }
  }

  return (
    <div className="relative h-[500px] w-[300px] max-[375px]:w-[240px]">
      <div className="relative h-full overflow-hidden rounded-xl">
        {children.map((item, index) => (
          <CarouselItem
            key={`${index}-carousel-item`}
            currentSlide={currentSlide}
            slideIndex={index}
            handleSwipe={handleChangeSlide}
          >
            {item}
          </CarouselItem>
        ))}
      </div>
      {/* Slide indicators */}
      <div className="absolute -bottom-[40px] left-1/2 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
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
      {/* Controls */}
      <button
        onClick={() => handleChangeSlide('left')}
        disabled={currentSlide === 0}
        className="absolute right-full top-1/2 text-4xl disabled:text-secondary max-[375px]:text-xl"
      >
        <IoMdArrowDropleft />
      </button>
      <button
        onClick={() => handleChangeSlide('right')}
        disabled={currentSlide === children.length - 1}
        className="absolute left-full top-1/2 text-4xl disabled:text-secondary max-[375px]:text-xl"
      >
        <IoMdArrowDropright />
      </button>
    </div>
  )
}
