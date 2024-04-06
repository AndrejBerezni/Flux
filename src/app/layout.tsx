import type { Metadata, Viewport } from 'next'

import Footer from '@/components/Footer'
import Message from '@/components/Message'
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

export function generateViewport(): Viewport {
  return {
    themeColor: '#000000',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} flex min-h-screen flex-col overscroll-x-none text-primary`}
      >
        <ReduxProvider>
          <Navbar />
          {children}
          <SideNav />
          <SignIn />
          <SignUp />
          <Message />
          <ModalOuter />
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
