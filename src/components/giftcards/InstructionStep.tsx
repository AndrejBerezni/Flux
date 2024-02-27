import Image from 'next/image'

import { robotoCondensed } from '@/app/fonts'

export default function InstructionStep({
  step,
}: {
  step: { title: string; text: string; img: string }
}) {
  return (
    <div className="group flex flex-col">
      <Image
        src={step.img}
        alt={step.title}
        width={150}
        height={150}
        className="self-center duration-300 group-hover:scale-110"
      />
      <h3 className="mb-2 font-bold lg:text-lg xl:text-xl">{step.title}</h3>
      <p
        className={`${robotoCondensed.className} text-justify text-sm md:text-base`}
      >
        {step.text}
      </p>
    </div>
  )
}
