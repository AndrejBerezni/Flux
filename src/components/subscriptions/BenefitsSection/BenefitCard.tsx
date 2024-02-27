import Image from 'next/image'

import { robotoCondensed } from '@/app/fonts'

export default function BenefitCard({
  benefit,
}: {
  benefit: {
    title: string
    list: string[]
    img: string
  }
}) {
  return (
    <article className="group hover:cursor-default">
      <Image
        src={benefit.img}
        alt={benefit.title}
        height={200}
        width={200}
        className="duration-300 group-hover:scale-110"
      />
      <h3 className="my-2 text-2xl font-bold">{benefit.title}</h3>
      <ul>
        {benefit.list.map((item) => (
          <p
            key={item}
            className={`${robotoCondensed.className} text-lg tracking-wide`}
          >
            {item}
          </p>
        ))}
      </ul>
    </article>
  )
}
