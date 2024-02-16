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
      if (data.message === 'User does not exist') {
        const userData = {
          id: googleUser?.uid,
          auth_type: 'google',
          first_name: googleUser?.displayName,
          email: googleUser?.email,
        }
        fetch('api/auth', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Response not ok')
            }
            return response.json()
          })
          .then((data) => {
            dispatch(
              signIn({
                uid: data.id,
                name: data.first_name || 'Profile',
                email: data.email,
              })
            )
            dispatch(hideModal())
          })
          .catch((error) => console.error('Error:', error))
      } else if (data.auth_type === 'google') {
        dispatch(
          signIn({
            uid: data.id,
            name: data.first_name || 'Profile',
            email: data.email,
          })
        )
        dispatch(hideModal())
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  return handleGoogleSignIn
}
