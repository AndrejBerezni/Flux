import type { Metadata } from 'next'

import Navbar from '@/components/Navbar'
import ReduxProvider from '@/store/provider'

import { inter } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Flux',
  description: 'Rent Electrical Vehicles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <ReduxProvider>
          <Navbar />
          <main className="bg-white flex-1">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  )
}
