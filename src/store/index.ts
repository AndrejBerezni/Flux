import { configureStore, combineReducers } from '@reduxjs/toolkit'

import authReducer from './authentication'
import modalReducer from './modal'

const reducers = combineReducers({
  authentication: authReducer,
  modal: modalReducer,
})

export const store = configureStore({
  reducer: reducers,
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
