import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'

import { app } from './config'

//Initialize authentication
export const auth = getAuth(app)

setPersistence(auth, browserLocalPersistence)

//Google sign in
const provider = new GoogleAuthProvider()

export const googleSignIn = async () => {
  try {
    const newUser = await signInWithPopup(auth, provider)
    return newUser.user
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message)
    }
  }
}

//Email sign in
export const emailSignIn = async (email: string, password: string) => {
  try {
    const newUser = await signInWithEmailAndPassword(auth, email, password)
    console.log('after:', auth)
    return newUser.user
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message)
    }
  }
}

//Email sign up
export const emailSignUp = async (email: string, password: string) => {
  try {
    const newUser = await createUserWithEmailAndPassword(auth, email, password)
    return newUser.user
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message)
    }
  }
}

//Send password reset email
export const passwordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return 'Password reset email sent.'
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message)
    }
  }
}

//Sign out
export const signOutUser = () => {
  signOut(getAuth())
}
