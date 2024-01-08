import type { Metadata } from 'next'

import Footer from '@/components/Footer'
import ModalOuter from '@/components/modals/ModalOuter'
import SideNav from '@/components/modals/SideNav'
import SignIn from '@/components/modals/SignIn'
import SignUp from '@/components/modals/SignUp'
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
      <body
        className={`${inter.className} flex min-h-screen flex-col text-primary`}
      >
        <ReduxProvider>
          <Navbar />
          <main className="flex-1 lg:px-48">{children}</main>
          <SideNav />
          <SignIn />
          <SignUp />
          <ModalOuter />
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
