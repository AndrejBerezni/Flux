import { useDispatch } from 'react-redux'

import { googleSignIn } from '@/firebase/authentication'
import { formatFirebaseError } from '@/firebase/formatFirebaseError'
import { signIn } from '@/store/authentication'
import { hideModal, setMessage } from '@/store/modal'

export default function useGoogleAuth() {
  const dispatch = useDispatch()

  const handleGoogleSignIn = async () => {
    try {
      const googleUser = await googleSignIn()
      const response = await fetch(`/api/auth?email=${googleUser?.email}`)
      const data = await response.json()
      if (data.message === 'User does not exist') {
        const userData = {
          id: googleUser?.uid,
          auth_type: 'google',
          first_name: googleUser?.displayName,
          email: googleUser?.email,
        }
        fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
          .then((response) => {
            if (!response.ok) {
              dispatch(
                setMessage({
                  type: 'error',
                  text: 'Unable to create user. Please try again later.',
                })
              )
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
          .catch((error) => {
            if (error instanceof Error) {
              const errorMessage = formatFirebaseError(error.message)
              dispatch(setMessage({ type: 'error', text: errorMessage }))
            }
          })
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
      if (error instanceof Error) {
        const errorMessage = formatFirebaseError(error.message)
        dispatch(setMessage({ type: 'error', text: errorMessage }))
      }
    }
  }
  return handleGoogleSignIn
}
