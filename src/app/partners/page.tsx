import PartnerSection from '@/components/partners/PartnerSection'

import { robotoCondensed } from '../fonts'
export default function PartnersPage() {
  const partners = [
    {
      img: '/partner1logo.png',
      name: 'Web Solutions',
      text: 'Web Solutions is an innovative IT consulting company headquartered in Belgrade, Serbia. With over a decade of experience in the industry, they have been providing cutting-edge solutions and expert guidance to clients worldwide. Their dedicated team of professionals specializes in crafting bespoke web solutions, software development, and digital strategy. Committed to excellence and client satisfaction, Web Solutions stands as a beacon of reliability and innovation in the IT landscape.',
    },
    {
      img: '/partner2logo.png',
      name: 'MTC',
      text: 'MTC is a leading telecommunications powerhouse operating across the dynamic landscape of South-East Europe. With a focus on seamless connectivity and groundbreaking services, MTC has been at the forefront of transforming the digital experience for millions of users. From state-of-the-art mobile networks to pioneering IoT solutions, MTC continues to redefine the boundaries of telecommunications technology. With a relentless commitment to quality and customer-centric innovation, MTC remains the preferred choice for individuals and businesses seeking unparalleled connectivity and communication solutions.',
    },
  ]
  return (
    <main className="group flex-1 bg-white pt-4">
      <h1
        className={`${robotoCondensed.className} text-center text-2xl font-bold uppercase tracking-wide text-secondaryText md:text-4xl`}
      >
        Meet our partners
      </h1>
      {partners.map((partner) => (
        <PartnerSection
          key={`${partner.name}-partner-section`}
          partner={partner}
        />
      ))}
    </main>
  )
}
