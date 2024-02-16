import { useDispatch } from 'react-redux'

import { emailSignIn } from '@/firebase/authentication'
import { signIn } from '@/store/authentication'
import { hideModal } from '@/store/modal'

export default function useEmailAuth() {
  const dispatch = useDispatch()

  const checkEmail = async (email: string) => {
    try {
      const response = await fetch(`api/auth?email=${email}`)
      const data = await response.json()
      if (data.message === 'User does not exist') {
        return false
      } else if (data.auth_type === 'email') {
        return true
      } else if (data && data.auth_type !== 'email') {
        throw new Error(
          'User already registered with another authentication method'
        )
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleEmailSignIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`api/auth?email=${email}`)
      const data = await response.json()
      const user = await emailSignIn(email, password)

      if (user) {
        dispatch(
          signIn({
            uid: user.uid,
            name: data.first_name,
            email: data.email,
          })
        )
        dispatch(hideModal())
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return { checkEmail, handleEmailSignIn }
}
