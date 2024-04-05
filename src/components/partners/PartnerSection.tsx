import Link from 'next/link'
import { FaLinkedin } from 'react-icons/fa'
import { TbWorldWww } from 'react-icons/tb'

import FadeInImage from '../FadeInImage'

export default function PartnerSection({
  partner,
}: {
  partner: { img: string; name: string; text: string }
}) {
  return (
    <section className="section-padding flex w-full flex-col items-center gap-4 odd:bg-quaternary md:flex-row md:items-start md:gap-12 md:odd:flex-row-reverse">
      <FadeInImage
        src={partner.img}
        width={250}
        height={250}
        alt="partner-logo"
        additionalStyles="aspect-square rounded-full shadow-md"
      />
      <div>
        <h2 className="mb-2 text-center text-lg font-extrabold text-brandDarker md:text-start md:text-2xl">
          {partner.name}
        </h2>
        <p className="text-center md:text-justify md:text-lg">{partner.text}</p>
        <div className="mt-4 flex w-full justify-end gap-3 text-4xl text-brandDarker">
          <Link
            href="/"
            className="duration-150 hover:scale-105 hover:text-brand"
          >
            <TbWorldWww />
          </Link>
          <Link
            href="https://www.linkedin.com/"
            className="duration-150 hover:scale-105 hover:text-brand"
          >
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </section>
  )
}
