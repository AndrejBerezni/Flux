import { createSlice } from '@reduxjs/toolkit'

interface IStoreUser {
  uid: string
  name: string
}

interface IAuthState {
  user: IStoreUser
  isAuth: boolean
}

const initialState: IAuthState = {
  user: {
    uid: '',
    name: '',
  },
  isAuth: false,
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
  },
})

export const { signIn, signOut } = authSlice.actions

export default authSlice.reducer
