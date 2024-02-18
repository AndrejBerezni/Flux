import { useDispatch } from 'react-redux'

import { emailSignIn, emailSignUp } from '@/firebase/authentication'
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

  const handleEmailSignUp = async (user: {
    email: string
    first_name: string
    last_name: string
    password: string
  }) => {
    try {
      const newUser = await emailSignUp(user.email, user.password)
      if (newUser) {
        const userData = {
          id: newUser.uid,
          auth_type: 'email',
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
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
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return { checkEmail, handleEmailSignIn, handleEmailSignUp }
}
