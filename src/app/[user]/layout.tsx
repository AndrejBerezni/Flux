'use client'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

import UserPageMenu from '@/components/user/UserPageMenu'
import { auth } from '@/firebase/authentication'
import { getAuthStatus, getUserId } from '@/store/authentication/selectors'

export default function UserPageLayout({
  params,
  children,
}: {
  params: { user: string }
  children: React.ReactNode
}) {
  const router = useRouter()
  const isAuth = useSelector(getAuthStatus)
  const uid = useSelector(getUserId)

  useEffect(() => {
    if (!isAuth || uid !== params.user) {
      router.push('/')
    }
  }, [isAuth, uid, params.user, router])
  if (auth.currentUser?.uid === params.user) {
    return (
      <section className="flex min-h-[80vh] w-full flex-wrap justify-start gap-24 bg-quaternary py-10 pl-4 pr-6 lg:px-32 2xl:px-48">
        <UserPageMenu />
        {children}
      </section>
    )
  }
}
