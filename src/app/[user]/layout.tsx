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
      <main className="flex">
        <UserPageMenu />
        {children}
        <p>
          {auth.currentUser?.uid} - {params.user}
        </p>
      </main>
    )
  }
}
