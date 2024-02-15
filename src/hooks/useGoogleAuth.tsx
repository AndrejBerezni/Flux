import { useDispatch } from 'react-redux'

import { googleSignIn } from '@/firebase/authentication'
import { signIn } from '@/store/authentication'
import { hideModal } from '@/store/modal'

export default function useGoogleAuth() {
  const dispatch = useDispatch()

  const handleGoogleSignIn = async () => {
    const googleUser = await googleSignIn()
    try {
      const response = await fetch(`/api/auth?email=${googleUser?.email}`)
      const data = await response.json()
      dispatch(
        signIn({
          uid: data.id,
          name: data.first_name || 'Profile',
          email: data.email,
        })
      )
      dispatch(hideModal())
    } catch (error) {
      if (error instanceof Error && error.message === 'User not found') {
        // here to add user
        console.log('right track')
      }
    }
  }
  return handleGoogleSignIn
}
