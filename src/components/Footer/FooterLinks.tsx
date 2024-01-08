import Link from 'next/link'

import styles from '../../app/reusables.module.css'

export default function FooterLinks() {
  const lists = [
    {
      title: 'Our products',
      links: [
        { text: 'Car hire', href: '/' },
        { text: 'Bike hire', href: '/' },
        { text: 'Scooter hire', href: '/' },
        { text: 'Subscriptions', href: '/' },
        { text: 'Gift cards', href: '/' },
        { text: 'Our locations', href: '/' },
      ],
    },
    {
      title: 'Help and more',
      links: [
        {
          text: 'Help',
          href: '/',
        },
        {
          text: 'Rental information',
          href: '/',
        },
        {
          text: 'Travel agencies',
          href: '/',
        },
        {
          text: 'FLUX Partners',
          href: '/',
        },
        {
          text: 'Privacy',
          href: '/',
        },
        {
          text: 'Terms & Conditions',
          href: '/',
        },
      ],
    },
  ]

  return (
    <section className="my-4 flex w-full flex-col gap-8 sm:my-8 sm:flex-row sm:gap-48">
      {lists.map((list) => (
        <div key={list.title}>
          <h4 className="mb-2 text-secondary">{list.title}</h4>
          <ul>
            {list.links.map((link) => (
              <li
                key={link.text}
                className={`${styles.footLink} mb-1 w-fit text-white`}
              >
                <Link href={link.href}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
