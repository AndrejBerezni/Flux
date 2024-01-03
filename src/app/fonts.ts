import { Roboto, Inter } from 'next/font/google'

export const roboto = Roboto({
  subsets: ['latin'],
  style: 'normal',
  weight: ['100', '300', '400', '500', '700', '900'],
})

export const inter = Inter({ subsets: ['latin'] })
