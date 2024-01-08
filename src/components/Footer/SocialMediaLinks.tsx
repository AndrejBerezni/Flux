import Image from 'next/image'
import Link from 'next/link'
import { FaYoutube, FaInstagram, FaXTwitter, FaFacebook } from 'react-icons/fa6'

export default function SocialMediaLinks() {
  const links = [
    {
      name: 'facebook',
      href: 'https://www.facebook.com/',
      icon: <FaFacebook />,
    },
    {
      name: 'x',
      href: 'https://twitter.com/',
      icon: <FaXTwitter />,
    },
    {
      name: 'instagram',
      href: 'https://www.instagram.com/',
      icon: <FaInstagram />,
    },
    {
      name: 'youtube',
      href: 'https://www.youtube.com/',
      icon: <FaYoutube />,
    },
  ]

  return (
    <section className="flex w-full items-center justify-between">
      <Image
        src="/FLUX-logo-white-nobg.png"
        alt="flux logo"
        width={80}
        height={32}
      />
      <ul className="flex items-center gap-4">
        {links.map((link) => (
          <li
            key={`${link.name}-footer`}
            className="text-xl text-white duration-300 hover:scale-110 md:text-2xl"
          >
            <Link href={link.href}>{link.icon}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
