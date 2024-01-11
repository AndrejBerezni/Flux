import { configureStore, combineReducers } from '@reduxjs/toolkit'

import authReducer from './authentication'
import modalReducer from './modal'
import vehicleSearchReducer from './vehicleSearch'

const reducers = combineReducers({
  authentication: authReducer,
  modal: modalReducer,
  vehicleSearch: vehicleSearchReducer,
})

export const store = configureStore({
  reducer: reducers,
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
