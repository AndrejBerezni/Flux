import { createSlice } from '@reduxjs/toolkit'

interface IStoreUser {
  uid: string
  name: string
  email: string
}

interface IAuthState {
  user: IStoreUser
  isAuth: boolean
  emailInput: string //used to pass email from sign in form to sign up
}

const initialState: IAuthState = {
  user: {
    uid: '',
    name: '',
    email: '',
  },
  isAuth: false,
  emailInput: '',
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.isAuth = true
      state.user = action.payload
    },
    signOut: () => initialState,
    setGlobalEmailInput: (state, action) => {
      state.emailInput = action.payload
    },
  },
})

export const { signIn, signOut, setGlobalEmailInput } = authSlice.actions

export default authSlice.reducer
