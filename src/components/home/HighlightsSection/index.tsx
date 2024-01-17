import { FaCar } from 'react-icons/fa'
import { GiPortugal } from 'react-icons/gi'
import { RiServiceFill } from 'react-icons/ri'

import { robotoCondensed } from '@/app/fonts'

export default function HighlightsSection() {
  const highlights = [
    {
      icon: <GiPortugal />,
      title: 'Complete coverage',
      text: 'Nationwide availability, ensuring vehicles at your fingertips across Portugal',
    },
    {
      icon: <FaCar />,
      title: 'Versatile electric fleet',
      text: 'Vehicles for every occasion - from urban commutes to weekend getaways',
    },
    {
      icon: <RiServiceFill />,
      title: 'Trusted excellence',
      text: 'Stress-free service, no hidden costs. Your journey starts here',
    },
  ]

  return (
    <section className="flex flex-col items-center justify-around gap-4 p-8 sm:flex-row sm:items-start sm:p-10 md:p-14 lg:px-32 2xl:px-48">
      {highlights.map((hl) => (
        <div
          className={`${robotoCondensed.className} mb-8 font-bold sm:mb-0 md:w-1/4`}
          key={hl.title}
        >
          <h2 className="mb-4 flex flex-col items-center gap-2 text-lg font-bold sm:flex-row sm:text-base md:text-lg">
            <span className="text-3xl">{hl.icon}</span>
            {hl.title}
          </h2>
          <p className="text-center text-2xl sm:text-start sm:text-lg md:text-2xl">
            {hl.text}
          </p>
        </div>
      ))}
    </section>
  )
}
