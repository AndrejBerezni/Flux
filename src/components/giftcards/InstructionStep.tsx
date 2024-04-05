import { robotoCondensed } from '@/app/fonts'

import FadeInImage from '../FadeInImage'

export default function InstructionStep({
  step,
}: {
  step: { title: string; text: string; img: string }
}) {
  return (
    <div className="flex flex-col">
      <FadeInImage
        src={step.img}
        alt={step.title}
        width={150}
        height={150}
        additionalStyles="self-center"
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
