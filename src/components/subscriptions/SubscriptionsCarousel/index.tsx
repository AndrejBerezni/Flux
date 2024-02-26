'use client'
import { useState, useEffect, useMemo } from 'react'

import { ISubscriptionsSlide } from '@/compiler/interfaces'

import SubscriptionsCarouselControls from './SubscriptionCarouselControls'
import SubscriptionCarouselSlide from './SubscriptionCarouselSlide'

export default function SubscriptionsCarousel() {
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  //wrapping inside useMemo so that slides are not recreated on every render
  const slides = useMemo<ISubscriptionsSlide[]>(
    () => [
      {
        headerText: 'Embrace',
        headerSpan: 'Freedom',
        spanColor: 'secondary',
        img: '/benefits-carousel-harley.jpg',
        text: 'The better way of renting a vehicle',
      },
      {
        headerText: 'Maximize',
        headerSpan: 'Your Drive',
        spanColor: 'tertiary',
        img: '/benefits-carousel-tesla.jpg',
        text: 'Enjoy Exclusive Benefits with Subscription',
      },
    ],
    []
  )

  useEffect(() => {
    //wait for carousel to be set up, to start the timer
    if (slides.length > 0) {
      const changePage = setInterval(
        () =>
          setCurrentSlide((prev) =>
            prev === slides.length - 1 ? 0 : prev + 1
          ),
        4000
      )
      return () => {
        clearInterval(changePage)
      }
    }
  }, [slides])

  return (
    <section className="relative flex w-full flex-col overflow-x-hidden bg-primary">
      <div className="relative h-[640px] w-full max-[560px]:h-[510px] max-[460px]:h-[455px] max-[360px]:h-[415px] md:h-[500px] xl:h-[700px] 2xl:h-[800px]">
        {slides.map((slide, index) => (
          <SubscriptionCarouselSlide
            key={`${slide.headerText}-sub-carousel-slide`}
            index={index}
            current={currentSlide}
            slideData={slide}
          />
        ))}
      </div>
      <SubscriptionsCarouselControls
        changeSlide={setCurrentSlide}
        current={currentSlide}
      />
    </section>
  )
}

// max-[530px]:h-[480px] max-[320px]:h-[400px] sm:h-[640px] md:h-[500px] xl:h-[700px] 2xl:h-[800px]
