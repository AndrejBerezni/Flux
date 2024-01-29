import { Roboto, Roboto_Condensed, Inter } from 'next/font/google'

export const roboto = Roboto({
  subsets: ['latin'],
  style: 'normal',
  weight: ['100', '300', '400', '500', '700', '900'],
})

export const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  style: 'normal',
  weight: ['100', '300', '400', '500', '700', '800', '900'],
})

export const inter = Inter({ subsets: ['latin'], style: ['normal'] })
